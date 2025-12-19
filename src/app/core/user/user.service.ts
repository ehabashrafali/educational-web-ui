import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "app/core/user/user.types";
import { UserProfile } from "app/modules/models/user.profile";
import { StudentController } from "app/shared/controllers/student.controller";
import { BehaviorSubject, map, Observable, ReplaySubject, tap } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserService {
  private _httpClient = inject(HttpClient);
  private _user = new BehaviorSubject<User | null>(null);
  private _userProfile = new BehaviorSubject<UserProfile | null>(null);
  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for user
   *
   * @param value
   */
  set user(value: User) {
    this._user.next(value);
  }

  get user$(): Observable<User | null> {
    return this._user.asObservable();
  }

  get userProfile$(): Observable<any> {
    return this._userProfile.asObservable();
  }

  set userProfile(value: any) {
    this._userProfile.next(value);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  getUserProfile(userId: string): Observable<UserProfile> {
    const url = StudentController.UserStudentInfo;
    return this._httpClient.get<UserProfile>(`${url}?userId=${userId}`).pipe(
      tap((profile) => {
        this.userProfile = profile;
      })
    );
  }
}
