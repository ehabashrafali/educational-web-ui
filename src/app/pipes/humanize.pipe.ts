import { Pipe } from '@angular/core';

@Pipe({
    name: 'humanize',
})
export class HumanizePipe {
    transform(
        value: string,
        separator: string = ' ',
        ignoreUpperCase: boolean = false
    ): string {
        if (
            typeof value !== 'string' ||
            (ignoreUpperCase &&
                typeof value === 'string' &&
                value === value.toUpperCase())
        ) {
            return value;
        }
        value = value.split(/(?=[A-Z])/).join(separator);
        value = value[0].toUpperCase() + value.slice(1);
        return value;
    }
}

// How to use it
// <h1>{{ 'yourText' | humanize}}</h1> result: Your Text
// <h1>{{ 'yourText' | humanize : "-"}}</h1> result: Your-Text
