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
    @ViewChild("insSwiper", { static: true })
    insSwiper!: ElementRef;

    ngOnInit(): void {
        register();
    }

    ngAfterViewInit(): void {
        const swiper = this.insSwiper.nativeElement;
        Object.assign(this.insSwiper.nativeElement, {
            slidesPerView: 1,
            spaceBetween: 16,
            loop: false,
            centeredSlides: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            speed: 1000,
            // pagination: true,
        });
        this.insSwiper.nativeElement.initialize();

        swiper.initialize();
    }
}
