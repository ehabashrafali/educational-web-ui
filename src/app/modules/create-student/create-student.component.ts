import { AsyncPipe, NgClass, NgFor } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
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
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { PipesModule } from "../pipes.module";
import { MatCardModule } from "@angular/material/card";
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from "@angular/material/table";

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
    MatTableModule,
    MatCardModule,
    NgFor,
  ],
  templateUrl: "./create-student.component.html",
  styleUrl: "./create-student.component.scss",
})
export class CreateStudentComponent implements OnInit {
  createStudentForm: FormGroup;
  public _instructors$: Observable<InstrctorDto[]>;
  dataSource: MatTableDataSource<AbstractControl>;

  @ViewChild("table") table: MatTable<any>;

  uid = 0;
  timeZone: string;
  trackRows(index: number, row: AbstractControl) {
    return row.value.uid;
  }
  get weeklyAppointments() {
    return this.createStudentForm.get("weeklyAppointments") as FormArray;
  }

  private addRow() {
    const rows = this.weeklyAppointments;
    rows.push(
      this.fb.group({
        uid: this.nextUid(),
        day: [""],
        time: [1],
        timeZone: [""],
      }),
    );
  }

  createRow() {
    this.addRow();
    this.dataSource.data = this.weeklyAppointments.controls;
  }
  private nextUid() {
    ++this.uid;
    return this.uid;
  }

  remove(row: AbstractControl) {
    const rows = this.weeklyAppointments;
    const index = rows.controls.indexOf(row);
    if (index >= 0) {
      rows.removeAt(index);
      this.dataSource.data = this.weeklyAppointments.controls;
    }
  }

  displayedColumns = ["day", "time", "actions"];

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
      zoomLink: [""],
      weeklyAppointments: this.fb.array([]),
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this._instructors$ = this.instructorService.instructors$;
    this.instructorService.getInstructors([]);
    this.dataSource = new MatTableDataSource(this.weeklyAppointments.controls);
    this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  submit(): void {
    if (this.createStudentForm.valid) {
      const formValue = this.createStudentForm.value;
      debugger;

      const payload = {
        ...formValue,
        weeklyAppointments: formValue.weeklyAppointments.map(
          (appointment: any) => ({
            day: appointment.day.toString(),
            time: appointment.time?.toString(),
            timeZone: this.timeZone,
          }),
        ),
      };
      this.studentService
        .createStudent(payload)
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
