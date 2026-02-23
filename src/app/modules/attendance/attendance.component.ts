import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FuseCardComponent } from "@fuse/components/card";
import { SessionService } from "app/shared/sevices/session.service";
import {
  InstructorAttendanceStatus,
  SessionDto,
  StudentAttendanceStatus,
} from "../models/session.dto";
import { UserService } from "app/core/user/user.service";
import { filter, switchMap, tap } from "rxjs";
import { DateTime } from "luxon";
import { Router } from "@angular/router";
import { Role } from "app/core/user/user.types";

type CalendarDay = {
  date: DateTime;
  isoDate: string;
  sessions: SessionDto[];
  inMonth: boolean;
  isToday: boolean;
};

type CalendarWeek = {
  index: number; // 0..5
  start: DateTime; // first day in week (Sun)
  end: DateTime; // last day in week (Sat)
  days: CalendarDay[]; // length = 7
};

@Component({
  selector: "app-attendance",
  standalone: true,
  imports: [FuseCardComponent, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: "./attendance.component.html",
  styleUrl: "./attendance.component.scss",
})
export class AttendanceComponent implements OnInit {
  sessions: SessionDto[] = [];
  userId: string;

  readonly viewMonth = DateTime.now().startOf("month");
  calendarWeeks: CalendarWeek[] = [];
  instructorAttendCount = 0;
  instructorLateCount = 0;
  instructorAbsentCount = 0;
  studentAttendCount = 0;
  absentStudentCount = 0;
  totalCount = 0;
  role: Role;

  constructor(
    private sessionsService: SessionService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const dateIso = DateTime.fromJSDate(new Date()).toISODate();

    this.userService.user$
      .pipe(
        filter((u) => !!u.id),
        tap((u) => (this.userId = u.id)),
        tap((u) => (this.role = u.role)),
        switchMap((u) =>
          this.sessionsService.GetOfCurrentMonthAndYear(u.id, u.role, dateIso),
        ),
        tap((sessionsDto) => {
          this.sessions = sessionsDto;
          if (this.role === Role.Student) {
            this.computeStudentCounts();
          } else {
            this.computeInstructorCounts();
          }
          this.buildCalendar();
        }),
      )
      .subscribe();
  }

  get monthLabel(): string {
    return this.viewMonth.toFormat("MMM yyyy");
  }

  statusClass(
    status: StudentAttendanceStatus | InstructorAttendanceStatus,
  ): string {
    switch (status) {
      case StudentAttendanceStatus.Attend:
        return "bg-green-100 text-green-800";
      case StudentAttendanceStatus.Absent:
        return "bg-red-100 text-red-800";
      case InstructorAttendanceStatus.Attend:
        return "bg-green-100 text-green-800";
      case InstructorAttendanceStatus.Late:
        return "bg-yellow-100 text-yellow-800";
      case InstructorAttendanceStatus.Absent:
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  }
  private buildCalendar(): void {
    const monthStart = this.viewMonth.startOf("month");
    const monthEnd = this.viewMonth.endOf("month");
    const todayIso = DateTime.now().toISODate();

    const sessionsByDay = new Map<string, SessionDto[]>();
    for (const s of this.sessions) {
      const date = new Date(s.date);
      const key = date.toISOString().split("T")[0];
      const arr = sessionsByDay.get(key) ?? [];
      arr.push(s);
      sessionsByDay.set(key, arr);
    }

    // Start calendar on Sunday
    const firstCellOffset = monthStart.weekday % 7; // Sun=0
    const gridStart = monthStart.minus({ days: firstCellOffset });

    const allDays: CalendarDay[] = [];
    for (let i = 0; i < 42; i++) {
      const d = gridStart.plus({ days: i });
      const isoDate = d.toISODate()!;

      allDays.push({
        date: d,
        isoDate,
        sessions: sessionsByDay.get(isoDate) ?? [],
        inMonth: d >= monthStart && d <= monthEnd,
        isToday: isoDate === todayIso,
      });
    }

    // Build CalendarWeek objects
    this.calendarWeeks = [];
    for (let w = 0; w < 6; w++) {
      const days = allDays.slice(w * 7, w * 7 + 7);

      this.calendarWeeks.push({
        index: w,
        start: days[0].date,
        end: days[6].date,
        days,
      });
    }
  }

  private computeStudentCounts(): void {
    this.studentAttendCount = this.sessions.filter(
      (s) => s.studentSessionStatus === StudentAttendanceStatus.Attend,
    ).length;
    this.absentStudentCount = this.sessions.filter(
      (s) => s.studentSessionStatus === StudentAttendanceStatus.Absent,
    ).length;
    this.totalCount = this.sessions.length;
  }

  private computeInstructorCounts(): void {
    this.instructorAttendCount = this.sessions.filter(
      (s) => s.instructorSessionStatus === InstructorAttendanceStatus.Attend,
    ).length;
    this.instructorLateCount = this.sessions.filter(
      (s) => s.instructorSessionStatus === InstructorAttendanceStatus.Late,
    ).length;
    this.instructorAbsentCount = this.sessions.filter(
      (s) => s.instructorSessionStatus === InstructorAttendanceStatus.Absent,
    ).length;

    this.totalCount = this.sessions.length;
  }

  public getInvoice() {
    this.router.navigate([`/invoice/${this.userId}`]);
  }
}
