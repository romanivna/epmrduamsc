import { Pipe, PipeTransform } from '@angular/core';
/*
 * Transform object to array of object with key and value only
 * It is used for usage of ngFor for generating not only from iterable type
 * but also form object
 * Usage:
 *	value | keys
 * @example:
 *  //returns {{ key }} : {{ object[key] }}
 *  *ngFor = "let key of object | keys"
 */
@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
  transform(value: any): Object[] {
    return Object.keys(value).map((key) => ({ key: key, value: value[key] }));
  }
}
