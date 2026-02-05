import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AppToastContainerComponent } from "./shared/components/app-toast-container/app-toast-container.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterOutlet, AppToastContainerComponent],
})
export class AppComponent {
  /**
   * Constructor
   */
  constructor() {}
}
