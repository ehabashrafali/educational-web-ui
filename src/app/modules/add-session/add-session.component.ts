import { Component, OnInit } from "@angular/core";
import { InstructorService } from "app/shared/sevices/instructor.service";
import { SessionService } from "app/shared/sevices/session.service";
import { StudentService } from "app/shared/sevices/student.service";
import { catchError, Observable, throwError } from "rxjs";
import { StudentDTO } from "../models/student.dto";
import { InstrctorDto } from "../models/instructor.dto";
import { AsyncPipe } from "@angular/common";
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule, MatNativeDateModule } from "@angular/material/core";
import {
  MatDatepickerToggle,
  MatDatepickerInput,
  MatDatepicker,
  MatDatepickerModule,
} from "@angular/material/datepicker";
import { MatFormFieldModule, MatError } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { PipesModule } from "../pipes.module";
import {
  InstructorAttendanceStatus,
  SessionDto,
  SessionDuration,
  StudentAttendanceStatus,
} from "../models/session.dto";
import {
  showToastOnSuccess,
  ToastService,
} from "app/shared/sevices/toasts.service";
import { DateTime } from "luxon";

@Component({
  selector: "app-add-session",
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
    MatDatepickerModule,
  ],
  templateUrl: "./add-session.component.html",
  styleUrl: "./add-session.component.scss",
})
export class AddSessionComponent implements OnInit {
  public _instructors$: Observable<InstrctorDto[]>;
  public _students$: Observable<StudentDTO[]>;
  public sessionForm: FormGroup;
  InstructorsessionStatus = InstructorAttendanceStatus;
  studentSessionStatus = StudentAttendanceStatus;
  SessionDuration = SessionDuration;
  date: Date;
  constructor(
    private instructorService: InstructorService,
    private sessionService: SessionService,
    private studentService: StudentService,
    private fb: FormBuilder,
    private toastService: ToastService,
  ) {
    this.sessionForm = this.fb.group({
      date: [toDateOnly(new Date()), Validators.required],
      instructorSessionStatus: [
        InstructorAttendanceStatus.Attend,
        Validators.required,
      ],
      instructorId: [null, Validators.required],
      studentId: [null, Validators.required],
      studentSessionStatus: [
        StudentAttendanceStatus.Attend,
        Validators.required,
      ],
      duration: [SessionDuration.ThirtyMinutes, Validators.required],
    });
  }
  ngOnInit(): void {
    this._students$ = this.studentService.students$;
    this._instructors$ = this.instructorService.instructors$;
    this.instructorService.getInstructors([]);
    this.studentService.getStudents([]);
  }
  submitSession() {
    if (this.sessionForm.invalid) {
      this.sessionForm.markAllAsTouched();
      return;
    }
    this.sessionForm.controls.date.setValue(
      toDateOnly(new Date(this.sessionForm.controls.date.value)),
    );
    this.sessionService
      .CreateSession(this.sessionForm.value as SessionDto)
      .pipe(
        showToastOnSuccess(this.toastService, {
          title: "Success",
          message: "Session created successfully",
        }),
        catchError((error) => {
          this.toastService.error({
            title: "Error",
            message: "Failed to create session",
          });
          return throwError(() => error);
        }),
      )
      .subscribe();
  }
}

export const toDateOnly = (date: Date): string =>
  DateTime.fromJSDate(date).toISODate();
