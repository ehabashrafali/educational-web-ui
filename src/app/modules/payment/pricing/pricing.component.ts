import { NgClass } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from "@angular/material/button-toggle";
import { MatIconModule } from "@angular/material/icon";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FuseCardComponent } from "@fuse/components/card";
import { map, Subject, takeUntil, tap } from "rxjs";

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
    FormsModule,
  ],
})
export class PricingComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<void>();
  defaultPrice: Boolean = true;
  pricePerHour: number;
  PricePerMonth: number;
  defaultSessionCount = "3";
  customSessionPrice = 10;
  courseId: string | null = null;
  defaultCourses: string[] = [
    "BasicQuranRecitation",
    "Tajweed",
    "Hafiz",
    "IslamicStudies",
    "QuranicArabic",
  ];

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroyed$),
        map((params) => params.get("id")),
        tap((id) => {
          console.log(id);
          this.courseId = id;
          this.defaultPrice = this.defaultCourses.includes(id || "");
          console.log(this.defaultPrice);
          this.selectedNumberOfSessionsChanged(this.defaultSessionCount);
          this.defaultSessionCount = "3";
          this.cdr.markForCheck();
        })
      )
      .subscribe();
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
      this.PricePerMonth = this.pricePerHour * value * 4;
    }
  }
}
