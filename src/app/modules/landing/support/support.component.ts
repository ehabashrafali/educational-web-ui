import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FuseAlertComponent } from '@fuse/components/alert';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    MatIconModule,
    FuseAlertComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
  ],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent implements OnInit {
  @ViewChild('supportNgForm') supportNgForm: NgForm;
  alert: any;
  supportForm: UntypedFormGroup;

  constructor(
    private _formBuilder: UntypedFormBuilder,
  ) { }
  ngOnInit(): void {
    // Create the support form
    this.supportForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  clearForm(): void {
    // Reset the form
    this.supportNgForm.resetForm();
  }

  /**
   * Send the form
   */
  sendForm(): void {
    // Send your form here using an http request
    console.log('Your message has been sent!');

    // Show a success message (it can also be an error message)
    // and remove it after 5 seconds
    this.alert = {
      type: 'success',
      message:
        'Your request has been delivered! A member of our support staff will respond as soon as possible.',
    };

    setTimeout(() => {
      this.alert = null;
    }, 7000);

    // Clear the form
    this.clearForm();
  }
}
