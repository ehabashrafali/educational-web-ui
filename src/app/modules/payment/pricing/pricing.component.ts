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
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
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
  defaultPrice: Boolean = true;
  pricePerHour: number;
  PricePerMonth: number;
  defaultSessionCount = "3";
  customSessionPrice = 10;

  constructor(private router: Router) {}

  ngOnInit(): void {
    debugger;
    const currentPath = this.router.url;
    if (currentPath.includes("pricing/default")) {
      this.defaultPrice = true;
    } else if (currentPath.includes("pricing/custom")) {
      this.defaultPrice = false;
    }
    this.selectedNumberOfSessionsChanged(this.defaultSessionCount);
  }

  selectedNumberOfSessionsChanged(value: any) {
    if (this.defaultPrice) {
      switch (value) {
        case "1":
          this.pricePerHour = 12;
          this.PricePerMonth = 48;
          break;
        case "2":
          this.pricePerHour = 9;
          this.PricePerMonth = 36;
          break;
        case "3":
          this.pricePerHour = 8.5;
          this.PricePerMonth = 51;
          break;
        case "4":
          this.pricePerHour = 8;
          this.PricePerMonth = 64;
          break;
        case "5":
          this.pricePerHour = 7.5;
          this.PricePerMonth = 75;
          break;
        case "6":
          this.pricePerHour = 7;
          this.PricePerMonth = 84;
          break;
        default:
          break;
      }
    } else {
      this.pricePerHour = 10;
      this.PricePerMonth = this.pricePerHour * value;
    }
  }
}
