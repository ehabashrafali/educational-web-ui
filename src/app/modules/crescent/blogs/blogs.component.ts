import { TextFieldModule } from "@angular/cdk/text-field";
import { Component, Injector } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterLink } from "@angular/router";
import { FuseCardComponent } from "@fuse/components/card";
import { BlogService } from "app/shared/sevices/bolg.service";

@Component({
    selector: "app-blogs",
    standalone: true,
    imports: [
        MatIcon,
        MatButtonToggleModule,
        FuseCardComponent,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
        MatDividerModule,
        MatTooltipModule,
        RouterLink,
    ],
    templateUrl: "./blogs.component.html",
    styleUrl: "./blogs.component.scss",
})
export class BlogsComponent {
    constructor(
        injector: Injector,
        public blogServices: BlogService
    ) {}
    SetBlogId(id: number) {
        this.blogServices.setblogId(id);
    }
}
