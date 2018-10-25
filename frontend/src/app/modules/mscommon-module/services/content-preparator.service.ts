import { Injectable } from '@angular/core';
import { urls } from '../../../shared/constants/index';

@Injectable()
export class ContentPreparatorService {

  constructor() { }

  public changeImgSources(content: string): string {
    return content.replace(/\[src\]="\d+? \| imageUrlCreator"/g, this.replacer);
  }

  public replaceClassNames(content: string, bemBlock: string): string {
    return content.replace(/editor__/g, `${ bemBlock }__`);
  }

  public removeImgTools(content: string): string {
    return content.replace(/<div contenteditable="false"(.|\s)+?<\/div>/g, '</div>');
  }

  private replacer(match: string): string {
    return `src="${ urls.api.prod.images }/${ match.substring(7, match.indexOf(' ')) }"`;
  }

}
