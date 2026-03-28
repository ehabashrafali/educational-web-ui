import { CdkScrollable } from "@angular/cdk/scrolling";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { PipesModule } from "../pipes.module";
import { UserService } from "app/core/user/user.service";
import { EMPTY, filter, map, switchMap, tap } from "rxjs";
import { Role, User } from "app/core/user/user.types";
import {
  InstructorAttendanceStatus,
  SessionDto,
  StudentAttendanceStatus,
} from "../models/session.dto";
import { SessionService } from "app/shared/sevices/session.service";
import { InstructorService } from "app/shared/sevices/instructor.service";
import { StudentService } from "app/shared/sevices/student.service";
import { UserProfile } from "../models/user.profile";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ActivatedRoute } from "@angular/router";
import { StudentDTO } from "../models/student.dto";
@Component({
  selector: "app-invoice",
  standalone: true,
  imports: [
    CdkScrollable,
    PipesModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: "./invoice.component.html",
  styleUrl: "./invoice.component.scss",
})
export class InvoiceComponent implements OnInit {
  invoiceNumber: number;
  date: string;
  userProfile: UserProfile | StudentDTO;
  total: number;
  sessions: SessionDto[];
  totalHours: number;
  payPalFees: number;
  Id: string;
  role: Role;
  @ViewChild("content") content: ElementRef;

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private _studentService: StudentService,
    private _instructorService: InstructorService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.invoiceNumber = this.generateInvoiceNo();

    this.route.paramMap
      .pipe(
        map((params) => ({
          date: params.get("date"),
          role: params.get("role") as Role | null,
          id: params.get("id"),
        })),
        filter(
          (params): params is { date: string; role: Role; id: string } =>
            !!params.date && !!params.role && !!params.id,
        ),
        map(({ date, role, id }) => ({
          date: `${date}`,
          role,
          id,
        })),
        tap(({ date, role, id }) => {
          this.date = date;
          this.role = role;
          this.Id = id;
        }),
        switchMap(({ role, id, date }) => {
          if (role === Role.Student) {
            return this._studentService.getStudent(id).pipe(
              tap((student) => {
                this.userProfile = student;
              }),
              switchMap(() =>
                this.sessionService.GetSessionsByIdAndDate(id, role, date),
              ),
            );
          }

          if (role === Role.Instructor) {
            return this._instructorService.getInstructorProfile(id).pipe(
              tap((inst) => {
                this.userProfile = inst;
              }),
              switchMap(() =>
                this.sessionService.GetSessionsByIdAndDate(id, role, date),
              ),
            );
          }

          return EMPTY;
        }),
        tap((sessions) => {
          this.sessions = sessions;
          this.total = this.totalSum();
          this.SetPayPalFees(this.total);
        }),
      )
      .subscribe();
  }
  private totalSum(): number {
    this.totalHours = 0;
    if (this.role === Role.Student) {
      const result = this.sessions.reduce(
        (acc, session) => {
          const valid =
            session.studentSessionStatus === StudentAttendanceStatus.Attend ||
            session.studentSessionStatus === StudentAttendanceStatus.Absent;

          if (!valid) return acc;

          acc.totalMinutes += session.duration;
          acc.amount += (session.duration / 60) * this.userProfile.fees;

          return acc;
        },
        { totalMinutes: 0, amount: 0 },
      );

      this.totalHours = result.totalMinutes / 60;

      return result.amount;
    }

    return this.sessions.reduce((sum, session) => {
      const valid =
        session.instructorSessionStatus === InstructorAttendanceStatus.Attend ||
        session.instructorSessionStatus === InstructorAttendanceStatus.Late;
      if (!valid) return sum;
      this.totalHours += session.duration / 60;
      return sum + (session.duration / 60) * this.userProfile.fees;
    }, 0);
  }
  private generateInvoiceNo() {
    return Math.floor(new Date().valueOf() * Math.random());
  }
  exportToPdf(): void {
    const element = this.content.nativeElement;

    html2canvas(element, {
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgHeight = pageHeight * 0.7;

      const imgWidth = (canvas.width * imgHeight) / canvas.height;

      const x = (pageWidth - imgWidth) / 2;

      const y = pageHeight - imgHeight;

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

      pdf.save(`Invoice-${this.invoiceNumber}.pdf`);
    });
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
  SetPayPalFees(total: number) {
    if (this.role === Role.Student) {
      this.payPalFees = total * 0.05;
    } else {
      this.payPalFees = 0;
    }
  }

  getStudentAttendCount(): number {
    return this.sessions.filter(
      (session) =>
        session.studentSessionStatus === StudentAttendanceStatus.Attend,
    ).length;
  }

  getStudentAbsentCount(): number {
    return this.sessions.filter(
      (session) =>
        session.studentSessionStatus === StudentAttendanceStatus.Absent,
    ).length;
  }
  getInstructorAttendCount(): number {
    return this.sessions.filter(
      (session) =>
        session.instructorSessionStatus === InstructorAttendanceStatus.Attend ||
        session.instructorSessionStatus === InstructorAttendanceStatus.Late,
    ).length;
  }
  getInstructorAbsentCount(): number {
    return this.sessions.filter(
      (session) =>
        session.instructorSessionStatus === InstructorAttendanceStatus.Absent,
    ).length;
  }
}
