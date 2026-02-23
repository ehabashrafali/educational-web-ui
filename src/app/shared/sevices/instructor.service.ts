import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { InstructorController } from "../controllers/instructor.controller";
import { StudentDTO } from "app/modules/models/student.dto";
import { UserProfile } from "app/modules/models/user.profile";
import { InstrctorDto } from "app/modules/models/instructor.dto";

@Injectable({
  providedIn: "root",
})
export class InstructorService {
  private _httpClient = inject(HttpClient);
  private _students = new BehaviorSubject<StudentDTO>(null);
  private _instructors = new BehaviorSubject<InstrctorDto[]>(null);
  get students$() {
    return this._students.asObservable();
  }
  get instructors$() {
    return this._instructors.asObservable();
  }
  constructor() {}

  GetInstructorStudent(instructorId: string) {
    {
      const url = InstructorController.InstructorStudents;
      return this._httpClient
        .get<any>(`${url}?instructorId=${instructorId}`)
        .pipe(
          tap((students) => {
            this._students.next(students);
          }),
        );
    }
  }

  getInstructorProfile(instructorId: string) {
    const url = InstructorController.InstructorInfo;
    return this._httpClient.get<UserProfile>(
      `${url}?instructorId=${instructorId}`,
    );
  }

  getInstructors(instructorIds: string[]) {
    const url = InstructorController.Instructors;
    return this._httpClient
      .post<InstrctorDto[]>(url, instructorIds)
      .pipe(
        tap((instructors: InstrctorDto[]) => {
          this._instructors.next(instructors);
        }),
      )
      .subscribe();
  }

  deactivate(instructorId: string) {
    const url = InstructorController.Deactivate;
    return this._httpClient.put(`${url}/${instructorId}`, {});
  }
  createInstructor(instructor: InstrctorDto) {
    const url = InstructorController.CreateInstructor;
    return this._httpClient.post(url, instructor);
  }
  updateInstructor(id: string, instructor: InstrctorDto) {
    const url = InstructorController.UpdateInstructor;
    return this._httpClient.put(`${url}/${id}`, instructor);
  }
}
