import { AsyncPipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { FuseCardComponent } from "@fuse/components/card";
import { UserService } from "app/core/user/user.service";
import { Role } from "app/core/user/user.types";
import { SessionService } from "app/shared/sevices/session.service";
import { MatTooltipModule } from "@angular/material/tooltip";
import {
  showToastOnSuccess,
  ToastService,
} from "app/shared/sevices/toasts.service";
import {
  catchError,
  EMPTY,
  filter,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from "rxjs";

import { UpcomingSessionsDto } from "../models/upcoming-sessions.dto";
import { PipesModule } from "../pipes.module";
import { ScheduleSessionDialogComponent } from "./schedule-session-dialog.component";

@Component({
  selector: "app-timetable",
  standalone: true,
  imports: [
    MatDialogModule,
    FuseCardComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    AsyncPipe,
    PipesModule,
    MatTooltipModule,
  ],
  templateUrl: "./timetable.component.html",
  styleUrl: "./timetable.component.scss",
  providers: [provideNativeDateAdapter()],
})
export class TimetableComponent implements OnInit, OnDestroy {
  userId?: string;
  userRole?: Role;

  sessions$!: Observable<UpcomingSessionsDto[]>;
  now = Date.now();

  private readonly destroy$ = new Subject<void>();
  private readonly refreshSessions$ = new Subject<void>();

  private dialogRef?: ReturnType<MatDialog["open"]>;
  private nowTimer?: ReturnType<typeof setInterval>;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private sessionService: SessionService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.nowTimer = setInterval(() => {
      this.now = Date.now();
    }, 1_000);

    this.sessions$ = this.userService.user$.pipe(
      filter((user): user is NonNullable<typeof user> => !!user),
      switchMap((user) => {
        this.userId = user.id;
        this.userRole = user.role;

        if (!this.userId || this.userRole == null) {
          return of<UpcomingSessionsDto[]>([]);
        }

        const userId = this.userId;
        const userRole = this.userRole;

        return this.refreshSessions$.pipe(
          startWith(undefined),
          switchMap(() =>
            this.sessionService.getTimeTable(userId, userRole).pipe(
              map((sessions) =>
                (sessions ?? []).filter(
                  (session) =>
                    session.canceled == null &&
                    new Date(session.sessionDateTime).getTime() > this.now,
                ),
              ),
              catchError(() => {
                this.toastService.error({
                  title: "Error",
                  message: "Failed to load sessions.",
                });

                return of<UpcomingSessionsDto[]>([]);
              }),
            ),
          ),
        );
      }),
      takeUntil(this.destroy$),
    );
  }

  joinSession(session: UpcomingSessionsDto): void {
    if (!session.zoomMeeting) {
      return;
    }

    window.open(session.zoomMeeting, "_blank", "noopener,noreferrer");
  }

  cancelSession(session: UpcomingSessionsDto): void {
    if (!this.userId || this.userRole == null) {
      return;
    }

    if (!this.isCancelEnabled(session)) {
      this.toastService.error({
        title: "Cancellation unavailable",
        message:
          this.userRole === Role.Student
            ? "Students can only cancel sessions at least two hours before their start time."
            : "Instructors can only cancel sessions at least six hours before their start time.",
      });
      return;
    }

    this.sessionService
      .cancelUpCommingSession(session.zoomMeetingId, this.userRole)
      .pipe(
        showToastOnSuccess(this.toastService, {
          title: "Success",
          message: "The session has been canceled successfully.",
        }),
        tap(() => this.refreshSessions$.next()),
        catchError((error) => {
          this.toastService.error({
            title: "Error",
            message: error.error?.Message || "Failed to cancel session.",
          });

          return EMPTY;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  isEnabled(session: UpcomingSessionsDto): boolean {
    if (session.isPendingReschedule) {
      return false;
    }
    const sessionTime = new Date(session.sessionDateTime).getTime();
    const minute = 60_000;

    const enabledFrom = sessionTime - 5 * minute;
    const enabledUntil = sessionTime + 30 * minute;

    return this.now >= enabledFrom && this.now <= enabledUntil;
  }
  isCancelEnabled(session: UpcomingSessionsDto): boolean {
    if (
      (this.userRole !== Role.Student && this.userRole !== Role.Instructor) ||
      session.isPendingReschedule
    )
      return false;
    const noticeHours = this.userRole === Role.Student ? 2 : 6;
    return (
      session.canceled == null &&
      this.now <=
        new Date(session.sessionDateTime).getTime() - noticeHours * 60 * 60_000
    );
  }
  isScheduleEnabled(session: UpcomingSessionsDto): boolean {
    if (this.userRole == Role.Student && session.isPendingReschedule) {
      return false;
    }

    const sessionTime = new Date(session.sessionDateTime).getTime();
    const minute = 60_000;

    const enabledUntil = sessionTime - 120 * minute;
    return this.now <= enabledUntil;
  }

  scheduleSession(session: UpcomingSessionsDto): void {
    if (this.userRole === Role.Instructor) {
      this.scheduleSessionByInstructor(session);
    }
    if (this.userRole === Role.Student) {
      this.setSessionAsPending(session);
    }
  }
  setSessionAsPending(session: UpcomingSessionsDto): void {
    this.sessionService
      .SetAsPending(session.zoomMeetingId)
      .pipe(
        showToastOnSuccess(this.toastService, {
          title: "Success",
          message:
            "The session has been set as pending reschedule successfully.",
        }),
        tap(() => this.refreshSessions$.next()),
        catchError((error) => {
          this.toastService.error({
            title: "Error",
            message:
              error.error?.Message ||
              "Failed to set session as pending reschedule.",
          });

          return EMPTY;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }
  scheduleSessionByInstructor(session: UpcomingSessionsDto): void {
    this.dialogRef = this.dialog.open(ScheduleSessionDialogComponent, {
      width: "440px",
      maxWidth: "95vw",
      data: session,
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        filter((newDateTime: string | undefined) => !!newDateTime),
        tap(() => this.refreshSessions$.next()),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    this.dialogRef?.close();
    this.refreshSessions$.complete();

    if (this.nowTimer !== undefined) {
      clearInterval(this.nowTimer);
    }
  }

  getJoinTooltip(session: UpcomingSessionsDto): string {
    if (session.isPendingReschedule) {
      return "You can join once the session has been rescheduled.";
    }

    const sessionTime = new Date(session.sessionDateTime).getTime();

    return this.now < sessionTime - 5 * 60_000
      ? "You can join starting 5 minutes before the session."
      : "The join window closed 30 minutes after the session started.";
  }

  getCancelTooltip(session: UpcomingSessionsDto): string {
    if (session.canceled != null) {
      return "This session has already been canceled.";
    }

    if (session.isPendingReschedule) {
      return "This session is pending rescheduling and cannot be canceled.";
    }

    if (this.userRole === Role.Student) {
      return "Students can cancel up to 2 hours before the session starts.";
    }

    if (this.userRole === Role.Instructor) {
      return "Instructors can cancel up to 6 hours before the session starts.";
    }

    return "Your role does not have permission to cancel sessions.";
  }

  getRescheduleTooltip(session: UpcomingSessionsDto): string {
    if (this.userRole === Role.Student && session.isPendingReschedule) {
      return "A reschedule request is already pending.";
    }

    return "Sessions can be rescheduled up to 2 hours before they start.";
  }
}
