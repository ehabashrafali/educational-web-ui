import { Pipe } from '@angular/core';
import numeral from 'numeral';

@Pipe({
    name: 'decimal',
})
export class FormatDecimalPipe {
    transform(value: number, numberOfDigitsAfterDot: number | null) {
        let zeros: string = '';
        if (!numberOfDigitsAfterDot) return value;
        for (let i = 0; i < numberOfDigitsAfterDot; i++) {
            zeros += '0';
        }
        
        return numeral(value).format(`0,0.${zeros}`);
    }
}

// How to use it
// <h1>{{ '15/1/2020' | formatDate}}</h1> result: 1 Jan 2020
