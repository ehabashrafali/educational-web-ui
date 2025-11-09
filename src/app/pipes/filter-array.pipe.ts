import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArray'
})
export class FilterArrayPipe implements PipeTransform {

  transform(value: any[], filterBy: string, whereNotIn: any[] | undefined = undefined, whereIn: any[] | undefined = undefined): any[] {
      return value?.filter(v => (!whereIn || whereIn.includes(filterBy ? v[filterBy] : v))
          && (!whereNotIn || !whereNotIn?.includes(filterBy ? v[filterBy] : v)))
  }

}
