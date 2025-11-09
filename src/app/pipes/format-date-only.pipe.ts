import { Pipe } from '@angular/core';
import moment from 'moment';

@Pipe({
    name: 'dateOnly',
})
export class FormatDateOnlyPipe {
    transform(
        value: Date | string,
        toLocalTime: boolean = true,
        format: string = 'ddd D MMM YYYY'
    ): string {
        if (!value || !moment(new Date(value), 'd MMM y').isValid()) {
            return '-';
        }
        const date = toLocalTime ? moment.utc(value).local() : moment(value);
        return date.format(format);
    }
}
