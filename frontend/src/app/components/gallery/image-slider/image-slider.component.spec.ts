import {CUSTOM_ELEMENTS_SCHEMA, EventEmitter} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSliderComponent } from './image-slider.component';
import { ImageUrlCreatorPipe } from '../../../modules/mscommon-module/pipes';

describe('ImageSliderComponent', () => {
  let component: ImageSliderComponent;
  let fixture: ComponentFixture<ImageSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ImageSliderComponent,
        ImageUrlCreatorPipe
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSliderComponent);
    component = fixture.componentInstance;

    component.activeAlbumImgSources = new EventEmitter();

    component.sources = [
      { source: 'assets/img/albums/0/0.jpg', title: 'title 0' },
      { source: 'assets/img/albums/0/1.jpg', title: 'title 1' },
      { source: 'assets/img/albums/0/2.jpg', title: 'title 2' },
      { source: 'assets/img/albums/0/3.jpg', title: 'title 3' },
      { source: 'assets/img/albums/0/4.jpg', title: 'title 4' },
      { source: 'assets/img/albums/0/5.jpg', title: 'title 5' }
    ];

  });

  it('should init', () => {
    const spy = spyOn(component.activeAlbumImgSources, 'subscribe');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should set new selected image', () => {
    component.onSelectImg(component.sources[3]);
    expect(component.selectedImg).toEqual(component.sources[3]);
  });

  it('should init flag showAlbumName to false', () => {
    expect(component.showAlbumName).toBeFalsy();
  });

  describe('when album loaded', () => {
    it('should save image sources', () => {
      (component as any).onAlbumLoad({name: 'album', sources: ['1.jpg', '2.png']});
      expect(component.sources).toEqual(['1.jpg', '2.png']);
    });

    it('should init selected image as 3rd image in list', () => {
      (component as any).onAlbumLoad({name: 'album', sources: ['1.jpg', '2.png', 'x.png']});
      expect(component.selectedImg).toBe('x.png');
    });

    it('should save album name', () => {
      (component as any).onAlbumLoad({name: 'album', sources: ['1.jpg', '2.png']});
      expect(component.albumName).toEqual('album');
    });
  });
});
