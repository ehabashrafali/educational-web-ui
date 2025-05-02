/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'sdsds',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'explore',
        title: 'Explore',
        type: 'collapsable',
        icon: 'heroicons_outline:information-circle',
        children: [
            {
                id: 'home',
                title: 'Home',
                type: 'basic',
                icon: 'heroicons_outline:home',
                link: '/home'
            },
            {
                id: 'about',
                title: 'About',
                type: 'basic',
                icon: 'heroicons_outline:information-circle',
                link: '/about'
            },
            {
                id: 'faqs',
                title: 'FAQs',
                type: 'basic',
                icon: 'heroicons_outline:question-mark-circle',
                link: '/faqs',
            },
        ],
    },
    {
        id: 'courses',
        title: 'Courses',
        type: 'basic',
        icon: 'heroicons_outline:book-open',
        link: '/courses'
    },
];
