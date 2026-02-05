import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "app/core/auth/auth.service";
import { AuthUtils } from "app/core/auth/auth.utils";
import { Observable, catchError, throwError } from "rxjs";

/**
 * Intercept
 *
 * @param req
 * @param next
 */
export const authInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);

  // Ignore assets
  if (
    req.url.includes("assets/") ||
    req.url.endsWith(".svg") ||
    req.url.includes("icons/")
  ) {
    return next(req);
  }

  let newReq = req;

  if (
    authService.accessToken &&
    !AuthUtils.isTokenExpired(authService.accessToken)
  ) {
    newReq = req.clone({
      headers: req.headers.set(
        "Authorization",
        "Bearer " + authService.accessToken,
      ),
    });
  }

  return next(newReq).pipe(
    catchError((error: unknown) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !req.url.includes("auth/signin")
      ) {
        authService.signOut();
      }
      return throwError(() => error);
    }),
  );
};
