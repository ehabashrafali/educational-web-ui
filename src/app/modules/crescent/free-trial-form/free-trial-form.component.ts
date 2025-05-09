import { Component } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
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


@Component({
  selector: 'app-free-trial-form',
  standalone: true,
  imports: [MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDividerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    CountrySelectComponent],
  templateUrl: './free-trial-form.component.html',
  styleUrl: './free-trial-form.component.scss'
})
export class FreeTrialFormComponent {
  preferredChannel: any;
  preferredTeacher: any;
  learnAbout: any;
  phoneControl = new FormControl('');

  handleSelection($event: any) {
    throw new Error('Method not implemented.');
  }

}
