import { Pipe, PipeTransform } from "@angular/core";
import { addDays } from "app/shared/common/Date";

@Pipe({
  name: "isDateClose",
})
export class IsDateClosePipe implements PipeTransform {
  transform(value: string, numberOfDays: number = 7): boolean {
    if (!value) return false;
    const date = new Date(value);
    return (
      date && date > new Date() && addDays(new Date(), numberOfDays) > date
    );
  }
}
