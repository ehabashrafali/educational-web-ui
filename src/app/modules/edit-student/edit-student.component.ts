import { Component, OnInit } from "@angular/core";
import { StudentService } from "app/shared/sevices/student.service";
import { ActivatedRoute } from "@angular/router";
import { map, tap } from "rxjs";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { NgClass } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { ModalService } from "app/shared/sevices/modal.service";
import { Location } from "@angular/common";
import { StudentDTO } from "../models/student.dto";
import {
  showToastOnSuccess,
  ToastService,
} from "app/shared/sevices/toasts.service";

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
  ],
  templateUrl: "./edit-student.component.html",
  styleUrl: "./edit-student.component.scss",
})
export class EditStudentComponent implements OnInit {
  public _student: StudentDTO;
  editStudentForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: ModalService,
    private toastService: ToastService,
  ) {
    this.editStudentForm = this.buildForm(this.fb);
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
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.studentService
      .getStudent(id)
      .pipe(
        tap((student) => {
          this._student = student;
        }),
        map(() => {
          this.editStudentForm.patchValue({
            firstName: this._student.firstName,
            lastName: this._student.lastName,
            country: this._student.country,
            email: this._student.email,
            isActive: this._student.isActive,
            phoneNumber: this._student.phoneNumber,
            fees: this._student.fees,
            zoomLink: this._student.zoomMeeting,
          });
        }),
      )
      .subscribe();
  }
  submit(): void {
    if (this.editStudentForm.valid) {
      const updatedStudent: StudentDTO = {
        ...this._student,
        ...this.editStudentForm.value,
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
