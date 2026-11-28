import { AsyncPipe, Location } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { Component, OnInit } from "@angular/core";
import { StudentService } from "app/shared/sevices/student.service";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatError, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ParentService } from "app/shared/sevices/parent.service";
import { ModalService } from "app/shared/sevices/modal.service";
import {
  showToastOnSuccess,
  ToastService,
} from "app/shared/sevices/toasts.service";
import { catchError, Observable, tap, throwError } from "rxjs";
import { StudentDTO } from "../models/student.dto";

@Component({
  selector: "app-create-parent",
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatError,
    AsyncPipe,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: "./create-parent.component.html",
  styleUrl: "./create-parent.component.scss",
})
export class CreateParentComponent implements OnInit {
  createParentForm: FormGroup;
  public _students$!: Observable<StudentDTO[]>;

  constructor(
    private parentService: ParentService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private modalService: ModalService,
    private location: Location,
    private studentService: StudentService,
  ) {
    this.createParentForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      phoneNumber: [""],
      studentIds: [[]],
    });
  }
  ngOnInit(): void {
    this._students$ = this.studentService.students$;
    this.studentService.getStudents([]);
  }
  submit(): void {
    if (this.createParentForm.valid) {
      const { studentIds, phoneNumber, ...rest } = this.createParentForm.value;
      this.parentService
        .createParent({
          ...rest,
          phoneNumber: phoneNumber || null,
          studentIds: studentIds || [],
        })
        .pipe(
          showToastOnSuccess(this.toastService, {
            title: "Success",
            message: "Parent created successfully",
          }),
          catchError((error) => {
            this.toastService.error({
              autoHide: false,
              title: "Error",
              message: error?.error?.Message,
            });
            return throwError(() => error);
          }),
          tap(() => this.location.back()),
        )
        .subscribe();
    } else {
      this.createParentForm.markAllAsTouched();
    }
  }
  cancel(): void {
    this.modalService
      .confirmLosingChanges(this.createParentForm, () => this.location.back())
      .subscribe();
  }
}
