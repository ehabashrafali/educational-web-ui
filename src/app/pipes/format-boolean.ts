import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'formatBoolean'
})
export class FormatBooleanPipe implements PipeTransform {
    transform(value: boolean): string {
        return value ? 'Yes' : 'No';
    }
}