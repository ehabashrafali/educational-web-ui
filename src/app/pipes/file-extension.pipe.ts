import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileExtension'
})
export class FileExtensionPipe implements PipeTransform {

  transform(fileName: string): string {
    return fileName && fileName.includes('.')
        ? fileName?.split('.').pop() : '';
  }

}
