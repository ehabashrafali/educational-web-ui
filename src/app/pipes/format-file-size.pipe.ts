import { Pipe, PipeTransform } from '@angular/core';
import {DecimalPipe} from "@angular/common";

@Pipe({
  name: 'fileSize'
})
export class FormatFileSizePipe implements PipeTransform {

  transform(value: number): string {
    return this.formatDecimal(value / 1024 / 1024) + 'MB';
  }

  formatDecimal(num: number) {
      return (Math.round(num * 100) / 100).toFixed(2)
  }

}
