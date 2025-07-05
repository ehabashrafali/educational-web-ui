import { NgClass } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
    MatButtonToggle,
    MatButtonToggleGroup,
} from "@angular/material/button-toggle";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { FuseCardComponent } from "@fuse/components/card";

@Component({
    selector: "app-pricing",
    templateUrl: "./pricing.component.html",
    styleUrl: "./pricing.component.scss",
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatButtonModule,
        NgClass,
        FuseCardComponent,
        MatIconModule,
        MatButtonToggle,
        MatButtonToggleGroup,
        RouterLink,
    ],
})
export class PricingComponent implements OnInit {
    oneToOne: boolean = true;
    pricePerHour: number;
    pricePerMonthOneToOne: number;
    pricePerMonthGroup: number;

    oneToOneDefaultSessionCount = "3";
    groupDefaultSessionCount = "1";

    constructor() {}

    ngOnInit(): void {
        if (this.oneToOne) {
            this.selectedOneToOneSessionsChanged(
                this.oneToOneDefaultSessionCount
            );
        } else {
            this.selectedGroupSessionsChanged(this.groupDefaultSessionCount);
        }
    }

    selectedOneToOneSessionsChanged(value: any) {
        if (value) {
            switch (value) {
                case "1":
                    this.pricePerHour = 12;
                    this.pricePerMonthOneToOne = 48;
                    break;
                case "2":
                    this.pricePerHour = 9;
                    this.pricePerMonthOneToOne = 36;
                    break;
                case "3":
                    this.pricePerHour = 8.5;
                    this.pricePerMonthOneToOne = 51;
                    break;
                case "4":
                    this.pricePerHour = 8;
                    this.pricePerMonthOneToOne = 64;
                    break;
                case "5":
                    this.pricePerHour = 7.5;
                    this.pricePerMonthOneToOne = 75;
                    break;
                case "6":
                    this.pricePerHour = 7;
                    this.pricePerMonthOneToOne = 84;
                    break;
                default:
                    break;
            }
        }
    }
    selectedGroupSessionsChanged(value: any) {
        if (value) {
            switch (value) {
                case "1":
                    this.pricePerHour = 6;
                    this.pricePerMonthGroup = 24;
                    break;
                case "2":
                    this.pricePerHour = 6;
                    this.pricePerMonthGroup = 48;
                    break;
                case "3":
                    this.pricePerHour = 6;
                    this.pricePerMonthGroup = 72;
                    break;
                case "4":
                    this.pricePerHour = 6;
                    this.pricePerMonthGroup = 96;
                    break;
                case "5":
                    this.pricePerHour = 6;
                    this.pricePerMonthGroup = 120;
                    break;
            }
        }
    }
    onToggle(isOneToOne: boolean): void {
        this.oneToOne = isOneToOne;
        if (isOneToOne) {
            this.selectedOneToOneSessionsChanged(
                this.oneToOneDefaultSessionCount
            );
        } else {
            this.selectedGroupSessionsChanged(this.groupDefaultSessionCount);
        }
    }
}
