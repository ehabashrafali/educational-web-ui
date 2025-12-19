import { CommonModule, NgClass } from "@angular/common";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatSort, MatSortModule } from "@angular/material/sort";

import { UserService } from "app/core/user/user.service";
import { ReportDTO } from "../models/report.dto";
import { StudentService } from "app/shared/sevices/student.service";

@Component({
  selector: "app-monthly-report",
  standalone: true,
  imports: [
    CommonModule,
    NgClass,

    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressBarModule,

    MatTableModule,
    MatSortModule,
  ],
  templateUrl: "./monthly-report.component.html",
  styleUrl: "./monthly-report.component.scss",
})
export class MonthlyReportComponent implements OnInit, AfterViewInit {
  public reportDto: ReportDTO[] = [];
  public dataSource = new MatTableDataSource<ReportDTO>([]);

  public displayedColumns: string[] = [
    "Id",
    "date",
    "Reading",
    "Tajweed",
    "Writing",
    "subjects",
    "Performance",
    "Comments",
  ];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _userService: UserService,
    private _StudentService: StudentService
  ) {}

  ngOnInit(): void {
    /**
     * Replace this with your real API call.
     * Example idea (adjust to your actual service methods):
     *
     * const studentId = this._userService.user?.id;
     * this._StudentService.getMonthlyReports(studentId).subscribe(reports => {
     *   this.reportDto = reports;
     *   this.dataSource.data = reports;
     * });
     */

    // Temporary demo data to ensure the UI works without errors:
    this.reportDto = [
      {
        id: "R-001",
        studentId: "S-01",
        month: new Date(2025, 0, 1),
        Reading: 80,
        Tajweed: 75,
        Writing: 70,
        subjects: 3,
        Performance: 78,
        Comments: "Good progress",
      },
      {
        id: "R-002",
        studentId: "S-01",
        month: new Date(2025, 1, 1),
        Reading: 85,
        Tajweed: 82,
        Writing: 76,
        subjects: 3,
        Performance: 82,
        Comments: "Improving well",
      },
    ];

    this.dataSource.data = this.reportDto;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  trackByFn(index: number, item: ReportDTO): string {
    return item.id;
  }
}
