import { AfterViewInit, Component } from '@angular/core';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { CourseDetailsComponent } from "../course-details/course-details.component";
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NgClass, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { FuseCardComponent } from '@fuse/components/card';
import {

  MatButtonToggleModule,
} from '@angular/material/button-toggle';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MatIcon, MatButtonToggleModule,
    FormsModule,
    FuseCardComponent,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    NgClass,
    MatMenuModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    MatDividerModule,
    MatTooltipModule,
    TitleCasePipe,],
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
