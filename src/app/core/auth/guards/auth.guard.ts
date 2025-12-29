import { inject } from "@angular/core";
import { CanActivateChildFn, CanActivateFn, Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { of, switchMap } from "rxjs";

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
  const router: Router = inject(Router);

  // Check the authentication status
  return inject(AuthService)
    .check()
    .pipe(
      switchMap((result) => {
        if (!result.authenticated) {
          // No previous URL → go to home
          if (!state.url || state.url === "/" || state.url === "/sign-out") {
            return of(router.parseUrl("/"));
          }

          // Has previous URL → go to sign-in with redirect
          const urlTree = router.parseUrl(
            `/sign-in?redirectURL=${encodeURIComponent(state.url)}`
          );

          return of(urlTree);
        }

        // Allow the access
        return of(true);
      })
    );
};
