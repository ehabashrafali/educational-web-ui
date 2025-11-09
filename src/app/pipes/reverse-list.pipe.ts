import { Pipe } from "@angular/core";

@Pipe({
    name: 'reverseList',
})
export class ReverseListPipe {
    transform(value: any[]) {
        return value.reverse();
    }
}