import { Pipe, PipeTransform } from "@angular/core";
import { addDays } from "app/shared/common/Date";

@Pipe({
  name: "isNew",
})
export class IsNewPipe implements PipeTransform {
  transform(value: string, numberOfDays: number = 1): boolean {
    if (!value) return false;
    const date = new Date(value);
    return (
      date && date < new Date() && addDays(date, numberOfDays) > new Date()
    );
  }
}
