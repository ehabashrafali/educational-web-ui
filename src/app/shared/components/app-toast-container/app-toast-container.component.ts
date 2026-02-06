import { NgClass, NgTemplateOutlet } from "@angular/common";
import {
  Component,
  OnChanges,
  SimpleChanges,
  TemplateRef,
} from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { NgbToast, NgbToastHeader } from "@ng-bootstrap/ng-bootstrap";
import { ToastService, ToastMessage } from "app/shared/sevices/toasts.service";

@Component({
  selector: "app-toast-container",
  templateUrl: "./app-toast-container.component.html",
  standalone: true,
  styleUrls: ["./app-toast-container.component.scss"],
  imports: [
    NgbToast,
    NgClass,
    NgbToastHeader,
    NgTemplateOutlet,
    MatIcon,
    MatButton,
  ],
})
export class AppToastContainerComponent implements OnChanges {
  constructor(public toastService: ToastService) {}

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }

  ngOnChanges(changes: SimpleChanges): void {}

  getTitle(toast: ToastMessage) {
    if (toast.type === "danger") return "Error";
    if (toast.type === "warning") return "Warning";
    if (toast.type === "info") return "Info";
    if (toast.type === "success") return "Success";
  }

  executeAction(toast: ToastMessage) {
    if (!toast.button.action) return;
    toast.button.action();
    this.toastService.remove(toast);
  }
}
