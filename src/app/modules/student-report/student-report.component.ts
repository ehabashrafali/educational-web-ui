import { AsyncPipe } from "@angular/common";
import { Component, OnInit, Pipe } from "@angular/core";
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
import { values } from "lodash";
import {
  Grade,
  IslamicStudiesBooks,
  QuranRecitationTopic,
  QuranSurah,
  TajweedRules,
} from "../models/report.dto";
import { PipesModule } from "../pipes.module";

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

  public monthlyReportForm: FormGroup;
  toDayDate = new Date().toISOString().substring(0, 10);
  constructor(private fb: FormBuilder) {
    this.monthlyReportForm = this.fb.group({
      date: [{ value: this.toDayDate, disabled: true }, Validators.required],
      memorization: [null, Validators.required],
      noOfMemorizationAyah: ["", Validators.required],
      reading: ["", Validators.required],
      noOfReadingAyah: ["", Validators.required],
      grade: [null, Validators.required],
      basicQuranRecitationRules: [null, Validators.required],
      progress: ["", Validators.required],
      tajweedRules: ["", Validators.required],
      quranComments: ["", Validators.required],
      islamicStudiesProgress: ["", Validators.required],
      islamicStudiesComments: ["", Validators.required],
      islamicStudiesTopics: ["", Validators.required],
      islamicStudiesBook: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  submitMonthlyReport() {
    debugger;
    if (this.monthlyReportForm.invalid) {
      this.monthlyReportForm.markAllAsTouched();
      return;
    }
    const formVal = this.monthlyReportForm.getRawValue();
    console.log(formVal);
  }
}
