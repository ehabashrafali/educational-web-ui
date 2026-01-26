import { NgClass } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { Router } from "@angular/router";
import { UserService } from "app/core/user/user.service";
import { User } from "app/core/user/user.types";
import { PipesModule } from "app/modules/pipes.module";
import { filter, Subject, takeUntil } from "rxjs";

@Component({
  selector: "user",
  templateUrl: "./user.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: "user",
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    NgClass,
    MatDividerModule,
    PipesModule,
  ],
})
export class UserComponent implements OnInit, OnDestroy {
  user: User;

  @Input() visible: boolean = true;
  name: string = "Hello";
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _userService: UserService,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to user changes
    this._userService.user$
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter((u) => !!u),
      )
      .subscribe((user: User) => {
        this.user = user;
        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
    if (this.user) {
      this.name = this.user.name;
    }
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Update the user status
   *
   * @param status
   */
  //   updateUserStatus(status: string): void {
  //     // Return if user is not available
  //     if (!this.user) {
  //       return;
  //     }

  //     // Update the user
  //     this._userService
  //       .update({
  //         ...this.user,
  //         status,
  //       })
  //       .subscribe();
  //   }

  /**
   * Sign out
   */
  signOut(): void {
    this._router.navigate(["/sign-out"]);
  }

  signIn(): void {
    this._router.navigate(["/sign-in"]);
  }

  getMyStudents(): void {
    this._router.navigate(["/my-students/" + this.user.id]);
  }

  getUserInfo(): void {
    this._router.navigate(["/user-info"]);
  }
  getmMnthlyReport(): void {
    this._router.navigate(["/monthly-report"]);
  }
  getUserAttendance() {
    this._router.navigate(["/attendance"]);
  }
  addSessionInfo(): void {
    this._router.navigate(["/add-session"]);
  }
}
