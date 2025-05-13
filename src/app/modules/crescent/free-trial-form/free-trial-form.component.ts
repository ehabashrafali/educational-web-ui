import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CountrySelectComponent } from '@wlucha/ng-country-select';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-free-trial-form',
  standalone: true,
  imports: [
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDividerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    NgxIntlTelInputModule,
    ReactiveFormsModule,
    CountrySelectComponent],
  templateUrl: './free-trial-form.component.html',
  styleUrl: './free-trial-form.component.scss'
})
export class FreeTrialFormComponent {
  preferredChannel: any;
  preferredTeacher: any;
  learnAbout: any;
  SearchCountryField = SearchCountryField;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  PhoneNumberFormat = PhoneNumberFormat;



  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    studentCount: new FormControl(1),
    preferredTeacher: new FormControl('either'),
    preferredChannel: new FormControl('email'),
    learnAbout: new FormControl('social'),
    interestedIn: new FormControl('1to1'),
    notes: new FormControl('')
  });


  handleSelection($event: any) {
    throw new Error('Method not implemented.');
  }

}
