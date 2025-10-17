import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class StringToLowercasePipe implements PipeTransform {
  transform(value: string) {
    if (typeof value === 'string') {
      return value.toLocaleLowerCase();
    }

    return value;
  }
}
