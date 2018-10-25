import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailComponent } from './thumbnail.component';
import { ImageUrlCreatorPipe } from '../../../../modules/mscommon-module/pipes';

describe('ImageSliderComponent', () => {
  let component: ThumbnailComponent;
  let fixture: ComponentFixture<ThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ThumbnailComponent,
        ImageUrlCreatorPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailComponent);
    component = fixture.componentInstance;

    component.activeAlbumImgSources = [
      { 'source': 'assets/img/albums/0/0.jpg', 'title': 'title 0' },
      { 'source': 'assets/img/albums/0/1.jpg', 'title': 'title 1' },
      { 'source': 'assets/img/albums/0/2.jpg', 'title': 'title 2' },
      { 'source': 'assets/img/albums/0/3.jpg', 'title': 'title 3' },
      { 'source': 'assets/img/albums/0/4.jpg', 'title': 'title 4' },
      { 'source': 'assets/img/albums/0/5.jpg', 'title': 'title 5' }
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when responds on change album', () => {
    it('should rewind thumbnails to first thumbnail', () => {
      (component as any).showThumbnailsFromIndex = 3;
      component.ngOnChanges();
      expect((component as any).showThumbnailsFromIndex).toBe(0);
    });
  });

  describe('when handles images changes', () => {
    it('should emit event on change', () => {
      const spy = spyOn(component.selectImg, 'emit');
      component.onSelectImg(component.activeAlbumImgSources[2]);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('when init', () => {
    it('should set value of thumbnails rendering count: showThumbnailsCount = 5', () => {
      expect((component as any).showThumbnailsCount).toBe(5);
    });

    it('should set value of first thumbnail to render: showThumbnailsFromIndex = 0', () => {
      expect((component as any).showThumbnailsFromIndex).toBe(0);
    });
  });

  describe('when checks if is there any thumbnails to show', () => {
    it('should return if there isn\'t more (next) thumbnails', () => {
      expect(component.isNoMoreNextThumbnails()).toBeTruthy();
    });

    it('should return if there no thumbnails left', () => {
      expect(component.isNoMorePrevThumbnails()).toBeFalsy();
    });
  });

  describe('when handles thumbnails', () => {
    it('should return list of current thumbnails', () => {
      expect(component.thumbnails).toEqual(component.activeAlbumImgSources.slice(0, 5));
    });


    it('should set thumbnail index that first in next set of thumbnails', () => {
      component.onNextThumbnails();
      expect((component as any).showThumbnailsFromIndex).toBe(5);
    });

    it('shouldn\'t return list of next thumbnails if there no one thumbnails left', () => {
      component.onNextThumbnails();
      component.onNextThumbnails();
      component.onNextThumbnails();

      expect((component as any).showThumbnailsFromIndex).toBe(5);
    });

    it('should set thumbnail index that first in prev set of thumbnails', () => {
      component.onNextThumbnails();
      component.onPrevThumbnails();
      expect((component as any).showThumbnailsFromIndex).toBe(0);
    });

    it('shouldn\'t set thumbnail index < 0', () => {
      component.onPrevThumbnails();

      expect((component as any).showThumbnailsFromIndex).toBe(5);
    });
  });
});
