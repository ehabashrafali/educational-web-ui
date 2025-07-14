import { Routes } from "@angular/router";
import { BlogDetailsComponent } from "app/modules/crescent/blog-details/blog-details.component";
import { BlogsComponent } from "app/modules/crescent/blogs/blogs.component";

export default [
    {
        path: "",
        component: BlogsComponent,
    },
    {
        path: "details/:id",
        component: BlogDetailsComponent,
    },
] as Routes;
