import { Routes } from "@angular/router";
import { StudentsListComponent } from "./students-list.component";

export default [
  {
    path: "",
    component: StudentsListComponent,
  },
  {
    path: ":id",
    component: StudentsListComponent,
  },
] as Routes;
