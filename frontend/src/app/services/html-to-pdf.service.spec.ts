import { TestBed, inject } from '@angular/core/testing';

import { HtmlToPdfService } from './html-to-pdf.service';

describe('HtmlToPdfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HtmlToPdfService]
    });
  });

  it('should ...', inject([HtmlToPdfService], (service: HtmlToPdfService) => {
    expect(service).toBeTruthy();
  }));
});
