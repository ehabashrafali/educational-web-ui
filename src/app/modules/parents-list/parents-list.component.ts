import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { Router } from "@angular/router";
import { ParentDto } from "../models/parent.dto";
import { StudentDTO } from "../models/student.dto";
import { ParentService } from "app/shared/sevices/parent.service";
import { ToastService } from "app/shared/sevices/toasts.service";

interface TreeRow {
  level: 0 | 1;
  parentId: string;
  name: string;
  email: string;
  phoneNumber: string;
  childrenCount: number;
}

const MOCK_PARENTS = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    firstName: "Ahmed",
    lastName: "Hassan",
    email: "ahmed.hassan@example.com",
    phoneNumber: "+20 100 111 2222",
    children: [
      {
        id: "a1",
        firstName: "Omar",
        lastName: "Hassan",
        fullName: "Omar Hassan",
        email: "omar.hassan@example.com",
        phoneNumber: "+20 100 111 3333",
      },
      {
        id: "a2",
        firstName: "Laila",
        lastName: "Hassan",
        fullName: "Laila Hassan",
        email: "laila.hassan@example.com",
        phoneNumber: "",
      },
    ],
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    firstName: "Sara",
    lastName: "Mohamed",
    email: "sara.mohamed@example.com",
    phoneNumber: null,
    children: [
      {
        id: "b1",
        firstName: "Youssef",
        lastName: "Mohamed",
        fullName: "Youssef Mohamed",
        email: "youssef.mohamed@example.com",
        phoneNumber: "+20 111 222 3333",
      },
    ],
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    firstName: "Khaled",
    lastName: "Ali",
    email: "khaled.ali@example.com",
    phoneNumber: "+20 122 333 4444",
    children: [],
  },
] as unknown as ParentDto[];

@Component({
  selector: "app-parents-list",
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: "./parents-list.component.html",
  styleUrl: "./parents-list.component.scss",
})
export class ParentsListComponent implements OnInit {
  columns = ["name", "email", "phoneNumber", "children"];
  rows: TreeRow[] = [];

  private parents: ParentDto[] = [];
  private expanded = new Set<string>();

  constructor(
    private parentService: ParentService,
    private toastService: ToastService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.parentService.getParents().subscribe({
      next: (parents) => {
        this.parents = parents ?? [];
        this.buildRows();
      },
      error: (error) => {
        this.toastService.error({
          title: "Error",
          message: error?.error?.Message || "Failed to load parents.",
        });
      },
    });
  }

  isExpanded(row: TreeRow): boolean {
    return this.expanded.has(row.parentId);
  }

  toggle(row: TreeRow): void {
    if (row.level !== 0 || row.childrenCount === 0) return;
    if (!this.expanded.delete(row.parentId)) this.expanded.add(row.parentId);
    this.buildRows();
  }

  private buildRows(): void {
    this.rows = this.parents.flatMap((parent) => [
      {
        level: 0 as const,
        parentId: parent.id,
        name: `${parent.firstName} ${parent.lastName}`.trim(),
        email: parent.email,
        phoneNumber: parent.phoneNumber ?? "-",
        childrenCount: parent.children?.length ?? 0,
      },
      ...(this.expanded.has(parent.id)
        ? (parent.children ?? []).map((child) =>
            this.childRow(parent.id, child),
          )
        : []),
    ]);
  }

  private childRow(parentId: string, child: StudentDTO): TreeRow {
    return {
      level: 1,
      parentId,
      name:
        child.fullName ||
        `${child.firstName ?? ""} ${child.lastName ?? ""}`.trim(),
      email: child.email,
      phoneNumber: child.phoneNumber || "-",
      childrenCount: 0,
    };
  }
  create(): void {
    this.router.navigate(["/create-parent"]);
  }
}
