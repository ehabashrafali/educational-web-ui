import { Component, Injector, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { FuseSplashScreenService } from "@fuse/services/splash-screen";
import { AuthService } from "app/core/auth/auth.service";
import { filter } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-signed-in-redirect",
  standalone: true,
  imports: [],
  templateUrl: "./signed-in-redirect.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class SignedInRedirectComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private splashScreen: FuseSplashScreenService
  ) {}

  ngOnInit(): void {
    this.splashScreen.show();
    this.authService.accessToken$
      .pipe(
        filter((v) => !!v),
        tap(async (v) => {
          if (v.isAuthenticated) return;
          this.splashScreen.hide();
          await this.router.navigate([""]);
        })
      )
      .subscribe();
  }
}
