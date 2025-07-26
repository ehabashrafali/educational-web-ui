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
    this.supportForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  clearForm(): void {
    this.supportNgForm.resetForm();
  }

  /**
   * Send the form
   */
  sendForm(): void {

    if (this.supportForm.valid) {
      const values = this.supportForm.value;
      const params = new URLSearchParams();
      for (const key in values) {
        params.append(key, values[key]);
      }

      fetch('https://script.google.com/macros/s/AKfycbxwXm5-rnh-1g48lQcIJeTvgbCgZA0QqEeDSvjGqvwwVzh18m2WZsTNjiVIN5yX8AsARg/exec', {
        method: 'POST',
        mode: 'no-cors',
        body: params
      })
        .then(() => {
          console.log(values)
          this.alert = {
            type: 'success',
            message:
              'Thank You, We Will Contact You ASAP',
          };

          setTimeout(() => {
            this.alert = null;
          }, 5000);

          this.clearForm();
        })
        .catch(err => {
          console.error('Submission error:', err);
          alert('Something went wrong');
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
