import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { InstructorService } from "app/shared/sevices/instructor.service";
import { Subject, takeUntil, tap } from "rxjs";

import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { CommonModule } from "@angular/common";
import { MatPaginatorModule } from "@angular/material/paginator";
import { StudentDTO } from "../models/student.dto";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-my-students",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: "./my-students.component.html",
  styleUrl: "./my-students.component.scss",
})
export class MyStudentsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) tableMatSort!: MatSort;

  displayedColumns: string[] = ["Name", "ReportStatus"];
  dataSource = new MatTableDataSource<any>();

  private _unsubscribeAll = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private instructorService: InstructorService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");

    if (!id) return;

    this.instructorService
      .GetInstructorStudents(id)
      .pipe(
        tap((students) => {
          this.dataSource.data = students;
        }),
        takeUntil(this._unsubscribeAll),
      )
      .subscribe();
  }

  addReport(studentId: string): void {
    this.router.navigate(["student-report/", studentId]);
  }

  setReportStatus(item: StudentDTO): string {
    if (!item?.monthlyReportDtos?.length) return "Add";
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const hasCurrentMonthReport = item.monthlyReportDtos.some((report) => {
      const reportDate = new Date(report.date);
      return (
        reportDate.getFullYear() >= currentYear &&
        reportDate.getMonth() >= currentMonth
      );
    });

    return hasCurrentMonthReport ? "Done" : "Add";
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.tableMatSort;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  trackByFn(index: number, item: any): any {
    return item.id ?? index;
  }

  onRowClick(row: StudentDTO): void {
    this.router.navigate(["user-info/", row.id]);
  }
}
