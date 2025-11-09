import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberOfRemainingDays'
})
export class NumberOfRemainingDaysPipe implements PipeTransform {

    transform(value: string): number {
        if(!value) return 0;
        const date = new Date(value);
        if(!value) return 0;
        return this.diffOf2Dates(date, new Date());
    }

    diffOf2Dates(date1, date2) : number {
        return Math.ceil(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    }
}
