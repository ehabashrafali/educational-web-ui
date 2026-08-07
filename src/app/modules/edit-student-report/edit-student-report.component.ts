import { AsyncPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule, MatNativeDateModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { StudentService } from "app/shared/sevices/student.service";
import { PipesModule } from "../pipes.module";
import {
  ToastService,
  showToastOnSuccess,
} from "app/shared/sevices/toasts.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "app/core/user/user.service";
import { ModalService } from "app/shared/sevices/modal.service";
import { Location } from "@angular/common";
import {
  Grade,
  IslamicStudiesBooks,
  QuranRecitationTopic,
  QuranSurah,
  TajweedRules,
} from "../models/report.dto";
import { catchError, filter, of, tap, throwError } from "rxjs";
import { MonthlyReportDto } from "../models/monthly-report.dto";

@Component({
  selector: "app-edit-student-report",
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
  templateUrl: "./edit-student-report.component.html",
  styleUrl: "./edit-student-report.component.scss",
})
export class EditStudentReportComponent implements OnInit {
  quranSurah = QuranSurah;
  grades = Grade;
  quranRecitationTopics = QuranRecitationTopic;
  islamicStudiesBooks = IslamicStudiesBooks;
  tajweedRules = TajweedRules;
  monthlyReportForm!: FormGroup;
  disableSubmit = false;
  hasMonthlyReport = true;
  private studentId!: string;

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
    this.createForm();
    this.route.paramMap
      .pipe(
        tap((params) => {
          this.studentId = params.get("id")!;
          this.studentService
            .getCurrentMonthlyReport(this.studentId)
            .pipe(
              tap((report) => {
                this.fillForm(report);
                this.monthlyReportForm.enable();
              }),
            )
            .subscribe();
        }),
      )
      .subscribe();
  }

  private createForm(): void {
    this.monthlyReportForm = this.fb.group({
      id: [""],
      date: [new Date().toLocaleDateString("en-GB"), { disabled: true }],
      memorization: [null],
      noOfMemorizationAyah: [0],
      memorizationGrade: [null],

      reading: [null],
      noOfReadingAyah: [0],
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
      othersIslamicStudiesBooks: [""],
    });
  }

  private fillForm(report: MonthlyReportDto): void {
    this.monthlyReportForm.patchValue({
      id: report.id,
      date: new Date(report.date).toISOString().split("T")[0],
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
      othersIslamicStudiesBooks: report.othersIslamicStudiesBooks,
    });
  }

  submit(): void {
    if (this.monthlyReportForm.invalid || !this.studentId) {
      this.monthlyReportForm.markAllAsTouched();
      return;
    }
    const formVal = this.monthlyReportForm.getRawValue();
    const dto = {
      ...formVal,
      id: formVal.id,
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
      .editMonthlyReport(this.studentId, dto)
      .pipe(
        showToastOnSuccess(this.toastService, {
          title: "Success",
          message: "Report updated successfully",
        }),
        tap(() => {
          this.location.back();
        }),
        catchError((error) => {
          this.toastService.error({
            title: "Error",
            message: "" + error?.error?.Message,
            autoHide: false,
          });
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  cancel(): void {
    (
      this.modalService.confirmLosingChanges(this.monthlyReportForm, () =>
        this.location.back(),
      ) as any
    ).subscribe();
  }
}
