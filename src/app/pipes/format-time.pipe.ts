import { Pipe } from '@angular/core';
import moment from 'moment';

@Pipe({
    name: 'time',
})
export class FormatTimePipe {
    transform(
        value: Date | string,
        format: string = 'hh:mm a',
        toLocalTime: boolean = true
    ): string {
        if (!value || !moment(new Date(value), 'd MMM y').isValid()) {
            return '-';
        }

        const date = toLocalTime ? moment.utc(value).local() : moment(value);
        return date.format(format);
    }
}
