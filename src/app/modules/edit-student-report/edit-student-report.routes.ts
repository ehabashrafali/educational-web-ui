import { Routes } from "@angular/router";
import { EditStudentReportComponent } from "./edit-student-report.component";

export default [
  {
    path: "",
    component: EditStudentReportComponent,
  },
  {
    path: ":id",
    component: EditStudentReportComponent,
  },
] as Routes;
