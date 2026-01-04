import { Routes } from "@angular/router";
import { MyStudentsComponent } from "./my-students.component";

export default [
  {
    path: "",
    component: MyStudentsComponent,
  },
  {
    path: ":id",
    component: MyStudentsComponent,
  },
] as Routes;
