import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { Subject, catchError, tap, throwError } from "rxjs";
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";

import { SessionService } from "app/shared/sevices/session.service";
import {
  showToastOnSuccess,
  ToastService,
} from "app/shared/sevices/toasts.service";
import { GetSessionsResult } from "../models/get-sessions-result";
import { SessionDto } from "../models/session.dto";
import { MatSelectModule } from "@angular/material/select";

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
    MatPaginatorModule,
  ],
  templateUrl: "./sessions-management.component.html",
  styleUrl: "./sessions-management.component.scss",
})
export class SessionsManagementComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  totalRecords = 0;
  pageSize = 10;

  displayedColumns: string[] = [
    "Date",
    "InstructorName",
    "StudentName",
    "Duration",
    "Actions",
  ];

  dataSource = new MatTableDataSource<SessionDto>([]);

  private destroy$ = new Subject<void>();
  private filterSubject$ = new Subject<string>();
  private currentFilter = "";

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private sessionService: SessionService,
    private toastService: ToastService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadSessions(1, this.pageSize);

    this.filterSubject$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((filter) => {
          this.currentFilter = filter.toLowerCase();

          if (this.paginator) {
            this.paginator.firstPage();
          }

          this.applyLocalFilter();
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case "Date":
          return item.date ? new Date(item.date).getTime() : 0;
        case "InstructorName":
          return item.instructorName?.toLowerCase() || "";
        case "StudentName":
          return item.studentName?.toLowerCase() || "";
        case "Duration":
          return item.duration ?? 0;
        default:
          return "";
      }
    };

    this.dataSource.filterPredicate = (data: SessionDto, filter: string) => {
      const normalizedFilter = filter.trim().toLowerCase();

      return (
        data.instructorName?.toLowerCase().includes(normalizedFilter) ||
        data.studentName?.toLowerCase().includes(normalizedFilter) ||
        data.duration?.toString().toLowerCase().includes(normalizedFilter) ||
        (data.date
          ? new Date(data.date)
              .toISOString()
              .substring(0, 10)
              .includes(normalizedFilter)
          : false)
      );
    };

    this.dataSource.sort = this.sort;

    this.paginator.page
      .pipe(
        tap((event) => {
          this.pageSize = event.pageSize;
          this.loadSessions(event.pageIndex + 1, event.pageSize);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private loadSessions(pageNumber: number, pageSize: number): void {
    this.sessionService
      .GetSessions(pageNumber, pageSize)
      .pipe(
        tap((result: GetSessionsResult) => {
          this.dataSource.data = result.sessions;
          this.totalRecords = result.totalCount;
          this.applyLocalFilter();
        }),
        catchError((error) => {
          this.toastService.error({
            title: "Error",
            message: "Failed to load sessions.",
          });
          return throwError(() => error);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private applyLocalFilter(): void {
    this.dataSource.filter = this.currentFilter;

    if (this.dataSource.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value || "";
    this.filterSubject$.next(filterValue.trim());
  }

  addSessionInfo(): void {
    this.router.navigate(["/add-session"]);
  }

  edit(sessionId: string): void {
    this.router.navigate(["/edit-session", sessionId]);
  }

  delete(sessionId: string): void {
    this.sessionService
      .deleteSession(sessionId)
      .pipe(
        showToastOnSuccess(this.toastService, {
          title: "Success",
          message: "The session has been deleted successfully.",
        }),
        tap(() => {
          const currentPage = this.paginator ? this.paginator.pageIndex + 1 : 1;
          const currentPageSize = this.paginator
            ? this.paginator.pageSize
            : this.pageSize;

          this.loadSessions(currentPage, currentPageSize);
        }),
        catchError((error) => {
          this.toastService.error({
            title: "Error",
            message: "Failed to delete session.",
          });
          return throwError(() => error);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
