import { Routes } from "@angular/router";
import { InstructorsListComponent } from "./instructors-list.component";

export default [
  {
    path: "",
    component: InstructorsListComponent,
  },
  {
    path: ":id",
    component: InstructorsListComponent,
  },
] as Routes;
