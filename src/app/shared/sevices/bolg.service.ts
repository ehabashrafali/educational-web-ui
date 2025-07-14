import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class BlogService {
    private _selectedBlogId$ = new BehaviorSubject<number | null>(null);

    get selectedBolgId$() {
        return this._selectedBlogId$.asObservable();
    }

    setblogId(id: number) {
        this._selectedBlogId$.next(id);
    }
}
