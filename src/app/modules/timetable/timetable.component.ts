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
                  (session) => session.canceled == null && new Date(session.sessionDateTime).getTime() > this.now
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

    this.sessionService
      .cancelUpCommingSession(session.zoomMeetingId, this.userRole)
      .pipe(
        showToastOnSuccess(this.toastService, {
          title: "Success",
          message: "The session has been canceled successfully.",
        }),
        tap(() => this.refreshSessions$.next()),
        catchError(() => {
          this.toastService.error({
            title: "Error",
            message: "Failed to cancel session.",
          });

          return EMPTY;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  isEnabled(session: UpcomingSessionsDto): boolean {
    const sessionTime = new Date(session.sessionDateTime).getTime();
    const minute = 60_000;

    const enabledFrom = sessionTime - 5 * minute;
    const enabledUntil = sessionTime + 30 * minute;

    return this.now >= enabledFrom && this.now <= enabledUntil;
  }

  scheduleSession(session: UpcomingSessionsDto): void {
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
}