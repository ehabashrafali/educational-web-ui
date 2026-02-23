import { CdkScrollable } from "@angular/cdk/scrolling";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { PipesModule } from "../pipes.module";
import { UserService } from "app/core/user/user.service";
import { EMPTY, filter, switchMap, tap } from "rxjs";
import { Role, User } from "app/core/user/user.types";
import {
  InstructorAttendanceStatus,
  SessionDto,
  StudentAttendanceStatus,
} from "../models/session.dto";
import { SessionService } from "app/shared/sevices/session.service";
import { toDateOnly } from "../add-session/add-session.component";
import { InstructorService } from "app/shared/sevices/instructor.service";
import { StudentService } from "app/shared/sevices/student.service";
import { UserProfile } from "../models/user.profile";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
  userProfile: UserProfile;
  total: number;
  sessions: SessionDto[];
  totalHours: number;
  payPalFees: number;
  @ViewChild("content") content: ElementRef;

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private _studentService: StudentService,
    private _instructorService: InstructorService,
  ) {}

  ngOnInit(): void {
    this.invoiceNumber = this.generateInvoiceNo();
    this.date = toDateOnly(new Date());

    this.userService.user$
      .pipe(
        filter((user): user is User => !!user),

        switchMap((user) => {
          if (user.role === Role.Student) {
            return this._studentService.getStudent(user.id);
          }
          if (user.role === Role.Instructor) {
            return this._instructorService.getInstructorProfile(user.id);
          }
          return EMPTY;
        }),

        filter((profile): profile is UserProfile => !!profile),

        tap((profile) => {
          this.userProfile = profile;
        }),

        switchMap((profile) =>
          this.sessionService.GetOfCurrentMonthAndYear(
            profile.id,
            profile.role,
            this.date,
          ),
        ),
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
    if (this.userProfile.role === Role.Student) {
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
    this.payPalFees = total * 0.05;
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
