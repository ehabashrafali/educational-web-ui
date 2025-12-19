import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { UserService } from "app/core/user/user.service";
import { StudentController } from "../controllers/student.controller";
import { UserProfile } from "app/modules/models/user.profile";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  private _httpClient = inject(HttpClient);
  constructor() {}

  getStudentProfile(studentId: string): any {
    const url = StudentController.student;
    return this._httpClient.get<UserProfile>(`${url}?studentId=${studentId}`);
  }
}
