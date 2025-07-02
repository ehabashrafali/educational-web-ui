import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class NotificationService {
    private _isAllowed$ = new BehaviorSubject<boolean>(
        Notification.permission === "granted"
    );
    constructor() {}

    get isAllowed$() {
        return this._isAllowed$.asObservable();
    }

    isAllowed(): boolean {
        return Notification.permission === "granted";
    }

    async requestPermission() {
        const permission = await Notification.requestPermission();
        const isAllowed = permission === "granted";
        this._isAllowed$.next(isAllowed);
        return isAllowed;
    }

    notify(
        title: string,
        message: string,
        onclick?: () => void,
        onclose?: () => void
    ): void {
        if (!this.isAllowed) {
            this.requestPermission().then((isAllowed) => {
                if (isAllowed) this.notify(title, message, onclick, onclose);
            });
            return;
        }
        if (!this.isAllowed) return;
        const notification = new Notification(title, {
            body: message,
            icon: "favicon.svg",
        });

        notification.onclick = () => {
            window.parent.focus();
            if (onclick) onclick();
        };
        if (onclose) notification.onclose = onclose;
    }
}
