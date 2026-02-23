import { Routes } from "@angular/router";
import { InstructorInfoComponent } from "./instructor-info.component";

export default [
  {
    path: "",
    component: InstructorInfoComponent,
  },
  {
    path: ":id",
    component: InstructorInfoComponent,
  },
] as Routes;
