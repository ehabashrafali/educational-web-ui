import { AsyncPipe } from "@angular/common";
import { Component, Injector, OnInit, Pipe } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule, MatOptionModule } from "@angular/material/core";
import { MatError, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from "@angular/material/datepicker";
import {
  Grade,
  IslamicStudiesBooks,
  QuranRecitationTopic,
  QuranSurah,
  TajweedRules,
} from "../models/report.dto";
import { PipesModule } from "../pipes.module";
import { StudentService } from "app/shared/sevices/student.service";
import { filter, map, takeUntil, tap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import {
  showToastOnSuccess,
  ToastService,
} from "app/shared/sevices/toasts.service";
import { UserService } from "app/core/user/user.service";
import { Location } from "@angular/common";
import { ModalService } from "app/shared/sevices/modal.service";
import {
  BasicQuranRecitationRule,
  IslamicStudiesBook,
  Tajweed,
} from "../models/monthly-report.dto";

@Component({
  selector: "app-student-report",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatFormFieldModule,
    MatError,
    MatButtonModule,
    MatSlideToggleModule,
    AsyncPipe,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatDatepicker,
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

  userId: string;
  public monthlyReportForm: FormGroup;
  private studentId: string;
  toDayDate = new Date().toISOString().substring(0, 10);
  public toastService: ToastService;

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public userService: UserService,
    private router: Router,
    public injector: Injector,
    private location: Location,
    public modalService: ModalService,
  ) {
    this.toastService = this.injector.get(ToastService);

    this.monthlyReportForm = this.fb.group({
      date: [{ value: this.toDayDate, disabled: true }],
      memorization: [null],
      noOfMemorizationAyah: [""],
      memorizationGrade: [null],

      reading: [""],
      noOfReadingAyah: [""],
      readingGrade: [null],
      basicQuranRecitationRulesProgress: [""],
      tajweedRules: this.fb.array([]),
      islamicStudiesBooks: fb.array([]),
      basicQuranRecitationRules: fb.array([]),
      tajweedRulesProgress: [""],

      quranComments: [""],

      islamicStudiesProgress: [""],
      islamicStudiesComments: [""],
      islamicStudiesTopics: [""],
    });
  }

  ngOnInit(): void {
    this.userService.user$
      .pipe(
        filter((user) => !!user),
        tap((user) => {
          this.userId = user.id;
        }),
      )
      .subscribe();

    this.route.paramMap
      .pipe(
        map((params) => params.get("id")),
        tap((id) => {
          this.studentId = id;
        }),
      )
      .subscribe();
  }

  submitMonthlyReport() {
    debugger;
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

      islamicStudiesBooks: formVal.islamicStudiesBook.map(
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
  cancel() {
    this.modalService
      .confirmLosingChanges(this.monthlyReportForm, () => this.location.back())
      .subscribe();
  }
}
