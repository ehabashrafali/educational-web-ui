import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { InstructorService } from "app/shared/sevices/instructor.service";
import { StudentService } from "app/shared/sevices/student.service";
import { InstrctorDto } from "../models/instructor.dto";
import { StudentDTO } from "../models/student.dto";
import { map, Observable, take, tap } from "rxjs";

import {
  InstructorAttendanceStatus,
  SessionDto,
  StudentAttendanceStatus,
} from "../models/session.dto";
import { SessionService } from "app/shared/sevices/session.service";
import { Role } from "app/core/user/user.types";
import { TableUtil } from "app/shared/helpers/tableUtil";
import { Router } from "@angular/router";
import {
  getStudentAbsentCount,
  getStudentAttendCount,
  getInstructorAttendCount,
  getInstructorAbsentCount,
  getInstructorLateCount,
  getDeductedCancelledByInstructorSessionsCount,
  getInstructorCancelledCount,
} from "../models/invoice.helper";

@Component({
  selector: "app-invoices-management",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSortModule,
    AsyncPipe,
  ],
  templateUrl: "./invoices-management.component.html",
  styleUrl: "./invoices-management.component.scss",
})
export class InvoicesManagementComponent implements OnInit {
  Roles: string[] = ["Student", "Instructor"];
  userFees: number = 0;

  displayedColumns: string[] = [
    "monthYear",
    "attendClasses",
    "absentClasses",
    "total",
    "Actions",
  ];

  form!: FormGroup;
  students$: Observable<StudentDTO[]> | null = null;
  instructors$: Observable<InstrctorDto[]> | null = null;
  dataSource = new MatTableDataSource<SessionSummary>([]);
  selectedRole!: Role;

  constructor(
    private studentService: StudentService,
    private instructorService: InstructorService,
    private fb: FormBuilder,
    private sessionService: SessionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      role: [null],
      selectedUser: [null],
    });
  }

  onRoleChange(): void {
    const selectedRole = this.form.get("role")?.value;

    this.form.get("selectedUser")?.setValue(null);
    this.userFees = 0;
    this.dataSource.data = [];

    if (selectedRole === "Student") {
      this.students$ = this.studentService.students$;
      this.studentService.getStudents([]);
      this.displayedColumns = [
        "monthYear",
        "attendClasses",
        "absentClasses",
        "cancelledByInstructorClasses",
        "total",
        "Actions",
      ];
    } else if (selectedRole === "Instructor") {
      this.instructors$ = this.instructorService.instructors$;
      this.instructorService.getInstructors([]);
      this.displayedColumns = [
        "monthYear",
        "attendClasses",
        "absentClasses",
        "cancelledClasses",
        "lateClasses",
        "total",
        "Actions",
      ];
    }
  }

  onUserChange(): void {
    this.selectedRole = this.form.get("role")?.value;
    const selectedUser = this.form.get("selectedUser")?.value;

    if (!this.selectedRole || !selectedUser) {
      this.dataSource.data = [];
      this.userFees = 0;
      return;
    }

    if (this.selectedRole === "Student") {
      this.students$
        .pipe(
          take(1),
          map((students) => students.find((s) => s.id === selectedUser)),
          tap((student) => {
            this.userFees = student?.fees || 0;
          }),
        )
        .subscribe();
    } else if (this.selectedRole === "Instructor") {
      this.instructors$
        .pipe(
          take(1),
          map((instructors) => instructors.find((i) => i.id === selectedUser)),
          tap((instructor) => {
            this.userFees = instructor?.fees || 0;
          }),
        )
        .subscribe();
    }

    this.sessionService
      .getSessionsByUserId(selectedUser, this.selectedRole)
      .pipe(
        map((sessions) => this.groupSessionsByMonthYear(sessions)),
        map((grouped) =>
          grouped.map((group) => ({
            monthYear: group.monthYear,
            attendClasses:
              this.selectedRole === "Student"
                ? getStudentAttendCount(group.sessions)
                : getInstructorAttendCount(group.sessions),
            absentClasses:
              this.selectedRole === "Student"
                ? getStudentAbsentCount(group.sessions)
                : getInstructorAbsentCount(group.sessions),
            cancelledClasses:
              this.selectedRole === "Student"
                ? getDeductedCancelledByInstructorSessionsCount(group.sessions)
                : getInstructorCancelledCount(group.sessions),
            cancelledByInstructorClasses:
              this.selectedRole === "Student"
                ? getDeductedCancelledByInstructorSessionsCount(group.sessions)
                : 0,
            lateClasses:
              this.selectedRole === "Student"
                ? 0
                : getInstructorLateCount(group.sessions),
            total: this.totalSum(group.sessions, this.selectedRole),
          })),
        ),
        tap((sessionSummaries) => {
          this.dataSource.data = sessionSummaries;
        }),
      )
      .subscribe();
  }

  groupSessionsByMonthYear(
    sessions: SessionDto[],
  ): { monthYear: string; sessions: SessionDto[] }[] {
    const grouped: Record<string, SessionDto[]> = {};

    sessions.forEach((session) => {
      const date = new Date(session.date);
      const monthYear = date.toISOString().slice(0, 7);
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      grouped[monthYear].push(session);
    });

    return Object.keys(grouped).map((key) => ({
      monthYear: key,
      sessions: grouped[key],
    }));
  }

  totalSum(sessions: SessionDto[], selectedRole: string): number {
    if (selectedRole === "Student" || selectedRole === Role.Student) {
      const total = sessions.reduce((sum, session) => {
        const valid =
          session.studentSessionStatus === StudentAttendanceStatus.Attend ||
          session.studentSessionStatus === StudentAttendanceStatus.Absent;

        if (!valid) return sum;

        return sum + (session.duration / 60) * this.userFees;
      }, 0);
      const payPalFees = total * 0.05;
      return total + payPalFees;
    }
    const totalbeforeDeeduction = sessions.reduce((sum, session) => {
      const valid =
        session.instructorSessionStatus === InstructorAttendanceStatus.Attend ||
        session.instructorSessionStatus === InstructorAttendanceStatus.Late;

      if (!valid) return sum;

      return sum + (session.duration / 60) * this.userFees;
    }, 0);
    return (
      totalbeforeDeeduction -
      (getDeductedCancelledByInstructorSessionsCount(sessions) * 2 +
        getInstructorLateCount(sessions) * 1)
    );
  }

  export() {
    TableUtil.exportTableToExcel("invoicesTable", "Invoices");
  }

  getMonthInvoice(date: string) {
    const selectedRole = this.form.get("role")?.value;
    this.router.navigate([
      `/invoice/${this.form.get("selectedUser")?.value}/${selectedRole}/${date}-01`,
    ]);
  }
}

export interface SessionSummary {
  monthYear: string;
  attendClasses: number;
  absentClasses: number;
  cancelledClasses: number;
  cancelledByInstructorClasses: number;
  lateClasses: number;
  total: number;
}
