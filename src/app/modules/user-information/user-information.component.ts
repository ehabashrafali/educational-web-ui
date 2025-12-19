import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FuseCardComponent } from "@fuse/components/card";
import { UserService } from "app/core/user/user.service";
import { InstructorService } from "app/shared/sevices/instructor.service";
import { StudentService } from "app/shared/sevices/student.service";
import { UserProfile } from "../models/user.profile";
import { filter, map, of, switchMap, tap } from "rxjs";
import { Role } from "app/core/user/user.types";

@Component({
  selector: "app-user-information",
  standalone: true,
  imports: [FuseCardComponent, MatIconModule, MatButtonModule],
  templateUrl: "./user-information.component.html",
  styleUrl: "./user-information.component.scss",
})
export class UserInformationComponent implements OnInit {
  constructor(
    private _studentService: StudentService,
    private _instructorService: InstructorService,
    private _userService: UserService
  ) {}

  userProfile: UserProfile | null = null;

  ngOnInit(): void {
    // this._userService.user$
    //   .pipe(
    //     filter((user) => !!user),
    //     switchMap((user) => {
    //       if (user!.roles?.includes(Role.Student)) {
    //         return this._studentService.getStudentProfile(user!.id);
    //       }
    //       if (user!.roles?.includes(Role.Instructor)) {
    //         return this._instructorService.getInstructorProfile(user!.id);
    //       }
    //       return of(null);
    //     }),
    //     map((profile) => profile as UserProfile),
    //     tap((profile) => {
    //       this.userProfile = profile;
    //     })
    //   )
    //   .subscribe();
    this.userProfile = {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      roles: ["Student"],
      sessionsTimes: [new Date()],
      country: "USA",
    } as UserProfile;
  }
}
