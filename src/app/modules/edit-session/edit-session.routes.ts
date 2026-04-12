import { Routes } from "@angular/router";
import { EditSessionComponent } from "./edit-session.component";

export default [
  {
    path: "",
    component: EditSessionComponent,
  },
  {
    path: ":id",
    component: EditSessionComponent,
  },
] as Routes;
