import { Route } from "@angular/router";
import { initialDataResolver } from "app/app.resolvers";
import { AuthGuard } from "app/core/auth/guards/auth.guard";
import { NoAuthGuard } from "app/core/auth/guards/noAuth.guard";
import { LayoutComponent } from "app/layout/layout.component";

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
  // Redirect empty path to '/example'
  { path: "", pathMatch: "full", redirectTo: "home" },

  // Redirect signed-in user to the '/example'
  //
  // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  { path: "signed-in-redirect", pathMatch: "full", redirectTo: "home" },

  // Auth routes for guests
  {
    path: "",
    // canActivate: [NoAuthGuard],
    // canActivateChild: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: "empty",
    },
    children: [
      {
        path: "confirmation-required",
        loadChildren: () =>
          import(
            "app/modules/auth/confirmation-required/confirmation-required.routes"
          ),
      },
      {
        path: "forgot-password",
        loadChildren: () =>
          import("app/modules/auth/forgot-password/forgot-password.routes"),
      },
      {
        path: "reset-password",
        loadChildren: () =>
          import("app/modules/auth/reset-password/reset-password.routes"),
      },
      {
        path: "sign-in",
        loadChildren: () => import("app/modules/auth/sign-in/sign-in.routes"),
      },
      {
        path: "sign-up",
        loadChildren: () => import("app/modules/auth/sign-up/sign-up.routes"),
      },
      {
        path: "signed-in-redirect",
        loadChildren: () =>
          import(
            "app/modules/auth/signed-in-redirect/signed-in-redirect.routes"
          ),
      },
    ],
  },
  {
    path: "",
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: "empty",
    },
    children: [
      {
        path: "sign-out",
        loadChildren: () => import("app/modules/auth/sign-out/sign-out.routes"),
      },
      {
        path: "unlock-session",
        loadChildren: () =>
          import("app/modules/auth/unlock-session/unlock-session.routes"),
      },
    ],
  },
  {
    path: "",
    component: LayoutComponent,
    resolve: {
      initialData: initialDataResolver,
    },
    children: [
      {
        path: "home",
        loadChildren: () => import("app/modules/landing/home/home.routes"),
      },
    ],
  },
  {
    path: "",
    component: LayoutComponent,
    resolve: {
      initialData: initialDataResolver,
    },
    children: [
      {
        path: "about",
        loadChildren: () => import("app/modules/landing/about/about.routes"),
      },
    ],
  },
  {
    path: "",
    component: LayoutComponent,
    resolve: {
      initialData: initialDataResolver,
    },
    children: [
      {
        path: "faqs",
        loadChildren: () => import("app/modules/landing/faqs/faqs.routes"),
      },
    ],
  },
  {
    path: "",
    component: LayoutComponent,
    resolve: {
      initialData: initialDataResolver,
    },
    children: [
      {
        path: "support",
        loadChildren: () =>
          import("app/modules/landing/support/support.routes"),
      },
    ],
  },
  {
    path: "",
    component: LayoutComponent,
    resolve: {
      initialData: initialDataResolver,
    },
    children: [
      {
        path: "courses",
        loadChildren: () =>
          import("app/modules/crescent/courses/courses.routes"),
      },
    ],
  },
  {
    path: "",
    component: LayoutComponent,
    resolve: {
      initialData: initialDataResolver,
    },
    children: [
      {
        path: "blogs",
        loadChildren: () => import("app/modules/crescent/blogs/blogs.routes"),
      },
    ],
  },
  {
    path: "",
    component: LayoutComponent,
    resolve: {
      initialData: initialDataResolver,
    },
    children: [
      {
        path: "free-session",
        loadChildren: () =>
          import("app/modules/crescent/free-trial-form/free-trail.routes"),
      },
    ],
  },
  {
    path: "",
    component: LayoutComponent,
    resolve: {
      initialData: initialDataResolver,
    },
    children: [
      {
        path: "pricing",
        loadChildren: () =>
          import("app/modules/payment/pricing/pricing.routes"),
      },
    ],
  },
  {
    path: "",
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: initialDataResolver,
    },
    children: [
      {
        path: "profiles",
        loadChildren: () => import("app/modules/profiles/profiles.routes"),
      },
    ],
  },
  {
    path: "",
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: initialDataResolver,
    },
    children: [
      {
        path: "user-info",
        loadChildren: () =>
          import("app/modules/user-information/user-information.routes"),
      },
    ],
  },
  {
    path: "",
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: initialDataResolver,
    },
    children: [
      {
        path: "monthly-report",
        loadChildren: () =>
          import("app/modules/monthly-report/monthly-report.routes"),
      },
    ],
  },
];
