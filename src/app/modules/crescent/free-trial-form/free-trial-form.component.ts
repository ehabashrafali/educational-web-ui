import { Component, Injector } from "@angular/core";
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatOptionModule } from "@angular/material/core";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { RouterLink } from "@angular/router";
import { CountrySelectComponent } from "@wlucha/ng-country-select";
import { ToastService } from "app/shared/sevices/toasts.service";

@Component({
    selector: "app-free-trial-form",
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
        ReactiveFormsModule,
        RouterLink,
        CountrySelectComponent,
    ],
    templateUrl: "./free-trial-form.component.html",
    styleUrl: "./free-trial-form.component.scss",
})
export class FreeTrialFormComponent {
    preferredChannel: any;
    preferredTeacher: any;
    learnAbout: any;
    form = new FormGroup({
        firstName: new FormControl("", Validators.required),
        lastName: new FormControl("", Validators.required),
        email: new FormControl("", [Validators.required, Validators.email]),
        phone: new FormControl("", Validators.required),
        studentCount: new FormControl(1),
        preferredTeacher: new FormControl("either"),
        preferredChannel: new FormControl("email"),
        learnAbout: new FormControl("social"),
        interestedIn: new FormControl("1to1"),
        notes: new FormControl(""),
    });
    /**
     *
     */

    submitForm(): void {
        if (this.form.valid) {
            const values = this.form.value;
            fetch(
                "https://script.google.com/macros/s/AKfycbx3uRkU9-x0PRLHpqpOEpI0Sbe346GcDPCC18FGx7ObcVxRnR8VUztu9mEsasZt7cnx/exec",
                {
                    method: "POST",
                    mode: "no-cors",
                    body: JSON.stringify(values),
                }
            )
                .then(() => {
                    this.form.reset();
                    alert("Form submitted successfully!");
                })
                .catch((err) => {
                    console.error("Submission error:", err);
                    alert("Something went wrong");
                });
        } else {
            console.log("Form is invalid");
        }
    }
}
