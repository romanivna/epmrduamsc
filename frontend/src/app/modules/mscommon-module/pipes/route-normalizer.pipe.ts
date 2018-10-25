import { Pipe, PipeTransform } from '@angular/core';
/*
 * Replace spaces with hyphens
 * Usage:
 *	value | routeNormalizer
 * Example:
 *  {{ 'music departments' | routerNormalizer }}
 *  formats to 'music-departments'
*/
@Pipe({
  name: 'routeNormalizer'
})
export class RouteNormalizerPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\s+/g, '-');
  }
}
