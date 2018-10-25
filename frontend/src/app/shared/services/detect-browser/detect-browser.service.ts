import { Injectable } from '@angular/core';

export const EDGE = 'Edge';

@Injectable()
export class DetectBrowserService {
  public name(): any {
    const nameOffset = navigator.userAgent.lastIndexOf(' ') + 1,
          verOffset = navigator.userAgent.lastIndexOf('/');
    return navigator.userAgent.substring(nameOffset, verOffset);
  }

  public isEDGE(): Boolean {
    return this.name() === EDGE;
  }

  public isIE11(): Boolean {
    return /Trident\/7\./.test(navigator.userAgent);
  }
}
