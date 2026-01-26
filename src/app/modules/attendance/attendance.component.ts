import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FuseCardComponent } from "@fuse/components/card";
import { SessionService } from "app/shared/sevices/session.service";
import { SessionDto, AttendanceStatus } from "../models/session.dto";
import { UserService } from "app/core/user/user.service";
import { filter, switchMap, tap } from "rxjs";
import { DateTime } from "luxon";
import moment from "moment";
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
  attendCount = 0;
  absentStudentCount = 0;
  absentInstructorCount = 0;
  cancelledByInstructorCount = 0;
  cancelledByStudentCount = 0;
  lateCount = 0;
  totalCount = 0;
  role: Role;

  AttendanceStatus = AttendanceStatus;

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

  statusClass(status: AttendanceStatus): string {
    switch (status) {
      case AttendanceStatus.Attend:
        return "bg-green-100 text-green-800";
      case AttendanceStatus.Late:
        return "bg-gray-100 text-gray-800";
      case AttendanceStatus.AbsentStudent:
      case AttendanceStatus.AbsentInstructor:
        return "bg-red-100 text-red-800";
      case AttendanceStatus.CancelledByInstructor:
        return "bg-yellow-100 text-yellow-800";
      case AttendanceStatus.CancelledByStudent:
        return "bg-red-100 text-red-900";
      default:
        return "bg-purple-100 text-purple-800";
    }
  }

  getSessionTimeLabel(session: SessionDto): string {
    return moment.utc(session.date).local().format("hh:mm a");
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
    this.attendCount = this.sessions.filter(
      (s) => s.studentSessionStatus === AttendanceStatus.Attend,
    ).length;
    this.absentStudentCount = this.sessions.filter(
      (s) => s.studentSessionStatus === AttendanceStatus.AbsentStudent,
    ).length;
    this.absentInstructorCount = this.sessions.filter(
      (s) => s.instructorSessionStatus === AttendanceStatus.AbsentInstructor,
    ).length;
    this.cancelledByInstructorCount = this.sessions.filter(
      (s) =>
        s.instructorSessionStatus === AttendanceStatus.CancelledByInstructor,
    ).length;
    this.cancelledByStudentCount = this.sessions.filter(
      (s) => s.studentSessionStatus === AttendanceStatus.CancelledByStudent,
    ).length;
    this.lateCount = this.sessions.filter(
      (s) => s.studentSessionStatus === AttendanceStatus.Late,
    ).length;
    this.totalCount = this.sessions.length;
  }

  private computeInstructorCounts(): void {
    this.attendCount = this.sessions.filter(
      (s) => s.instructorSessionStatus === AttendanceStatus.Attend,
    ).length;
    this.absentStudentCount = this.sessions.filter(
      (s) => s.studentSessionStatus === AttendanceStatus.AbsentStudent,
    ).length;
    this.absentInstructorCount = this.sessions.filter(
      (s) => s.instructorSessionStatus === AttendanceStatus.AbsentInstructor,
    ).length;
    this.cancelledByInstructorCount = this.sessions.filter(
      (s) =>
        s.instructorSessionStatus === AttendanceStatus.CancelledByInstructor,
    ).length;
    this.cancelledByStudentCount = this.sessions.filter(
      (s) => s.studentSessionStatus === AttendanceStatus.CancelledByStudent,
    ).length;
    this.lateCount = this.sessions.filter(
      (s) => s.studentSessionStatus === AttendanceStatus.Late,
    ).length;
    this.totalCount = this.sessions.length;
  }

  public getInvoice() {
    this.router.navigate([`/invoice/${this.userId}`]);
  }
}
