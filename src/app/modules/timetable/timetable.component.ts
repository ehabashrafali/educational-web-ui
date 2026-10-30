import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Role } from "app/core/user/user.types";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { provideNativeDateAdapter } from "@angular/material/core";
import { FuseCardComponent } from "@fuse/components/card";
import { UserService } from "app/core/user/user.service";
import { UpcomingSessionsDto } from "../models/upcoming-sessions.dto";
import { AsyncPipe } from "@angular/common";
import { PipesModule } from "../pipes.module";
import { SessionService } from "app/shared/sevices/session.service";
import { catchError, EMPTY, filter, Observable, switchMap, tap } from "rxjs";

@Component({
  selector: "app-timetable",
  standalone: true,
  imports: [
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
export class TimetableComponent implements OnInit {
  userId?: string;
  userRole?: Role;
  sessions$!: Observable<UpcomingSessionsDto[]>;
  now: Date = new Date();

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
  ) {
    this.now = new Date();
  }

  ngOnInit(): void {
    this.sessions$ = this.userService.user$.pipe(
      filter((user): user is NonNullable<typeof user> => !!user),
      switchMap((user) => {
        this.userId = user.id;
        this.userRole = user.role;
        if (!this.userId || !this.userRole) return EMPTY;
        return this.sessionService.getTimeTable(user.id as string, user.role);
      }),
      catchError(() => EMPTY),
      tap((sessions) => console.log(sessions)),
    );
  }

  joinSession(session: UpcomingSessionsDto): void {
    // const sessionDto: SessionDto = {
    //   joiningTime: new Date(),
    //   startTime: session.sessionDateTime,
    //   courseId: null,
    //   instructorId: this.userRole == Role.Instructor ? this.userId : null,
    //   studentId: this.userRole == Role.Student ? this.userId : null,
    //   status: AttendanceStatus.Attend,
    //   courseName: null,
    //   coursePricePerHoure: null,
    // };
    // this.sessionStudent
    //   .CreateSession(this.userId, sessionDto)
    //   .pipe(
    //     tap((success) => {
    //       if (success && session.zoomMeeting) {
    //         this.openZoom(session.zoomMeeting);
    //       }
    //     }),
    //     catchError((err) => {
    //       console.error("CreateSession failed", err);
    //       return EMPTY;
    //     }),
    //   )
    //   .subscribe();
  }

  private openZoom(url: string): void {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  isDisabled(session: any): boolean {
    const sessionTime = new Date(session.sessionDateTime);
    return sessionTime > this.now;
  }
}
