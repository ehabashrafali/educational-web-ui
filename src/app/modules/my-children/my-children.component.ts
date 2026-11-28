import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { Role } from "app/core/user/user.types";
import { UserService } from "app/core/user/user.service";
import { ParentService } from "app/shared/sevices/parent.service";
import { ToastService } from "app/shared/sevices/toasts.service";
import { filter, map, switchMap, take } from "rxjs";
import { StudentDTO } from "../models/student.dto";

@Component({
  selector: "app-my-children",
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: "./my-children.component.html",
  styleUrl: "./my-children.component.scss",
})
export class MyChildrenComponent implements OnInit {
  children: StudentDTO[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private parentService: ParentService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.userService.user$
      .pipe(
        filter((user): user is NonNullable<typeof user> => !!user),
        take(1),
        switchMap((user) =>
          this.parentService
            .getParents()
            .pipe(
              map(
                (parents) =>
                  parents.find(
                    (p) => p.email?.toLowerCase() === user.email?.toLowerCase(),
                  )?.children ?? [],
              ),
            ),
        ),
      )
      .subscribe({
        next: (children) => (this.children = children),
        error: () =>
          this.toastService.error({
            title: "Error",
            message: "Failed to load children.",
          }),
      });
  }

  initial(child: StudentDTO): string {
    return (child.firstName || child.fullName || "?").charAt(0).toUpperCase();
  }

  showInvoice(child: StudentDTO): void {
    const month = new Date();
    const date = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}-01`;
    void this.router.navigate(["/invoice", child.id, Role.Student, date]);
  }

  showTimetable(child: StudentDTO): void {
    void this.router.navigate(["/timetable", child.id, Role.Student]);
  }

  showMonthlyReport(child: StudentDTO): void {
    void this.router.navigate(["/student-report", child.id]);
  }
}
