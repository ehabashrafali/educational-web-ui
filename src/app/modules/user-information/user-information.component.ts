import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FuseCardComponent } from "@fuse/components/card";
import { UserService } from "app/core/user/user.service";
import { InstructorService } from "app/shared/sevices/instructor.service";
import { StudentService } from "app/shared/sevices/student.service";
import { UserProfile } from "../models/user.profile";
import { filter, map, of, switchMap, tap } from "rxjs";
import { Role, User } from "app/core/user/user.types";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { StudentDTO } from "../models/student.dto";

@Component({
  selector: "app-user-information",
  standalone: true,
  imports: [FuseCardComponent, MatIconModule, MatButtonModule],
  templateUrl: "./user-information.component.html",
  styleUrl: "./user-information.component.scss",
})
export class UserInformationComponent implements OnInit {
  studentId: string;
  constructor(
    private location: Location,
    private _studentService: StudentService,
    private _instructorService: InstructorService,
    private _userService: UserService,
    private route: ActivatedRoute,
  ) {}

  userProfile: UserProfile | StudentDTO = null;
  currentUser: User;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get("id")),
        tap((id) => {
          this.studentId = id;
        }),
      )
      .subscribe();

    this._userService.user$
      .pipe(
        filter((user) => !!user),
        switchMap((user) => {
          this.currentUser = user;
          if (this.studentId) {
            return this._studentService.getStudent(this.studentId);
          } else if (user!.role == Role.Student) {
            return this._studentService.getStudent(user!.id);
          } else if (user!.role == Role.Instructor) {
            return this._instructorService.getInstructorProfile(user!.id);
          }
          return of(null);
        }),
        map((profile) => profile as UserProfile),
        tap((profile) => {
          this.userProfile = profile;
        }),
      )
      .subscribe();
  }
  goBack(): void {
    this.location.back();
  }
  getMeetingId(value: string | undefined): string {
    if (!value) return "--";
    const match = value.match(/Meeting ID:\s*([\d\s]+)/);
    return match ? `${match[1].trim()}` : "--";
  }
  getPasscode(value: string | undefined): string {
    if (!value) return "--";
    const match = value.match(/Passcode:\s*([\w\d]+)/);
    return match ? `${match[1].trim()}` : "--";
  }
}
