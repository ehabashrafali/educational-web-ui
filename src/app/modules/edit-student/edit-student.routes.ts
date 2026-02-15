import { Routes } from "@angular/router";
import { EditStudentComponent } from "./edit-student.component";

export default [
  {
    path: "",
    component: EditStudentComponent,
  },
  {
    path: ":id",
    component: EditStudentComponent,
  },
] as Routes;
