import { Routes } from "@angular/router";
import { TimetableComponent } from "./timetable.component";

export default [
  {
    path: "",
    component: TimetableComponent,
  },
  {
    path: ":id",
    component: TimetableComponent,
  },
  {
    path: ":id/:role",
    component: TimetableComponent,
  },
] as Routes;
