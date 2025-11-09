import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumValue'
})
export class FormatEnumPipe implements PipeTransform {

    transform(value: any, enumType: any): string {
        return value >= 0 && enumType ? enumType[value] : '-';
    }
}
