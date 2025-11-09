import { Pipe } from '@angular/core';
import moment from 'moment';

@Pipe({
    name: 'datetime',
})
export class FormatDatetimePipe {
    public static DefaultFormat = 'ddd D MMM YYYY, hh:mm a';

    transform(
        value: Date | string,
        toLocalTime: boolean = true,
        format: string = FormatDatetimePipe.DefaultFormat
    ): string {
        if (!value || !moment(new Date(value), 'd MMM y').isValid()) {
            return '-';
        }
        const date = toLocalTime ? moment.utc(value).local() : moment(value);
        return date.format(format);
    }
}

// How to use it
// <h1>{{ '15/1/2020' | formatDate}}</h1> result: 1 Jan 2020
