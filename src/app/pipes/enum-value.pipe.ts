import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumValue'
})
export class EnumValuePipe implements PipeTransform {

  transform(value: number, type: any): string {
    return type[value] ? type[value] : 'Undefined';
  }

}
