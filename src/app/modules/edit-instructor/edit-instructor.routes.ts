import { Routes } from "@angular/router";
import { EditInstructorComponent } from "./edit-instructor.component";

export default [
  {
    path: "",
    component: EditInstructorComponent,
  },
  {
    path: ":id",
    component: EditInstructorComponent,
  },
] as Routes;
