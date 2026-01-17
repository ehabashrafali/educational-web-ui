import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthUtils } from "app/core/auth/auth.utils";
import { UserService } from "app/core/user/user.service";
import { AuthController } from "app/shared/controllers/auth.controller";
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  throwError,
} from "rxjs";
import { Role } from "../user/user.types";

@Injectable({ providedIn: "root" })
export class AuthService {
  private _authenticated: boolean = false;
  private _httpClient = inject(HttpClient);
  private _userService = inject(UserService);

  public role: Role;
  private _accessToken$ = new BehaviorSubject<{
    token: string;
    isAuthenticated: boolean;
  } | null>(null);

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem("accessToken", token);
  }

  get accessToken$() {
    return this._accessToken$.asObservable();
  }

  get accessToken(): string {
    return localStorage.getItem("accessToken") ?? "";
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email: string): Observable<any> {
    return this._httpClient.post("api/auth/forgot-password", email);
  }

  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(password: string): Observable<any> {
    return this._httpClient.post("api/auth/reset-password", password);
  }

  /**
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials: { email: string; password: string }): Observable<any> {
    if (this._authenticated) {
      return throwError(() => new Error("User is already logged in."));
    }
    const authUrl = AuthController.login;

    return this._httpClient.post(authUrl, credentials).pipe(
      map((response: any) => {
        if (!response?.token) {
          throw new Error("Token was not returned from server.");
        }
        this._accessToken$.next({
          token: response.token,
          isAuthenticated: true,
        });
        this.accessToken = response.token;

        const payload = AuthUtils._decodeToken(response.token);
        const CLAIMS = {
          ID: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
          NAME: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
          EMAIL:
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
          ROLE: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
        };

        const user = {
          id: payload[CLAIMS.ID],
          name: payload[CLAIMS.NAME],
          email: payload[CLAIMS.EMAIL],
          role: payload[CLAIMS.ROLE],
        };
        this._authenticated = true;
        this._userService.user = user;

        return response;
      })
    );
  }

  /**
   * Sign in using the access token
   */
  signInUsingToken(): Observable<boolean> {
    const url = AuthController.SignInWithToken;

    return this._httpClient
      .post<any>(url, { accessToken: this.accessToken })
      .pipe(
        map((response) => {
          if (!response?.token) {
            throw new Error("Token refresh failed");
          }
          this.accessToken = response.token.result;
          this._accessToken$.next({
            token: response.token.result,
            isAuthenticated: true,
          });

          const payload = AuthUtils._decodeToken(response.token.result);

          const CLAIMS = {
            ID: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
            NAME: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
            EMAIL:
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
            ROLE: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
          };

          const user = {
            id: payload[CLAIMS.ID],
            name: payload[CLAIMS.NAME],
            email: payload[CLAIMS.EMAIL],
            role: payload[CLAIMS.ROLE],
          };
          this._authenticated = true;
          this._userService.user = user;
          this.role = user.role;
          return true;
        }),
        catchError(() => {
          this.signOut();
          return of(false);
        })
      );
  }

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem("accessToken");

    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    return of(true);
  }

  /**
   * Sign up
   *
   * @param user
   */
  signUp(user: {
    name: string;
    email: string;
    password: string;
    company: string;
  }): Observable<any> {
    return this._httpClient.post("api/auth/sign-up", user);
  }

  /**
   * Unlock session
   *
   * @param credentials
   */
  unlockSession(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this._httpClient.post("api/auth/unlock-session", credentials);
  }

  check(): Observable<{ authenticated: boolean; roles?: Role[] }> {
    if (!this.accessToken) {
      return of({ authenticated: false });
    }

    return this.signInUsingToken().pipe(
      map((success) => {
        if (!success) {
          return { authenticated: false };
        }

        return { authenticated: true, role: this.role };
      }),
      catchError(() => of({ authenticated: false }))
    );
  }
}
