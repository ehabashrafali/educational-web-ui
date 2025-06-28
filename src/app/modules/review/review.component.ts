import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    AfterViewInit,
    ViewChild,
    ElementRef,
} from "@angular/core";
import { register } from "swiper/element/bundle";

@Component({
    selector: "app-review",
    standalone: true,
    templateUrl: "./review.component.html",
    styleUrl: "./review.component.scss",
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReviewComponent implements AfterViewInit {
    @ViewChild("swiperEl", { static: true })
    swiperEl!: ElementRef;

    ngAfterViewInit(): void {
        const swiper = this.swiperEl.nativeElement;
        Object.assign(swiper, {
            slidesPerView: 1,
            spaceBetween: 0,
            // navigation: true,
            pagination: { clickable: true },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
                pageUpDown: true,
            },
        });
        swiper.initialize();
    }
}

register();
