import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { StudentService } from "app/shared/sevices/student.service";
import { Location } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FuseCardComponent } from "@fuse/components/card";
import { StudentDTO } from "../models/student.dto";
import { tap } from "rxjs";

@Component({
  selector: "app-student-info",
  standalone: true,
  imports: [FuseCardComponent, MatIconModule, MatButtonModule],
  templateUrl: "./student-info.component.html",
  styleUrl: "./student-info.component.scss",
})
export class StudentInfoComponent implements OnInit {
  userProfile: StudentDTO;
  constructor(
    private location: Location,
    private _studentService: StudentService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get("id");
    if (studentId) {
      this._studentService
        .getStudent(studentId)
        .pipe(
          tap((profile) => {
            this.userProfile = profile;
          }),
        )
        .subscribe();
    }
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
