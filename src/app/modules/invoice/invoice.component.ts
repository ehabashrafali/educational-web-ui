import { CdkScrollable } from "@angular/cdk/scrolling";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { PipesModule } from "../pipes.module";
import { UserService } from "app/core/user/user.service";
import { EMPTY, filter, map, of, switchMap, tap } from "rxjs";
import { Role, User } from "app/core/user/user.types";
import { AttendanceStatus, SessionDto } from "../models/session.dto";
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
  AttendanceStatus = AttendanceStatus;
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
            return this._studentService.getStudentProfile(user.id);
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
        }),
      )
      .subscribe();
  }

  private totalSum() {
    return this.sessions.length * (this.userProfile.fees ?? 0);
  }
  private generateInvoiceNo() {
    return Math.floor(new Date().valueOf() * Math.random());
  }
  exportToPdf(): void {
    const element = this.content.nativeElement;

    html2canvas(element, {
      scale: 2,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }
      pdf.save(`Invoice-${this.invoiceNumber}.pdf`);
    });
  }

  statusClass(status: AttendanceStatus): string {
    switch (status) {
      case AttendanceStatus.Attend:
        return "bg-green-100 rounded-full text-green-800";
      case AttendanceStatus.StudentLate5Minutes:
      case AttendanceStatus.InstructorLate5Minutes:
        return "bg-gray-100 text-gray-800";
      case AttendanceStatus.AbsentStudent:
      case AttendanceStatus.AbsentInstructor:
        return "bg-red-100 text-red-700";
      case AttendanceStatus.CancelledByInstructor:
        return "bg-yellow-100 text-yellow-800";
      case AttendanceStatus.CancelledByStudent:
        return "bg-red-100 text-red-900";
      default:
        return "bg-purple-100 text-purple-800";
    }
  }
}
