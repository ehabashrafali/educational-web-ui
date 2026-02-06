import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import {
  FuseConfirmationConfig,
  FuseConfirmationService,
} from "@fuse/services/confirmation";
import { FuseConfirmationDialogComponent } from "@fuse/services/confirmation/dialog/dialog.component";
import { filter, map, of, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  constructor(private confirmationService: FuseConfirmationService) {}

  open(
    config: FuseConfirmationConfig = {},
  ): MatDialogRef<FuseConfirmationDialogComponent> {
    return this.confirmationService.open(config);
  }

  confirmAction(title: string, message: string) {
    return this.confirmationService
      .open({
        title,
        message,
        icon: {
          show: true,
          name: "heroicons_outline:shield-check",
          color: "primary",
        },
        actions: {
          confirm: {
            show: true,
            label: "Confirm",
            color: "primary",
          },
          cancel: {
            show: true,
            label: "Cancel",
          },
        },
        dismissible: true,
      })
      .afterClosed()
      .pipe(map((result) => result as ModalResult));
  }

  confirmDestructiveAction(title: string, message: string) {
    return this.confirmationService
      .open({
        title,
        message,
        icon: {
          show: true,
          name: "heroicons_outline:exclamation-triangle",
          color: "danger",
        },
        actions: {
          confirm: {
            show: true,
            label: "Confirm",
            color: "danger",
          },
          cancel: {
            show: true,
            label: "Cancel",
          },
        },
        dismissible: false,
      })
      .afterClosed()
      .pipe(map((result) => result as ModalResult));
  }

  confirmLosingChanges(form: FormGroup | null = null, onConfirm: () => void) {
    if (form && !form.dirty) {
      onConfirm();
      return of(null);
    }
    return this.open({
      title: "Discard changes?",
      message:
        "You have unsaved changes. Are you sure you want to discard them?",
      icon: {
        show: true,
        name: "heroicons_outline:exclamation-triangle",
        color: "warning",
      },
      actions: {
        confirm: {
          show: true,
          label: "Discard",
          color: "warning",
        },
        cancel: {
          show: true,
          label: "Cancel",
        },
      },
      dismissible: true,
    })
      .afterClosed()
      .pipe(map((result) => result as ModalResult))
      .pipe(
        filterConfirmed(),
        tap(() => onConfirm()),
      );
  }

  dismissAll() {
    this.confirmationService.dismissAll();
  }
}

export const filterConfirmed = () =>
  filter((res) => res === ModalResult.Confirmed);

export enum ModalResult {
  Cancelled = "cancelled",
  Confirmed = "confirmed",
}
