import { Pipe, PipeTransform } from '@angular/core';

import { urls } from '../../../shared/constants/index';

/*
 * Creates static url to image by given id.
 *
 * @param { number } id - image id.
 * @return { string } url - url to image.
 */
@Pipe({
  name: 'imageUrlCreator'
})
export class ImageUrlCreatorPipe implements PipeTransform {
  baseUrl = urls.api.prod.images;

  transform(id: number): string {
    return `${ this.baseUrl }/${ id }`;
  }
}
