import { Pipe, PipeTransform } from '@angular/core';
import { LocalizatorService } from '../../services';

@Pipe({
  name: 'localizatorFromObject',
  pure: false // impure pipe, update value when we change language
})

export class LocalizatorFromObjectPipe implements PipeTransform {

  constructor(private localizatorService: LocalizatorService) {}

  transform(value: any): any {
    const currentLang = this.localizatorService.currentLang();
    if (value) {
      return value[currentLang];
    }
  }
}
