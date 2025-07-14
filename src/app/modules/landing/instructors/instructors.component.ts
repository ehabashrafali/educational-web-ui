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
                640: { slidesPerView: 1 },
                768: { slidesPerView: 1 },
                1024: { slidesPerView: 1 },
            },
            loop: false,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            speed: 1000,
            on: {
                keyPress: () => {
                    const swiper = this.instSwiper.nativeElement.swiper;
                    if (swiper.autoplay) {
                        swiper.autoplay.stop();
                    }

                    // Disable loop for the next navigation
                    swiper.loopDestroy(); // Remove loop clones
                    swiper.params.loop = false;
                    swiper.update();
                },
            },
        });
        this.instSwiper.nativeElement.initialize();

        swiper.initialize();
    }
}
