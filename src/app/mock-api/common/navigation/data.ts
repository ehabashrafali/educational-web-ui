/* eslint-disable */
import { FuseNavigationItem } from "@fuse/components/navigation";

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: "example",
        title: "Example",
        type: "basic",
        icon: "heroicons_outline:chart-pie",
        link: "/example",
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: "example",
        title: "sdsds",
        type: "basic",
        icon: "heroicons_outline:chart-pie",
        link: "/example",
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: "example",
        title: "Example",
        type: "basic",
        icon: "heroicons_outline:chart-pie",
        link: "/example",
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: "explore",
        title: "Explore",
        type: "collapsable",
        icon: "heroicons_outline:building-library",
        children: [
            {
                id: "home",
                title: "Home",
                type: "basic",
                icon: "heroicons_outline:home",
                link: "/home",
            },
            {
                id: "faqs",
                title: "FAQs",
                type: "basic",
                icon: "heroicons_outline:question-mark-circle",
                link: "/faqs",
            },
            {
                id: "support",
                title: "Contact Us",
                type: "basic",
                icon: "heroicons_outline:lifebuoy",
                link: "/support",
            },
        ],
    },
    {
        id: "courses",
        title: "Courses",
        type: "basic",
        icon: "heroicons_outline:book-open",
        link: "/courses",
    },
    {
        id: "pricing",
        title: "Subscription",
        type: "basic",
        icon: "heroicons_outline:credit-card",
        link: "/pricing",
    },
];
