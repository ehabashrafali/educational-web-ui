import { Component, OnInit, ViewChild } from "@angular/core";
import { StudentService } from "app/shared/sevices/student.service";
import { ActivatedRoute } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AsyncPipe, NgClass, NgFor } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatError, MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ModalService } from "app/shared/sevices/modal.service";
import { Location } from "@angular/common";
import { StudentDTO } from "../models/student.dto";
import {
  showToastOnSuccess,
  ToastService,
} from "app/shared/sevices/toasts.service";
import {
  MatTableDataSource,
  MatTable,
  MatTableModule,
} from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { PipesModule } from "../pipes.module";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { InstructorService } from "app/shared/sevices/instructor.service";
import { InstrctorDto } from "../models/instructor.dto";

@Component({
  selector: "app-edit-student",
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
  templateUrl: "./edit-student.component.html",
  styleUrl: "./edit-student.component.scss",
})
export class EditStudentComponent implements OnInit {
  public _student: StudentDTO;
  public _instructors$: Observable<InstrctorDto[]>;
  editStudentForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: ModalService,
    private toastService: ToastService,
    private instructorService: InstructorService,
  ) {
    this.editStudentForm = this.buildForm(this.fb);
  }

  dataSource: MatTableDataSource<AbstractControl>;

  @ViewChild("table") table: MatTable<any>;
  displayedColumns = ["day", "time", "actions"];
  uid = 0;
  trackRows(index: number, row: AbstractControl) {
    return row.value.uid;
  }
  get weeklyAppointments() {
    return this.editStudentForm.get("weeklyAppointments") as FormArray;
  }

  private addRow() {
    const rows = this.weeklyAppointments;
    rows.push(
      this.fb.group({
        uid: this.nextUid(),
        day: [""],
        time: [1],
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
  weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  remove(row: AbstractControl) {
    const rows = this.weeklyAppointments;
    const index = rows.controls.indexOf(row);
    if (index >= 0) {
      rows.removeAt(index);
      this.dataSource.data = this.weeklyAppointments.controls;
    }
  }
  buildForm(fb: FormBuilder): FormGroup {
    return fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      country: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      isActive: [true, [Validators.required]],
      phoneNumber: [""],
      fees: [0, [Validators.required, Validators.min(0)]],
      zoomLink: [""],
      weeklyAppointments: this.fb.array([]),
      instructorId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._instructors$ = this.instructorService.instructors$;
    this.instructorService.getInstructors([]);
    const id = this.route.snapshot.paramMap.get("id");
    this.dataSource = new MatTableDataSource(this.weeklyAppointments.controls);

    this.studentService
      .getStudent(id)
      .pipe(
        tap((student) => {
          this._student = student;

          this.editStudentForm.patchValue({
            firstName: student.firstName,
            lastName: student.lastName,
            country: student.country,
            email: student.email,
            isActive: student.isActive,
            phoneNumber: student.phoneNumber,
            fees: student.fees,
            zoomLink: student.zoomMeeting,
            instructorId: student.instructorId,
          });

          this.weeklyAppointments.clear();
          student.weeklyAppointments.forEach((appt) => {
            this.weeklyAppointments.push(
              this.fb.group({
                uid: this.nextUid(),
                day: [appt.day],
                time: [appt.time],
              }),
            );
          });

          this.dataSource.data = this.weeklyAppointments.controls;
        }),
      )
      .subscribe();
  }
  submit(): void {
    if (this.editStudentForm.valid) {
      debugger;
      const updatedStudent: StudentDTO = {
        ...this._student,
        ...this.editStudentForm.value,
        weeklyAppointments: this.editStudentForm.value.weeklyAppointments.map(
          (appointment: any) => ({
            day: appointment.day,
            time: appointment.time?.toString(),
          }),
        ),
      };
      this.studentService
        .updateStudent(this._student.id, updatedStudent)
        .pipe(
          showToastOnSuccess(this.toastService, {
            title: "Success",
            message: "Student updated successfully",
          }),
          tap(() => this.location.back()),
        )
        .subscribe();
    } else {
      this.editStudentForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.modalService
      .confirmLosingChanges(this.editStudentForm, () => this.location.back())
      .subscribe();
  }
}
