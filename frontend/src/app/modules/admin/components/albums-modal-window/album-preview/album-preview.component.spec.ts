import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPreviewComponent } from './album-preview.component';
import { ImageUrlCreatorPipe } from '../../../../mscommon-module/pipes';
import { Album, Source } from '../../../../../components/gallery/declarations';

import { Observable } from 'rxjs/Observable';

describe('AlbumPreviewComponent', () => {
  let component: AlbumPreviewComponent;
  let fixture: ComponentFixture<AlbumPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlbumPreviewComponent,
        ImageUrlCreatorPipe
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumPreviewComponent);
    component = fixture.componentInstance;
    component.activeAlbumImgSources = Observable.create((observer) => {
      observer.next({
        sources: [
          {
            source: 'mock'
          }
        ]
      });
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
