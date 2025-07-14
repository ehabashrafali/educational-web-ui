import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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

    constructor(
        public blogService: BlogService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        // this.blogService.selectedBolgId$
        //     .pipe(
        //         takeUntil(this.destroyed$),
        //         tap((id) => console.log(id)),
        //         map((id: number) => (this.blogId = id))
        //     )
        //     .subscribe();

        this.route.paramMap
            .pipe(
                takeUntil(this.destroyed$),
                map((params) => params.get("id")),
                map((id) => +id),
                tap((id) => {
                    this.blogId = id;
                })
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
