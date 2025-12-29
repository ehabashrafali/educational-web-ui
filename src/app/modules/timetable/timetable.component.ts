import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { FuseCardComponent } from "@fuse/components/card";
import { UserService } from "app/core/user/user.service";
import { map } from "rxjs";
import { PipesModule } from "../pipes.module";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { provideNativeDateAdapter } from "@angular/material/core";

@Component({
  selector: "app-timetable",
  standalone: true,
  imports: [
    FuseCardComponent,
    MatButtonModule,
    MatIconModule,
    PipesModule,
    MatIcon,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
  templateUrl: "./timetable.component.html",
  styleUrl: "./timetable.component.scss",
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimetableComponent implements OnInit {
  userId: string;
  public sessions = sessions;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.userProfile$
      .pipe(
        map((profile) => {
          this.userId = profile?.id;
        })
      )
      .subscribe();
  }
  joinSession(session: any) {
    console.log(session);
  }
}
export const sessions = [
  {
    date: new Date().toDateString(),
    title: "Mathematics",
    startTime: "09:00 AM",
    endTime: "10:00 AM",
    instructor: "John Doe",
    description: "An introductory session on algebra and geometry.",
    link: "https://example.com/session-details",
  },
  {
    date: new Date().toDateString(),
    title: "Science",
    startTime: "10:15 AM",
    endTime: "11:15 AM",
    instructor: "Jane Smith",
    description: "Exploring the basics of physics and chemistry.",
    link: "https://example.com/session-details",
  },
  {
    date: new Date().toDateString(),
    title: "Mathematics",
    startTime: "09:00 AM",
    endTime: "10:00 AM",
    instructor: "John Doe",
    description: "An introductory session on algebra and geometry.",
    link: "https://example.com/session-details",
  },
  {
    date: new Date().toDateString(),
    title: "Science",
    startTime: "10:15 AM",
    endTime: "11:15 AM",
    instructor: "Jane Smith",
    description: "Exploring the basics of physics and chemistry.",
    link: "https://example.com/session-details",
  },
];
