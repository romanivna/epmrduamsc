import { Pipe, PipeTransform } from '@angular/core';
import { LocalizatorService } from '../services'; // our translate service

@Pipe({
  name: 'localizator',
  pure: false // impure pipe, update value when we change language
})

export class LocalizatorPipe implements PipeTransform {

  constructor(private localizatorService: LocalizatorService) {}

  transform(value: string, args: any[]): any {
    return this.localizatorService.translate(value);
  }
}
