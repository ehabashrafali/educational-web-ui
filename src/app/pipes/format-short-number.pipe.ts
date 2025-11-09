import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatShortNumber',
    standalone: true,
})
export class FormatShortNumberPipe implements PipeTransform {
    transform(value: number): string {
        let exp,
            rounded,
            suffixes = ['k', 'M', 'B', 'T', 'P', 'E'];

        if (Number.isNaN(value)) {
            return null;
        }

        if (value < 1000) {
            return value + '';
        }

        exp = Math.floor(Math.log(value) / Math.log(1000));

        return (value / Math.pow(1000, exp)).toFixed(2) + suffixes[exp - 1];
    }
}
