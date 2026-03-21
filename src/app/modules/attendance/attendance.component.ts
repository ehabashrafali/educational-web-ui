import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
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
import { Subject, filter, switchMap, takeUntil, tap } from "rxjs";
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
  index: number;
  start: DateTime;
  end: DateTime;
  days: CalendarDay[];
};

@Component({
  selector: "app-attendance",
  standalone: true,
  imports: [FuseCardComponent, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: "./attendance.component.html",
  styleUrl: "./attendance.component.scss",
})
export class AttendanceComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  sessions: SessionDto[] = [];
  userId: string;
  role: Role;

  viewMonth: DateTime = DateTime.now().startOf("month");
  calendarWeeks: CalendarWeek[] = [];

  instructorAttendCount = 0;
  instructorLateCount = 0;
  instructorAbsentCount = 0;

  studentAttendCount = 0;
  absentStudentCount = 0;
  cancelledStudentCount = 0;

  totalCount = 0;

  constructor(
    private sessionsService: SessionService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userService.user$
      .pipe(
        filter((u) => !!u?.id),
        tap((u) => {
          this.userId = u.id;
          this.role = u.role;
        }),
        tap(() => this.loadSessionsForCurrentViewMonth()),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get monthLabel(): string {
    return this.viewMonth.toFormat("MMMM yyyy");
  }

  previousMonth(): void {
    this.viewMonth = this.viewMonth.minus({ months: 1 }).startOf("month");
    this.loadSessionsForCurrentViewMonth();
  }

  nextMonth(): void {
    this.viewMonth = this.viewMonth.plus({ months: 1 }).startOf("month");
    this.loadSessionsForCurrentViewMonth();
  }

  statusClass(
    status: StudentAttendanceStatus | InstructorAttendanceStatus,
  ): string {
    switch (status) {
      case StudentAttendanceStatus.Attend:
        return "bg-green-100 text-green-800";
      case StudentAttendanceStatus.Absent:
        return "bg-red-100 text-red-800";
      case StudentAttendanceStatus.Cancelled:
        return "bg-gray-100 text-gray-800";
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

  private loadSessionsForCurrentViewMonth(): void {
    if (!this.userId || !this.role) return;

    const dateIso = this.viewMonth.toISODate();

    this.sessionsService
      .GetSessionsByIdAndDate(this.userId, this.role, dateIso!)
      .pipe(
        tap((sessionsDto) => {
          this.sessions = sessionsDto ?? [];
          this.resetCounts();

          if (this.role === Role.Student) {
            this.computeStudentCounts();
          } else {
            this.computeInstructorCounts();
          }

          this.buildCalendar();
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private buildCalendar(): void {
    const monthStart = this.viewMonth.startOf("month");
    const monthEnd = this.viewMonth.endOf("month");
    const todayIso = DateTime.now().toISODate();

    const sessionsByDay = new Map<string, SessionDto[]>();

    for (const s of this.sessions) {
      const key = DateTime.fromISO(s.date.toString()).toISODate();
      if (!key) continue;

      const arr = sessionsByDay.get(key) ?? [];
      arr.push(s);
      sessionsByDay.set(key, arr);
    }

    const firstCellOffset = monthStart.weekday % 7;
    const gridStart = monthStart.minus({ days: firstCellOffset });

    const allDays: CalendarDay[] = [];

    for (let i = 0; i < 42; i++) {
      const d = gridStart.plus({ days: i });
      const isoDate = d.toISODate()!;

      allDays.push({
        date: d,
        isoDate,
        sessions: sessionsByDay.get(isoDate) ?? [],
        inMonth: d.month === monthStart.month && d.year === monthStart.year,
        isToday: isoDate === todayIso,
      });
    }

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

  private resetCounts(): void {
    this.instructorAttendCount = 0;
    this.instructorLateCount = 0;
    this.instructorAbsentCount = 0;
    this.studentAttendCount = 0;
    this.absentStudentCount = 0;
    this.cancelledStudentCount = 0;
    this.totalCount = 0;
  }

  private computeStudentCounts(): void {
    this.studentAttendCount = this.sessions.filter(
      (s) => s.studentSessionStatus === StudentAttendanceStatus.Attend,
    ).length;

    this.absentStudentCount = this.sessions.filter(
      (s) => s.studentSessionStatus === StudentAttendanceStatus.Absent,
    ).length;

    this.cancelledStudentCount = this.sessions.filter(
      (s) => s.studentSessionStatus === StudentAttendanceStatus.Cancelled,
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

  public getInvoice(): void {
    this.router.navigate([
      `/invoice/${this.userId}/${this.viewMonth.toISODate()}`,
    ]);
  }
}
