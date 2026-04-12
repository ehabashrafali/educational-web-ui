import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { InstructorService } from "app/shared/sevices/instructor.service";
import { ModalService } from "app/shared/sevices/modal.service";
import { SessionService } from "app/shared/sevices/session.service";
import {
  showToastOnSuccess,
  ToastService,
} from "app/shared/sevices/toasts.service";
import { catchError, Observable, tap, throwError } from "rxjs";
import { AsyncPipe, Location } from "@angular/common";
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
  StudentAttendanceStatus,
  SessionDuration,
  SessionDto,
} from "../models/session.dto";
import { StudentDTO } from "../models/student.dto";
import { InstrctorDto } from "../models/instructor.dto";
import { StudentService } from "app/shared/sevices/student.service";

@Component({
  selector: "app-edit-session",
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
  templateUrl: "./edit-session.component.html",
  styleUrl: "./edit-session.component.scss",
})
export class EditSessionComponent implements OnInit {
  private sessionId: string = "";
  editSessionForm: FormGroup;
  InstructorsessionStatus = InstructorAttendanceStatus;
  studentSessionStatus = StudentAttendanceStatus;
  SessionDuration = SessionDuration;
  public _instructors$!: Observable<InstrctorDto[]>;
  public _students$!: Observable<StudentDTO[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: ModalService,
    private instructorService: InstructorService,
    private sessionService: SessionService,
    private studentService: StudentService,
    private toastService: ToastService,
  ) {
    this.editSessionForm = this.buildForm(this.fb);
  }

  buildForm(fb: FormBuilder): FormGroup {
    return fb.group({
      date: ["", { validators: [Validators.required], disabled: true }],
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
    this.sessionId = this.route.snapshot.paramMap.get("id") ?? "";
    this._students$ = this.studentService.students$;
    this._instructors$ = this.instructorService.instructors$;
    this.instructorService.getInstructors([]);
    this.studentService.getStudents([]);
    this.sessionService
      .getSessionById(this.sessionId)
      .pipe(
        tap((session) => {
          this.editSessionForm.patchValue({
            date: session.date,
            duration: session.duration,
            instructorId: session.instructorId,
            studentId: session.studentId,
            instructorSessionStatus: session.instructorSessionStatus,
            studentSessionStatus: session.studentSessionStatus,
          });
        }),
      )
      .subscribe();
  }
  submitEditSession() {
    if (this.editSessionForm.invalid) {
      this.editSessionForm.markAllAsTouched();
      return;
    }
    this.sessionService
      .Update(this.sessionId, this.editSessionForm.value as SessionDto)
      .pipe(
        showToastOnSuccess(this.toastService, {
          title: "Success",
          message: "Session updated successfully",
        }),
        tap(() => this.location.back()),
        catchError((error) => {
          this.toastService.error({
            title: "Error",
            message: error?.error,
          });
          return throwError(() => error);
        }),
      )
      .subscribe();
  }
}
