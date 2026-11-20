import { Component, DestroyRef, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DateTime } from 'luxon';
import { catchError, EMPTY, finalize } from 'rxjs';
import { SessionService } from 'app/shared/sevices/session.service';
import { showToastOnSuccess, ToastService } from 'app/shared/sevices/toasts.service';
import { UpcomingSessionsDto } from '../models/upcoming-sessions.dto';

@Component({
  selector: 'app-schedule-session-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: "./schedule-session-dialog.component.html",
})
export class ScheduleSessionDialogComponent {
  private session = inject<UpcomingSessionsDto>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ScheduleSessionDialogComponent, string>);
  private sessionService = inject(SessionService);
  private toastService = inject(ToastService);
  private destroyRef = inject(DestroyRef);
  private initialTime = DateTime.fromISO(this.session.sessionDateTime).toLocal();
  readonly timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  readonly form = new FormGroup({
    date: new FormControl(this.initialTime.toISODate() ?? '', { nonNullable: true, validators: [Validators.required] }),
    time: new FormControl(this.initialTime.isValid ? this.initialTime.toFormat('HH:mm') : '', { nonNullable: true, validators: [Validators.required] }),
  });
  saving = false;
  error = '';

  save(): void {
    if (this.saving) return;
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const { date, time } = this.form.getRawValue();
    const selected = DateTime.fromISO(`${date}T${time}`);
    if (!selected.isValid || selected.toFormat('yyyy-MM-dd\'T\'HH:mm') !== `${date}T${time}`) {
      this.error = 'Select a valid date and time in your timezone.';
      return;
    }
    const newDateTime = selected.toUTC().toISO()!;
    this.error = '';
    this.saving = true;
    this.dialogRef.disableClose = true;
    this.sessionService.scheduleSession(this.session.zoomMeetingId, newDateTime)
      .pipe(
        showToastOnSuccess(this.toastService, {
          title: 'Session Rescheduled',
          message: 'The session has been successfully rescheduled.',
        }),
        catchError((error: HttpErrorResponse) => {
          this.error = error.error?.Message || 'An error occurred while rescheduling the session.';
          this.toastService.error({
            title: 'Reschedule Failed',
            message: this.error,
          });
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.saving = false;
          this.dialogRef.disableClose = false;
        }),
      )
      .subscribe(() => this.dialogRef.close(newDateTime));
  }
}
