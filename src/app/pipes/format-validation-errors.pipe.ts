import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
    name: 'formatValidationErrors',
})
export class FormatValidationErrorsPipe implements PipeTransform {
    transform(validationErrors: ValidationErrors | null): string {
        if (!validationErrors) return '';
        if (typeof validationErrors === 'string') return validationErrors;
        if (this.isArray(validationErrors))
            return (validationErrors as [])
                .map(this.getMessage)
                .flat()
                .join(', ');
        if (this.isObject(validationErrors))
            return Object.values(validationErrors).join(', ');
        return '';
    }

    private isArray(value: any): boolean {
        return Array.isArray(value) || value instanceof Array;
    }

    private getMessage(v: any): string[] {
        return Object.values(v);
    }

    private isObject(validationErrors: ValidationErrors) {
        return typeof validationErrors === 'object';
    }
}
