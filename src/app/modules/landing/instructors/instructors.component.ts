import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { register } from "swiper/element/bundle";

@Component({
    selector: "app-instructors",
    standalone: true,
    templateUrl: "./instructors.component.html",
    styleUrl: "./instructors.component.scss",
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InstructorsComponent implements AfterViewInit, OnInit, OnDestroy {
    @ViewChild("instSwiper", { static: true })
    slider!: ElementRef;

    activeIndex = 0;
    readonly instructors = [
        { name: 'Osama El-Bosili', image: 'OsamaInst.jpeg' },
        { name: 'Ibrahim Ayman', image: 'IbrahimInst.jpeg' },
        { name: 'Hagar Ayman', image: 'HagarInst.jpeg' },
        { name: 'Aya fouad', image: 'AyaInst.jpeg' },
    ];

    constructor(private readonly zone: NgZone) {}

    selectInstructor(index: number): void {
        this.slider.nativeElement.swiper?.slideTo(index);
    }

    ngOnDestroy(): void {
        this.slider.nativeElement.swiper?.destroy(true, true);
    }

    ngOnInit(): void {
        register();
    }

    ngAfterViewInit(): void {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const element = this.slider.nativeElement;
        Object.assign(element, {
            slidesPerView: 1,
            spaceBetween: 24,
            effect: "fade",
            fadeEffect: { crossFade: true },
            autoHeight: true,
            speed: reducedMotion ? 0 : 450,
            loop: false,
            grabCursor: true,
            on: {
                slideChange: (swiper: { activeIndex: number }) => {
                    this.zone.run(() => this.activeIndex = swiper.activeIndex);
                },
            },
            // Let visitors read at their own pace.
            autoplay: false,
            navigation: true,
            pagination: { clickable: true },
            keyboard: { enabled: true, onlyInViewport: true },
            a11y: {
                enabled: true,
                containerMessage: "instructors",
                prevSlideMessage: "Previous instructors",
                nextSlideMessage: "Next instructors",
            },

        });
        element.initialize();
    }
}
