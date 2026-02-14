import { Component, OnInit } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { StudentService } from "app/shared/sevices/student.service";
import { StudentDTO } from "../models/student.dto";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";

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
  ],
  templateUrl: "./students-list.component.html",
  styleUrl: "./students-list.component.scss",
})
export class StudentsListComponent implements OnInit {
  students$: Observable<StudentDTO[]>;
  displayedColumns: string[] = ["Name", "Email", "Country", "Actions"];
  dataSource = new MatTableDataSource<StudentDTO>([]);

  constructor(private studentService: StudentService) {}

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

  deactivateStudent(studentId: string) {
    this.studentService.deactivate(studentId);
  }
}
