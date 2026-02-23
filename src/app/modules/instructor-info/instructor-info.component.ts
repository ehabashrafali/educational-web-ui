import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FuseCardComponent } from "@fuse/components/card/public-api";
import { InstrctorDto } from "../models/instructor.dto";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { InstructorService } from "app/shared/sevices/instructor.service";
import { tap } from "rxjs";
import { UserProfile } from "../models/user.profile";

@Component({
  selector: "app-instructor-info",
  standalone: true,
  imports: [FuseCardComponent, MatIconModule, MatButtonModule],
  templateUrl: "./instructor-info.component.html",
  styleUrl: "./instructor-info.component.scss",
})
export class InstructorInfoComponent implements OnInit {
  userProfile: UserProfile;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private _instructorService: InstructorService,
  ) {}
  ngOnInit(): void {
    const instructorId = this.route.snapshot.paramMap.get("id");
    if (instructorId) {
      this._instructorService
        .getInstructorProfile(instructorId)
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
