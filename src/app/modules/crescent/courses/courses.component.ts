import { AfterViewInit, Component } from '@angular/core';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    new Swiper('.default-carousel', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

}
