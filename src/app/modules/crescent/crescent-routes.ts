import { Routes } from '@angular/router';

export default [
    {
        path: 'home',
        loadChildren: () =>
            import(
                'app/modules/landing/home/home.routes'
            ),
    },
    {
        path: 'about',
        loadChildren: () =>
            import(
                'app/modules/landing/about/about.routes'
            ),
    },
] as Routes;