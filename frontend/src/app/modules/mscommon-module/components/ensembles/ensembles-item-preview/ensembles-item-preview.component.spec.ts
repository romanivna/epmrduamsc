import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsemblesItemPreviewComponent } from './ensembles-item-preview.component';
import { RouterLinkStubDirective } from '../../../../../shared/tests/router-stub';
import { LocalizatorPipe } from '../../../../../shared/pipes';
import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MockRouter, MockActivatedRoute } from '../../../../../shared/tests/mock-routes';
import { MockBackend } from '@angular/http/testing';
import { Pipe, PipeTransform } from '@angular/core';

const ensembleItemMock = {
  id: 1,
  name: 'Ensemble_Mock',
  description: 'mock description',
  img: {
    id: '0',
    link: 'mockLink',
    title: 'mock',
  },
};

describe('EnsemblesItemPreviewComponent', () => {
  let component: EnsemblesItemPreviewComponent;
  let fixture: ComponentFixture<EnsemblesItemPreviewComponent>;
  let mockActivatedRoute: any;

  beforeEach(async(() => {
    mockActivatedRoute = new MockActivatedRoute({ id: '1' });
    TestBed.configureTestingModule({
      declarations: [
        EnsemblesItemPreviewComponent,
        MockLocalizatorPipe,
        RouterLinkStubDirective,
      ],
      providers: [
        Http,
        { provide: Router, useValue: MockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnsemblesItemPreviewComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create item', () => {
    component.ensembleItem = ensembleItemMock;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ensemble-preview-text__header').innerText)
    .toBe(ensembleItemMock.name);
  });
});

@Pipe({ name: 'localizator' })
class MockLocalizatorPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}
