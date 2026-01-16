import { CdkScrollable } from "@angular/cdk/scrolling";
import { Component, OnInit } from "@angular/core";
import { PipesModule } from "../pipes.module";
import { UserService } from "app/core/user/user.service";
import { filter, tap } from "rxjs";
import { User } from "app/core/user/user.types";
import { SessionDto } from "../models/session.dto";
import { SessionService } from "app/shared/sevices/session.service";

@Component({
  selector: "app-invoice",
  standalone: true,
  imports: [CdkScrollable, PipesModule],
  templateUrl: "./invoice.component.html",
  styleUrl: "./invoice.component.scss",
})
export class InvoiceComponent implements OnInit {
  invoiceNumber: number;
  date: Date;
  user: User;
  rolesText = "";
  total: number;
  sessions: SessionDto[];

  constructor(
    private userService: UserService,
    private sessionService: SessionService
  ) {}
  ngOnInit(): void {
    this.invoiceNumber = this.generateInvoiceNo();
    this.date = new Date();
    this.userService.user$
      .pipe(
        filter((u) => !!u),
        tap((user) => {
          this.user = user;
        })
      )
      .subscribe();
    this.sessionService
      .GetOfCurrentMonthAndYear(this.user.id, this.date.toDateString())
      .pipe(
        tap((sessions) => {
          this.sessions = sessions;
          this.total = this.totalSum() / 2;
        })
      )
      .subscribe();
  }

  private totalSum() {
    debugger;
    return (
      this.sessions?.reduce(
        (sum, se) => sum + (Number(se.coursePricePerHoure) || 0),
        0
      ) ?? 0
    );
  }
  private generateInvoiceNo() {
    return Math.floor(new Date().valueOf() * Math.random());
  }
}
