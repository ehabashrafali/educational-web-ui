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
    selector: "app-review",
    standalone: true,
    templateUrl: "./review.component.html",
    styleUrl: "./review.component.scss",
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReviewComponent implements AfterViewInit, OnInit {
    @ViewChild("swiperEl", { static: true })
    swiperEl!: ElementRef;

    ngOnInit(): void {
        register();
    }

    ngAfterViewInit(): void {
        const swiper = this.swiperEl.nativeElement;

        Object.assign(swiper, {
            slidesPerView: 1,
            spaceBetween: 16,
            loop: false,
            centeredslides: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            speed: 500,
            pagination: { clickable: true },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
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
        });

        swiper.initialize();
    }
}
