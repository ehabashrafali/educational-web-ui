import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { StudentController } from "../controllers/student.controller";
import { UserProfile } from "app/modules/models/user.profile";
import { MonthlyReportDto } from "app/modules/models/monthly-report.dto";
import { UpcomingSessionsDto } from "app/modules/models/upcoming-sessions.dto";
import { SessionDto } from "app/modules/models/session.dto";
import { StudentDTO } from "app/modules/models/student.dto";
import {
  BehaviorSubject,
  catchError,
  first,
  Observable,
  tap,
  throwError,
} from "rxjs";
import { showToastOnSuccess, ToastService } from "./toasts.service";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  private _httpClient = inject(HttpClient);
  constructor(private toastService: ToastService) {}
  private readonly _students$ = new BehaviorSubject<StudentDTO[]>([]);

  get students$(): Observable<StudentDTO[]> {
    return this._students$.asObservable();
  }

  createMonthlyReport(studentId: string, monthlyReportDto: MonthlyReportDto) {
    return this._httpClient.post(
      `${StudentController.CreateMonthlyReport}/${studentId}`,
      monthlyReportDto,
    );
  }
  getMonthlyReports(id: string) {
    const url = StudentController.GetMonthlyReports;
    return this._httpClient.get<MonthlyReportDto[]>(`${url}?id=${id}`);
  }
  getTimeTable(id: string) {
    const url = StudentController.GetTimeTable;
    return this._httpClient.get<UpcomingSessionsDto[]>(`${url}/${id}`);
  }
  getStudents(studentsId: string[]) {
    this._httpClient
      .post(StudentController.Students, studentsId, {})
      .pipe(
        tap((students: StudentDTO[]) => this._students$.next(students)),
        first(),
      )
      .subscribe();
  }
  getStudentMonthlyReport(studentId: string) {
    const url = StudentController.GetMonthlyReport;
    return this._httpClient.get<MonthlyReportDto>(`${url}/${studentId}`);
  }
  deactivate(studentId: string) {
    const url = StudentController.Deactivate;
    return this._httpClient
      .put(`${url}/${studentId}`, {})
      .pipe(
        showToastOnSuccess(this.toastService, {
          title: "Success",
          message: "Student deactivated successfully",
        }),
        catchError((error) => {
          this.toastService.error({
            title: "Error",
            message: "Failed to deactivate student",
          });
          return throwError(() => error);
        }),
      )
      .subscribe();
  }
  getStudent(id: string): Observable<StudentDTO> {
    const url = StudentController.student;
    return this._httpClient.get<StudentDTO>(`${url}/${id}`);
  }
  updateStudent(id: string, studentDto: StudentDTO) {
    const url = StudentController.UpdateStudent;
    return this._httpClient.put(`${url}/${id}`, studentDto);
  }
  createStudent(studentDto: StudentDTO) {
    const url = StudentController.CreateStudent;
    return this._httpClient.post(url, studentDto);
  }
}
