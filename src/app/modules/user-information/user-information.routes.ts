import { Routes } from "@angular/router";
import { UserInformationComponent } from "./user-information.component";

export default [
  {
    path: "",
    component: UserInformationComponent,
  },
  {
    path: ":id",
    component: UserInformationComponent,
  },
] as Routes;
