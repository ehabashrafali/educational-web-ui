import { AsyncPipe, NgClass } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatError, MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Observable, tap } from "rxjs";
import { InstrctorDto } from "../models/instructor.dto";
import { InstructorService } from "app/shared/sevices/instructor.service";
import {
  showToastOnSuccess,
  ToastService,
} from "app/shared/sevices/toasts.service";
import { ModalService } from "app/shared/sevices/modal.service";
import { Location } from "@angular/common";
import { StudentService } from "app/shared/sevices/student.service";
import { MatOptionModule, MatNativeDateModule } from "@angular/material/core";
import {
  MatDatepickerToggle,
  MatDatepickerInput,
  MatDatepicker,
  MatDatepickerModule,
} from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { PipesModule } from "../pipes.module";

@Component({
  selector: "app-create-student",
  standalone: true,
  imports: [
    NgClass,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatSelectModule,
    MatOptionModule,
    MatError,
    MatSlideToggleModule,
    FormsModule,
    PipesModule,
  ],
  templateUrl: "./create-student.component.html",
  styleUrl: "./create-student.component.scss",
})
export class CreateStudentComponent implements OnInit {
  createStudentForm: FormGroup;
  public _instructors$: Observable<InstrctorDto[]>;
  weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  constructor(
    private instructorService: InstructorService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private modalService: ModalService,
    private location: Location,
    private studentService: StudentService,
  ) {
    this.createStudentForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: [""],
      email: ["", [Validators.required, Validators.email]],
      country: [""],
      instructorId: ["", Validators.required],
      phoneNumber: [""],
      fees: [0],
      weeklyAppointments: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this._instructors$ = this.instructorService.instructors$;
    this.instructorService.getInstructors([]);
  }
  submit(): void {
    if (this.createStudentForm.valid) {
      this.studentService
        .createStudent(this.createStudentForm.value)
        .pipe(
          showToastOnSuccess(this.toastService, {
            title: "Success",
            message: "Student created successfully",
          }),
          tap(() => this.location.back()),
        )
        .subscribe();
    } else {
      this.createStudentForm.markAllAsTouched();
    }
  }
  cancel(): void {
    this.modalService
      .confirmLosingChanges(this.createStudentForm, () => this.location.back())
      .subscribe();
  }
}
