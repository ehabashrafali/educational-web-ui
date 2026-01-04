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
import { StudentService } from "app/shared/sevices/student.service";
import { tap } from "rxjs";
import { MonthlyReportDto } from "../models/monthly-report.dto";
import { MatPaginatorModule } from "@angular/material/paginator";

@Component({
  selector: "app-monthly-report",
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    MatPaginatorModule,
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
  public reportDto: MonthlyReportDto[] = [];
  public dataSource = new MatTableDataSource<MonthlyReportDto>([]);
  public studentId: string;
  displayedColumns: string[] = [
    "date",
    "Reading",
    "Tajweed",
    "Writing",
    "subjects",
    "Performance",
    "Comments",
  ];

  groupHeaderColumns: string[] = ["group1", "group2"];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _userService: UserService,
    private _StudentService: StudentService
  ) {}

  ngOnInit(): void {
    this._userService.user$
      .pipe(
        tap((user) => {
          this.studentId = user.id;
        })
      )
      .subscribe();
    this._StudentService
      .getMonthlyReports(this.studentId)
      .pipe(
        tap((reports) => {
          this.dataSource.data = reports;
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  trackByFn(index: number, item: MonthlyReportDto): string {
    return item.id;
  }
}
