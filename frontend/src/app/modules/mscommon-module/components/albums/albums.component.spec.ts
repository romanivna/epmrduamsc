import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { AlbumsComponent } from './albums.component';
import { ServerGetterService, WindowRefService } from '../../../../shared/services';
import { ImageUrlCreatorPipe } from '../../pipes';
import { Album, Source } from '../../../../components/gallery/declarations';
import createSpyObj = jasmine.createSpyObj;

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

describe('AlbumsComponent', () => {
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;
  let ServerGetterServiceStub;

  beforeEach(async(() => {
    ServerGetterServiceStub = {
      get() {
        return Observable.create((observer) => {
          observer.next({
            data: [
              {
                id: 0,
                name: 'album1',
                sources: [
                  {
                    source: 'assets/img/violin.png',
                    title: 'source1'
                  }
                ]
              }
            ],
            headers: []
          });
          observer.next({
            data: [
              {
                id: 1,
                name: 'album2',
                sources: [
                  {
                    source: 'assets/img/violin.png',
                    title: 'source2'
                  }
                ]
              }
            ],
            headers: []
          });
          observer.error('error message testing');
        });
      }
    };
    TestBed.configureTestingModule({
      declarations: [
        AlbumsComponent,
        ImageUrlCreatorPipe
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers:    [
        { provide: ServerGetterService, useValue: ServerGetterServiceStub },
        WindowRefService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn((component as any).serverGetterService, 'get').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get albums from server', () => {
    (component as any).getAlbums();
    fixture.whenStable().then(() => {
      expect(component.albums.length).toBeGreaterThan(0);
    });
  });

  it('should raise activeAlbum event when clicked', () => {
    let activeAlbum: Album;
    component.activeAlbum.subscribe((album: Album) => {
      activeAlbum = album;
    });
    component.onClick({
      id: 1,
      name: 'name',
      sources: [
        {
          source: 'assets/img/violin.png',
          title: 'source2'
        }
      ]
    });
    expect(activeAlbum).toEqual({
      id: 1,
      name: 'name',
      sources: [
        {
          source: 'assets/img/violin.png',
          title: 'source2'
        }
      ]
    });
  });

  it('should get next portion of albums if it is possible', () => {
    const length = component.albums.length;
    component.onNextAlbumsItemsClick();
    expect(component.albums.length).toBeGreaterThan(length);
  });
});

