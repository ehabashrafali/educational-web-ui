import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    ViewEncapsulation,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { AboutComponent } from "../about/about.component";
import Swiper from "swiper";
import { ReviewComponent } from "../../review/review.component";

@Component({
    selector: "landing-home",
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatButtonModule,
        RouterLink,
        MatIconModule,
        AboutComponent,
        ReviewComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingHomeComponent {
    /**
     * Constructor
     */
    constructor() {}
}
