import { Routes } from "@angular/router";
import { ProfilesComponent } from "./profiles.component";

export default [
  {
    path: "",
    component: ProfilesComponent,
  },
  {
    path: ":id",
    component: ProfilesComponent,
  },
] as Routes;
