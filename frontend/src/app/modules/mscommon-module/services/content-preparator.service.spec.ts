import { TestBed, inject } from '@angular/core/testing';

import { ContentPreparatorService } from './content-preparator.service';

describe('ContentPreparatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentPreparatorService]
    });
  });

  it('should create', inject([ContentPreparatorService], (service: ContentPreparatorService) => {
    expect(service).toBeTruthy();
  }));

  it('should correctly change image src', inject([ContentPreparatorService], (service: ContentPreparatorService) => {
    let src = '[src]="5 | imageUrlCreator"';
    src = service.changeImgSources(src);
    expect(src.substring(src.length - 3)).toBe('/5"');
  }));
});
