import { Routes } from "@angular/router";
import { InvoiceComponent } from "./invoice.component";

export default [
  {
    path: "",
    component: InvoiceComponent,
  },
  {
    path: ":id/:date",
    component: InvoiceComponent,
  },
] as Routes;
