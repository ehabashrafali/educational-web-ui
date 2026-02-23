import { NgClass, AsyncPipe, NgFor } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Location } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule, MatError } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTableModule } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { InstructorService } from "app/shared/sevices/instructor.service";
import { PipesModule } from "../pipes.module";
import { ModalService } from "app/shared/sevices/modal.service";
import { tap } from "rxjs";
import {
  showToastOnSuccess,
  ToastService,
} from "app/shared/sevices/toasts.service";
import { InstrctorDto } from "../models/instructor.dto";

@Component({
  selector: "app-edit-instructor",
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
  templateUrl: "./edit-instructor.component.html",
  styleUrl: "./edit-instructor.component.scss",
})
export class EditInstructorComponent implements OnInit {
  editInstructorForm: FormGroup;
  instructorId: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private modalService: ModalService,
    private instructorService: InstructorService,
    private toastService: ToastService,
  ) {
    this.editInstructorForm = this.buildForm(this.fb);
  }
  ngOnInit(): void {
    this.instructorId = this.route.snapshot.paramMap.get("id");
    this.instructorService
      .getInstructorProfile(this.instructorId)
      .pipe(
        tap((instructor) => {
          this.editInstructorForm.patchValue({
            firstName: instructor.firstName,
            lastName: instructor.lastName,
            country: instructor.country,
            email: instructor.email,
            isActive: instructor.isActive,
            phoneNumber: instructor.phoneNumber,
            fees: instructor.fees,
            zoomLink: instructor.zoomMeeting,
          });
        }),
      )
      .subscribe();
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
  cancel(): void {
    this.modalService
      .confirmLosingChanges(this.editInstructorForm, () => this.location.back())
      .subscribe();
  }
  submit(): void {
    if (this.editInstructorForm.valid) {
      const updatedInstructor: InstrctorDto = {
        ...this.editInstructorForm.value,
      };

      this.instructorService
        .updateInstructor(this.instructorId, updatedInstructor)
        .pipe(
          showToastOnSuccess(this.toastService, {
            title: "Success",
            message: "Instructor updated successfully",
          }),
          tap(() => this.location.back()),
        )
        .subscribe();
    } else {
      this.editInstructorForm.markAllAsTouched();
    }
  }
}
