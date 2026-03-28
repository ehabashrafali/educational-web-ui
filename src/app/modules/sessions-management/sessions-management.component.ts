import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { SessionDto } from "../models/session.dto";
import { SessionService } from "app/shared/sevices/session.service";
import { showToastOnSuccess } from "app/shared/sevices/toasts.service";
import { ToastService } from "app/shared/sevices/toasts.service";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-sessions-management",
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
    MatSortModule,
  ],
  templateUrl: "./sessions-management.component.html",
  styleUrl: "./sessions-management.component.scss",
})
export class SessionsManagementComponent implements OnInit, AfterViewInit {
  sessios$: Observable<SessionDto[]>;
  displayedColumns: string[] = [
    "Date",
    "Duration",
    "InstructorName",
    "StudentName",
    "Actions",
  ];

  dataSource = new MatTableDataSource<SessionDto>([]);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private sessionService: SessionService,
    private toastService: ToastService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.sessionService
      .GetSessions()
      .pipe(
        tap((sessions) => {
          this.dataSource.data = sessions;
        }),
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case "Date":
          return item.date ? new Date(item.date).getTime() : 0;
        case "TeacherName":
          return item.instructorName?.toLowerCase() || "";
        case "StudentName":
          return item.studentName?.toLowerCase() || "";
        case "Duration":
          return item.duration ?? 0;
        default:
          return "";
      }
    };

    this.dataSource.sort = this.sort;
  }

  delete(sessionId: string) {
    this.sessionService
      .deleteSession(sessionId)
      .pipe(
        showToastOnSuccess(this.toastService, {
          title: "Success",
          message: "The session has been deleted successfully.",
        }),
        tap(() => {
          this.sessionService
            .GetSessions()
            .pipe(
              tap((sessions) => {
                this.dataSource.data = sessions;
              }),
            )
            .subscribe();
        }),
        catchError((error) => {
          this.toastService.error({
            title: "Error",
            message: "Failed to delete session.",
          });
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  addSessionInfo(): void {
    this._router.navigate(["/add-session"]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
