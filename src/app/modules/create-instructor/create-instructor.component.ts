import { NgClass, AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Location } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule, MatError } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { PipesModule } from "../pipes.module";
import { InstructorService } from "app/shared/sevices/instructor.service";
import { ModalService } from "app/shared/sevices/modal.service";
import {
  showToastOnSuccess,
  ToastService,
} from "app/shared/sevices/toasts.service";
import { tap } from "rxjs";

@Component({
  selector: "app-create-instructor",
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
  templateUrl: "./create-instructor.component.html",
  styleUrl: "./create-instructor.component.scss",
})
export class CreateInstructorComponent {
  createInstructorForm: FormGroup;
  constructor(
    private instructorService: InstructorService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private modalService: ModalService,
    private location: Location,
  ) {
    this.createInstructorForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: [""],
      email: ["", [Validators.required, Validators.email]],
      country: [""],
      phoneNumber: [""],
      fees: [0],
      password: ["", Validators.required],
      zoomLink: [""],
    });
  }
  submit(): void {
    if (this.createInstructorForm.valid) {
      this.instructorService
        .createInstructor(this.createInstructorForm.value)
        .pipe(
          showToastOnSuccess(this.toastService, {
            title: "Success",
            message: "Instructor created successfully",
          }),
          tap(() => this.location.back()),
        )
        .subscribe();
    } else {
      this.createInstructorForm.markAllAsTouched();
    }
  }
  cancel(): void {
    this.modalService
      .confirmLosingChanges(this.createInstructorForm, () =>
        this.location.back(),
      )
      .subscribe();
  }
}
