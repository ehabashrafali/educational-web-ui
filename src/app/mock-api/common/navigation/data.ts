/* eslint-disable */
import { FuseNavigationItem } from "@fuse/components/navigation";

export const defaultNavigation: FuseNavigationItem[] = [
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
    id: "blogs",
    title: "Blogs",
    type: "basic",
    icon: "feather:pen-tool",
    link: "/blogs",
  },
  {
    id: "pricing",
    title: "Subscription",
    type: "collapsable",
    icon: "heroicons_outline:credit-card",
    children: [
      {
        id: "BasicQuranRecitation",
        title: "Basic Quran Recitation",
        type: "basic",
        link: "/pricing/default",
      },
      {
        id: "Tajweed",
        title: "Tajweed",
        type: "basic",
        link: "/pricing/default",
      },
      {
        id: "Hafiz ",
        title: "Hafiz",
        type: "basic",
        link: "/pricing/default",
      },
      {
        id: "IslamicStudies",
        title: "Islamic Studies",
        type: "basic",
        link: "/pricing/default",
      },
      {
        id: "QuranicArabic",
        title: "Quranic Arabic",
        type: "basic",
        link: "/pricing/default",
      },
      {
        id: "ArabicAsASecondLanguage",
        title: "Arabic As A Second Language",
        type: "basic",
        link: "/pricing/custom",
      },
    ],
  },
  {
    id: "free-session",
    title: "Book Free Session",
    type: "basic",
    icon: "heroicons_mini:academic-cap",
    link: "/free-session",
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
        id: "BasicQuranRecitation",
        title: "Basic Quran Recitation",
        type: "basic",
        link: "/pricing/default",
      },
      {
        id: "Tajweed",
        title: "Tajweed",
        type: "basic",
        link: "/pricing/default",
      },
      {
        id: "Hafiz ",
        title: "Hafiz",
        type: "basic",
        link: "/pricing/default",
      },
      {
        id: "IslamicStudies",
        title: "Islamic Studies",
        type: "basic",
        link: "/pricing/default",
      },
      {
        id: "QuranicArabic",
        title: "Quranic Arabic",
        type: "basic",
        link: "/pricing/default",
      },
      {
        id: "ArabicAsASecondLanguage",
        title: "Arabic As A Second Language",
        type: "basic",
        link: "/pricing/custom",
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
    id: "blogs",
    title: "Blogs",
    type: "basic",
    icon: "feather:pen-tool",
    link: "/blogs",
  },
  {
    id: "pricing",
    title: "Subscription",
    type: "collapsable",
    icon: "heroicons_outline:credit-card",
    // link: "/pricing",
    children: [
      {
        id: "BasicQuranRecitation",
        title: "Basic Quran Recitation",
        type: "basic",
        link: "/home",
      },
      {
        id: "Tajweed",
        title: "Tajweed",
        type: "basic",
        link: "/home",
      },
      {
        id: "Hafiz ",
        title: "Hafiz",
        type: "basic",
        link: "/home",
      },
      {
        id: "IslamicStudies",
        title: "Islamic Studies",
        type: "basic",
        link: "/home",
      },
      {
        id: "QuranicArabic",
        title: "Quranic Arabic",
        type: "basic",
        link: "/home",
      },
      {
        id: "ArabicAsASecondLanguage",
        title: "Arabic As A Second Language",
        type: "basic",
        link: "/home",
      },
    ],
  },
];
