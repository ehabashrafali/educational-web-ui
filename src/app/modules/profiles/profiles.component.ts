import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
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
    //const id = this.route.snapshot.paramMap.get("id");
    // this._instructorService.GetInstructorStudent(id).subscribe((students) => {
    //   this.students$.next(students as StudentDTO);
    // });
    this.students$ = new BehaviorSubject<StudentDTO[]>([
      {
        id: "1",
        fullName: "Ehab",
        email: "ehab@example.com",
        country: "Egypt",
        phoneNumber: "01000000000",
        ZoomMeeting: "https://zoom.us/j/123456789",
        age: 22,
      },
      {
        id: "2",
        fullName: "Ahmed Mohamed",
        email: "ahmed@example.com",
        country: "Egypt",
        phoneNumber: "01111111111",
        ZoomMeeting: "https://zoom.us/j/987654321",
        age: 24,
      },
      {
        id: "1",
        fullName: "Ehab",
        email: "ehab@example.com",
        country: "Egypt",
        phoneNumber: "01000000000",
        ZoomMeeting: "https://zoom.us/j/123456789",
        age: 22,
      },
      {
        id: "2",
        fullName: "Ahmed Mohamed",
        email: "ahmed@example.com",
        country: "Egypt",
        phoneNumber: "01111111111",
        ZoomMeeting: "https://zoom.us/j/987654321",
        age: 24,
      },
      {
        id: "1",
        fullName: "Ehab",
        email: "ehab@example.com",
        country: "Egypt",
        phoneNumber: "01000000000",
        ZoomMeeting: "https://zoom.us/j/123456789",
        age: 22,
      },
      {
        id: "2",
        fullName: "Ahmed Mohamed",
        email: "ahmed@example.com",
        country: "Egypt",
        phoneNumber: "01111111111",
        ZoomMeeting: "https://zoom.us/j/987654321",
        age: 24,
      },
      {
        id: "1",
        fullName: "Ehab",
        email: "ehab@example.com",
        country: "Egypt",
        phoneNumber: "01000000000",
        ZoomMeeting: "https://zoom.us/j/123456789",
        age: 22,
      },
      {
        id: "2",
        fullName: "Ahmed Mohamed",
        email: "ahmed@example.com",
        country: "Egypt",
        phoneNumber: "01111111111",
        ZoomMeeting: "https://zoom.us/j/987654321",
        age: 24,
      },
      {
        id: "1",
        fullName: "Ehab",
        email: "ehab@example.com",
        country: "Egypt",
        phoneNumber: "01000000000",
        ZoomMeeting: "https://zoom.us/j/123456789",
        age: 22,
      },
      {
        id: "2",
        fullName: "Ahmed Mohamed",
        email: "ahmed@example.com",
        country: "Egypt",
        phoneNumber: "01111111111",
        ZoomMeeting: "https://zoom.us/j/987654321",
        age: 24,
      },
      {
        id: "1",
        fullName: "Ehab",
        email: "ehab@example.com",
        country: "Egypt",
        phoneNumber: "01000000000",
        ZoomMeeting: "https://zoom.us/j/123456789",
        age: 22,
      },
      {
        id: "2",
        fullName: "Ahmed Mohamed",
        email: "ahmed@example.com",
        country: "Egypt",
        phoneNumber: "01111111111",
        ZoomMeeting: "https://zoom.us/j/987654321",
        age: 24,
      },
      {
        id: "1",
        fullName: "Ehab",
        email: "ehab@example.com",
        country: "Egypt",
        phoneNumber: "01000000000",
        ZoomMeeting: "https://zoom.us/j/123456789",
        age: 22,
      },
      {
        id: "2",
        fullName: "Ahmed Mohamed",
        email: "ahmed@example.com",
        country: "Egypt",
        phoneNumber: "01111111111",
        ZoomMeeting: "https://zoom.us/j/987654321",
        age: 24,
      },
      {
        id: "1",
        fullName: "Ehab",
        email: "ehab@example.com",
        country: "Egypt",
        phoneNumber: "01000000000",
        ZoomMeeting: "https://zoom.us/j/123456789",
        age: 22,
      },
      {
        id: "2",
        fullName: "Ahmed Mohamed",
        email: "ahmed@example.com",
        country: "Egypt",
        phoneNumber: "01111111111",
        ZoomMeeting: "https://zoom.us/j/987654321",
        age: 24,
      },
    ]).asObservable() as any;
  }
}
