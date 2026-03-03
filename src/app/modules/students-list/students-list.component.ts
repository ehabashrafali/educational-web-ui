import { Component, OnInit } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { StudentService } from "app/shared/sevices/student.service";
import { StudentDTO } from "../models/student.dto";
import { catchError, Observable, tap, throwError } from "rxjs";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { Router } from "@angular/router";
import {
  showToastOnSuccess,
  ToastService,
} from "app/shared/sevices/toasts.service";

@Component({
  selector: "app-students-list",
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
  templateUrl: "./students-list.component.html",
  styleUrl: "./students-list.component.scss",
})
export class StudentsListComponent implements OnInit {
  students$: Observable<StudentDTO[]>;
  displayedColumns: string[] = [
    "Name",
    "Email",
    "Country",
    "Status",
    "Actions",
  ];
  dataSource = new MatTableDataSource<StudentDTO>([]);

  constructor(
    private studentService: StudentService,
    private router: Router,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.studentService.getStudents([]);
    this.studentService.students$.subscribe((students) => {
      this.dataSource.data = students;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  edit(studentId: string) {
    this.router.navigate(["/edit-student", studentId]);
  }

  delete(studentId: string) {
    this.studentService
      .delete(studentId)
      .pipe(
        showToastOnSuccess(this.toastService, {
          title: "Success",
          message: "The student has been deleted successfully.",
        }),
        tap(() => {
          this.studentService.getStudents([]);
        }),
        catchError((error) => {
          this.toastService.error({
            title: "Error",
            message: "Failed to delete student.",
          });
          return throwError(() => error);
        }),
      )
      .subscribe();
  }
  create() {
    this.router.navigate(["/create-student"]);
  }
  getStudentInfo(studentId: string) {
    this.router.navigate(["/student-info", studentId]);
  }
}
