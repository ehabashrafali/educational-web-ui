import { Component } from "@angular/core";
import { InstrctorDto } from "../models/instructor.dto";
import { catchError, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { InstructorService } from "app/shared/sevices/instructor.service";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import {
  showToastOnSuccess,
  ToastService,
} from "app/shared/sevices/toasts.service";

@Component({
  selector: "app-instructors-list",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: "./instructors-list.component.html",
  styleUrl: "./instructors-list.component.scss",
})
export class InstructorsListComponent {
  students$: Observable<InstrctorDto[]>;
  displayedColumns: string[] = [
    "Name",
    "Email",
    "Country",
    "Status",
    "Actions",
  ];
  dataSource = new MatTableDataSource<InstrctorDto>([]);

  constructor(
    private router: Router,
    private instructorService: InstructorService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.instructorService.getInstructors([]);
    this.instructorService.instructors$.subscribe((instructors) => {
      this.dataSource.data = instructors;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(instructorId: string) {
    this.router.navigate(["/edit-instructor", instructorId]);
  }

  deactivate(instructorId: string) {
    this.instructorService
      .deactivate(instructorId)
      .pipe(
        showToastOnSuccess(this.toastService, {
          title: "Success",
          message: "Instructor deactivated successfully",
        }),
        catchError((error) => {
          this.toastService.error({
            title: "Error",
            message: "Failed to deactivate instructor",
          });
          return throwError(() => error);
        }),
      )
      .subscribe();
  }
  create() {
    this.router.navigate(["/create-instructor"]);
  }
  getInstructorInfo(instructorId: string) {
    console.log(instructorId);
    this.router.navigate(["/instructor-info", instructorId]);
  }
}
