import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class NotificationService {
  private _isAllowed$ = new BehaviorSubject<boolean>(
    this.getPermission() === "granted",
  );

  constructor() {}

  get isAllowed$() {
    return this._isAllowed$.asObservable();
  }

  private isNotificationSupported(): boolean {
    return typeof window !== "undefined" && "Notification" in window;
  }

  private getPermission(): NotificationPermission | "unsupported" {
    if (!this.isNotificationSupported()) return "unsupported";
    return Notification.permission;
  }

  isAllowed(): boolean {
    return this.getPermission() === "granted";
  }

  async requestPermission(): Promise<boolean> {
    if (!this.isNotificationSupported()) {
      this._isAllowed$.next(false);
      return false;
    }

    const permission = await Notification.requestPermission();
    const isAllowed = permission === "granted";
    this._isAllowed$.next(isAllowed);
    return isAllowed;
  }

  async notify(
    title: string,
    message: string,
    onclick?: () => void,
    onclose?: () => void,
  ): Promise<void> {
    if (!this.isNotificationSupported()) {
      return;
    }

    if (!this.isAllowed()) {
      const allowed = await this.requestPermission();
      if (!allowed) return;
    }

    const notification = new Notification(title, {
      body: message,
      icon: "favicon.svg",
    });

    notification.onclick = () => {
      window.focus();
      onclick?.();
    };

    notification.onclose = () => {
      onclose?.();
    };
  }
}
