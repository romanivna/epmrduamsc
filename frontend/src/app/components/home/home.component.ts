import { Component, OnInit } from '@angular/core';

import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';

import { urls } from '../../shared/constants';

import { configurations } from './../../shared/constants';

@Component({
  selector: 'app-home',
  templateUrl: 'home.template.html',
  styleUrls: ['home.styles.scss']
})
export class HomeComponent implements OnInit {
  public imageSources: string[] = urls.statics.carousel;
  public loadPerRequest = configurations.eventsPreview.loadEventsItemsPerRequest;

  public config: ICarouselConfig = {
    verifyBeforeLoad: true,
    log: false,
    animation: true,
    animationType: AnimationConfig.SLIDE,
    autoplay: true,
    autoplayDelay: 3000,
    stopAutoplayMinWidth: 768
  };

  constructor() { }

  ngOnInit() {}

}
