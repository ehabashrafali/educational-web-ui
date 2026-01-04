import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { InstructorService } from "app/shared/sevices/instructor.service";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { StudentDTO } from "../models/student.dto";

@Component({
  selector: "app-profiles",
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: "./profiles.component.html",
  styleUrl: "./profiles.component.scss",
})
export class ProfilesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _instructorService: InstructorService
  ) {}
  public students$: BehaviorSubject<StudentDTO> = new BehaviorSubject(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this._instructorService
      .GetInstructorStudent(id)
      .pipe(
        tap((students) => {
          this.students$.next(students);
        })
      )
      .subscribe();
  }
}
