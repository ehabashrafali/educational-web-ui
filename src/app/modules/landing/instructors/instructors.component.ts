import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    AfterViewInit,
    ViewChild,
    ElementRef,
    OnInit,
} from "@angular/core";

import { register } from "swiper/element/bundle";

@Component({
    selector: "app-instructors",
    standalone: true,
    templateUrl: "./instructors.component.html",
    styleUrl: "./instructors.component.scss",
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InstructorsComponent implements AfterViewInit, OnInit {
    @ViewChild("instSwiper", { static: true })
    instSwiper!: ElementRef;

    ngOnInit(): void {
        register();
    }

    ngAfterViewInit(): void {
        const swiper = this.instSwiper.nativeElement;
        Object.assign(this.instSwiper.nativeElement, {
            slidesPerView: 1,
            spaceBetween: 16,
            centeredSlides: true,
            breakpoints: {
                768: {
                    // ≥ 768px (md)
                    slidesPerView: 1,
                    spaceBetween: 50,
                },
                1024: {
                    // ≥ 1024px (lg)
                    slidesPerView: 1,
                    spaceBetween: 50,
                },
                1280: {
                    // ≥ 1280px (xl)
                    slidesPerView: 1,
                    spaceBetween: 50,
                },
            },
            // loop: false,
            // autoplay: {
            //     delay: 4000,
            //     disableOnInteraction: false,
            // },
            // speed: 1000,
            // pagination: true,
        });
        this.instSwiper.nativeElement.initialize();

        swiper.initialize();
    }
}
