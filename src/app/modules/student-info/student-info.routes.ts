import { Routes } from "@angular/router";
import { StudentInfoComponent } from "./student-info.component";

export default [
  {
    path: "",
    component: StudentInfoComponent,
  },
  {
    path: ":id",
    component: StudentInfoComponent,
  },
] as Routes;
