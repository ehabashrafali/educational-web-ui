import { Component } from '@angular/core';
import { FaqCategory } from './faq.models';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { faqCategories, faqs } from './data';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatExpansionModule],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss'
})
export class FaqsComponent {
  faqCategories: FaqCategory[];

  /**
   * On init
   */
  ngOnInit(): void {
    this.faqCategories = faqCategories.map((category) => ({
      ...category,
      faqs: faqs.filter((faq) => faq.categoryId === category.id),
    }));
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

}
