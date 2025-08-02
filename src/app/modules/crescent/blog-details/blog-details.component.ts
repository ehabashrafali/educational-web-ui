import { Component, OnDestroy, OnInit } from "@angular/core";
import { BlogService } from "app/shared/sevices/bolg.service";
import { map, Subject, takeUntil, tap } from "rxjs";

@Component({
    selector: "app-blog-details",
    standalone: true,
    imports: [],
    templateUrl: "./blog-details.component.html",
    styleUrl: "./blog-details.component.scss",
})
export class BlogDetailsComponent implements OnInit, OnDestroy {
    public blogId: number;
    destroyed$ = new Subject<void>();

    constructor(public blogService: BlogService) {}

    ngOnInit(): void {
        this.blogService.selectedBolgId$
            .pipe(
                takeUntil(this.destroyed$),
                map((id: number) => (this.blogId = id))
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
