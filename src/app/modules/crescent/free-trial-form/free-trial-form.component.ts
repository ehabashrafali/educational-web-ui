import { CommonModule } from "@angular/common";
import { Component, inject, Injector } from "@angular/core";
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
import { FuseLoadingBarComponent } from "@fuse/components/loading-bar";
import { FuseLoadingService } from "@fuse/services/loading";
import { CountrySelectComponent } from "@wlucha/ng-country-select";
import { courses } from "app/mock-api/apps/academy/data";
import { ToastService } from "app/shared/sevices/toasts.service";

@Component({
    selector: "app-free-trial-form",
    standalone: true,
    imports: [
        CommonModule,
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
        FuseLoadingBarComponent
    ],
    templateUrl: "./free-trial-form.component.html",
    styleUrl: "./free-trial-form.component.scss",
})
export class FreeTrialFormComponent {
    
    preferredChannel: any;
    preferredTeacher: any;
    learnAbout: any;
   
    private _fuseLoadingService = inject(FuseLoadingService);
    private _courses = Object.values(Courses);
   
    public get courses(): Array<string> {
        return this._courses;
    }

    form = new FormGroup({
        firstName: new FormControl("", Validators.required),
        lastName: new FormControl("", Validators.required),
        email: new FormControl("", [Validators.required, Validators.email]),
        phone: new FormControl("", Validators.required),
        studentCount: new FormControl(1),
        courses: new FormControl([]),
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
        this._fuseLoadingService.show(); 
            const payload = {
                ...values,
                courses: Array.isArray(values.courses) ? values.courses.join(', ') : values.courses
            };
            fetch(
                "https://script.google.com/macros/s/AKfycbx3uRkU9-x0PRLHpqpOEpI0Sbe346GcDPCC18FGx7ObcVxRnR8VUztu9mEsasZt7cnx/exec",
                {
                    method: "POST",
                    mode: "no-cors",
                    body: JSON.stringify(payload),
                }
            )
                .then(() => {
                    this.form.reset();
                    alert("Form submitted successfully!");
                })
                .catch((err) => {
                    console.error("Submission error:", err);
                    alert("Something went wrong");
                })
                .finally(() => {
                    this._fuseLoadingService.hide();
                });
        } else {
            console.log("Form is invalid");
        }
    }
}

export enum Courses {
    BasicQuranRecitation = 'Basic Quran Recitation',
    ArabicLanguage = 'Arabic Language Course',
    Tajweed = 'Tajweed Course',
    IslamicStudies = 'Islamic Studies Course',
    QuranicArabic = 'Quranic Arabic Course',
    Hafiz = 'Hafiz Course'
}