import { Routes } from "@angular/router";
import { MonthlyReportComponent } from "./monthly-report.component";

export default [
  {
    path: "",
    component: MonthlyReportComponent,
  },
  {
    path: ":id",
    component: MonthlyReportComponent,
  },
] as Routes;
