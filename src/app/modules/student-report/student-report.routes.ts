import { Routes } from "@angular/router";
import { StudentReportComponent } from "./student-report.component";

export default [
  {
    path: "",
    component: StudentReportComponent,
  },
  {
    path: ":id",
    component: StudentReportComponent,
  },
] as Routes;
