import { AsyncPipe, Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, tap } from "rxjs";

import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatNativeDateModule } from "@angular/material/core";

import {
  Grade,
  IslamicStudiesBooks,
  QuranRecitationTopic,
  QuranSurah,
  TajweedRules,
} from "../models/report.dto";

import { PipesModule } from "../pipes.module";
import { StudentService } from "app/shared/sevices/student.service";
import {
  ToastService,
  showToastOnSuccess,
} from "app/shared/sevices/toasts.service";
import { UserService } from "app/core/user/user.service";
import { ModalService } from "app/shared/sevices/modal.service";
import { Role } from "app/core/user/user.types";
import { MonthlyReportDto } from "../models/monthly-report.dto";

@Component({
  selector: "app-student-report",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    PipesModule,
  ],
  templateUrl: "./student-report.component.html",
  styleUrl: "./student-report.component.scss",
})
export class StudentReportComponent implements OnInit {
  quranSurah = QuranSurah;
  grades = Grade;
  quranRecitationTopics = QuranRecitationTopic;
  islamicStudiesBooks = IslamicStudiesBooks;
  tajweedRules = TajweedRules;

  monthlyReportForm!: FormGroup;

  disableSubmit = false;
  private studentId!: string;
  private userId!: string;

  readonly today = new Date().toISOString().substring(0, 10);
  hasMonthlyReport: boolean;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private modalService: ModalService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.createForm(false);

    this.route.paramMap
      .pipe(
        tap((params) => {
          this.studentId = params.get("id")!;
        }),
      )
      .subscribe();

    this.userService.user$
      .pipe(
        filter(Boolean),
        tap((user) => this.handleUser(user)),
      )
      .subscribe();
  }

  /* -------------------- Form -------------------- */

  private createForm(disabled = false): void {
    this.monthlyReportForm = this.fb.group({
      date: [{ value: this.today, disabled: true }],

      memorization: [null],
      noOfMemorizationAyah: [null],
      memorizationGrade: [null],

      reading: [null],
      noOfReadingAyah: [null],
      readingGrade: [null],

      basicQuranRecitationRules: [[]],
      basicQuranRecitationRulesProgress: [null],

      tajweedRules: [[]],
      tajweedRulesProgress: [null],

      quranComments: [""],

      islamicStudiesBooks: [[]],
      islamicStudiesTopics: [""],
      islamicStudiesProgress: [null],
      islamicStudiesComments: [""],
    });

    if (disabled) {
      this.monthlyReportForm.disable();
    }
  }

  /* -------------------- User Handling -------------------- */
  private handleUser(user: any): void {
    this.userId = user.id;

    if (user.role === Role.Student) {
      this.disableSubmit = true;
      this.monthlyReportForm.disable();

      this.studentService
        .getStudentMonthlyReport(user.id)
        .pipe(
          tap((report) => {
            if (!report) {
              this.hasMonthlyReport = false;
              return;
            }

            this.hasMonthlyReport = true;
            this.fillForm(report);
          }),
        )
        .subscribe();
    }

    if (user.role === Role.Instructor) {
      this.disableSubmit = false;
      this.monthlyReportForm.enable(); // 👈 FULLY EDITABLE
    }
  }

  private fillForm(report: MonthlyReportDto): void {
    this.monthlyReportForm.patchValue({
      date: report.date
        ? new Date(report.date).toISOString().substring(0, 10)
        : this.today,

      memorization: report.memorization,
      noOfMemorizationAyah: report.noOfMemorizationAyah,
      memorizationGrade: report.memorizationGrade,

      reading: report.reading,
      noOfReadingAyah: report.noOfReadingAyah,
      readingGrade: report.readingGrade,

      basicQuranRecitationRules: report.basicQuranRecitationRules?.map(
        (x: any) => x.quranRecitationTopic,
      ),
      basicQuranRecitationRulesProgress:
        report.basicQuranRecitationRulesProgress,

      tajweedRules: report.tajweedRules?.map((x: any) => x.tajweedRule),
      tajweedRulesProgress: report.tajweedRulesProgress,

      quranComments: report.quranComments,

      islamicStudiesBooks: report.islamicStudiesBooks?.map((x: any) => x.book),
      islamicStudiesTopics: report.islamicStudiesTopics,
      islamicStudiesProgress: report.islamicStudiesProgress,
      islamicStudiesComments: report.islamicStudiesComments,
    });
  }

  submitMonthlyReport(): void {
    if (this.monthlyReportForm.invalid) {
      this.monthlyReportForm.markAllAsTouched();
      return;
    }

    const formVal = this.monthlyReportForm.getRawValue();

    const dto = {
      ...formVal,

      basicQuranRecitationRules: formVal.basicQuranRecitationRules.map(
        (topic: QuranRecitationTopic) => ({
          quranRecitationTopic: topic,
        }),
      ),

      tajweedRules: formVal.tajweedRules.map((rule: TajweedRules) => ({
        tajweedRule: rule,
      })),

      islamicStudiesBooks: formVal.islamicStudiesBooks.map(
        (book: IslamicStudiesBooks) => ({
          book,
        }),
      ),
    };

    this.studentService
      .createMonthlyReport(this.studentId, dto)
      .pipe(
        showToastOnSuccess(this.toastService, {
          title: "Success",
          message: "Report created successfully",
        }),
        tap(() => {
          this.router.navigate([`/my-students/${this.userId}`]);
        }),
      )
      .subscribe();
  }

  cancel(): void {
    this.modalService
      .confirmLosingChanges(this.monthlyReportForm, () => this.location.back())
      .subscribe();
  }
}
