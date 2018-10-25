import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ngForNumber'
})
export class NgForNumberPipe implements PipeTransform {

  transform(value: any): number[] {
    return new Array(this.isValidArgument(value))
      .fill(0)
      .map((item, index) => index + 1);
  };

  private isValidArgument(value: number): number {
    const valueInt = Math.trunc(value);

    if (isNaN(valueInt) || valueInt < 1) {
      this.throwError(value);
    }

    return valueInt;
  }

  private throwError(value): never {
    throw new Error(`NgForNumberPipe: unexpected argument of NgFor: ${value}. Should be type number, when number > 0`);
  }

}
