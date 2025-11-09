import { Pipe } from '@angular/core';

@Pipe({
  name: 'extractNestedValue'
})
export class ExtractNestedValuePipe {
  transform(row: object, prop: string) {
    const props = prop.split('.');
    let result: string = null;

    const getValue = (obj: object, props: string[]): any => {
      if (props.length === 0 || !obj) {
        return null;
      }

      const [currentProp, ...remainingProps] = props;
      const nextObj = obj[currentProp];

      if (remainingProps.length === 0) {
        return nextObj;
      }

      return getValue(nextObj, remainingProps);
    };

    result = getValue(row, props);

    return result;
  }
}

// How to use it
// <h1>{{ 'yourText' | humanize}}</h1> result: Your Text