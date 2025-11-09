import { Pipe } from '@angular/core';
import moment from 'moment';

@Pipe({
    name: 'date',
})
export class FormatDatePipe {
    transform(
        value: string,
        toLocalTime: boolean = true,
        format: string = 'ddd D MMM YYYY'
    ): string {
        if (
            !value ||
            !moment(new Date(value), 'd MMM y').isValid() ||
            new Date(0) >= new Date(value)
        ) {
            return '-';
        }
        const date = toLocalTime ? moment.utc(value).local() : moment(value);
        return date.format(format);
    }
}

// How to use it
// <h1>{{ '15/1/2020' | formatDate}}</h1> result: 1 Jan 2020
