import { Injectable, TemplateRef } from "@angular/core";
import { NotificationService } from "app/shared/sevices/notification.service";
import { tap } from "rxjs";

@Injectable({ providedIn: "root" })
export class ToastService {
  toasts: ToastMessage[] = [];

  constructor(private notificationService: NotificationService) {}

  error(toastMessage: ToastMessage) {
    this.add({
      ...toastMessage,
      type: "danger",
      autoHide: true,
    });
  }

  warning(toastMessage: ToastMessage) {
    this.add({
      ...toastMessage,
      type: "warning",
      autoHide: true,
    });
  }

  info(toastMessage: ToastMessage) {
    this.add({
      ...toastMessage,
      autoHide: true,
      type: "info",
    });
  }

  success(toastMessage: ToastMessage) {
    this.add({
      ...toastMessage,
      autoHide: true,
      type: "success",
    });
  }

  private add(toastMessage: ToastMessage) {
    this.toasts.push(toastMessage);
    this.notificationService.notify(
      toastMessage.title,
      !toastMessage.button?.text
        ? toastMessage.message
        : toastMessage.message + ` (click to ${toastMessage.button.text})`,
      () => {
        this.remove(toastMessage);
        if (toastMessage.button?.action) toastMessage.button.action();
      },
    );
  }

  remove(toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}

export const showToastOnSuccess = (
  ToastService: ToastService,
  toastMessage: ToastMessage,
) => tap(() => ToastService.success(toastMessage));

export interface ToastMessage {
  title?: string;
  message?: string;
  template?: TemplateRef<any>;
  button?: {
    text: string;
    color?: "primary" | "accent" | "warning" | "danger" | "info";
    action: () => void;
  };
  type?: "danger" | "success" | "info" | "warning";
  delayTime?: number;
  autoHide?: boolean;
  className?: string;
  time?: Date;
}
