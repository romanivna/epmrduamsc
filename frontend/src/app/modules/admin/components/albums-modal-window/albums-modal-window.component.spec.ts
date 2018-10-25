import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsModalWindowComponent } from './albums-modal-window.component';
import { GaleryNotificationsService } from '../../../../services/';

 const mockImg = {
      id: 1,
      link: 'mockLink',
      title: 'mockTitle',
  };

  const mockAlbum = [
    {
    id: 1,
    link: 'mockLink',
    title: 'mockTitle',
    },
    {
      id: 2,
      link: 'mockLink',
      title: 'mockTitle',
    },
    {
      id: 3,
      link: 'mockLink',
      title: 'mockTitle',
    }
];

describe('AlbumsModalWindowComponent', () => {
  let component: AlbumsModalWindowComponent;
  let fixture: ComponentFixture<AlbumsModalWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumsModalWindowComponent ],
      providers: [ GaleryNotificationsService ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should suggest to update album with chosen id', () => {
    const spy = spyOn(component.onAlbumChosen, 'emit');
    component.suggestToUpdate(1);
    expect(spy).toHaveBeenCalled();
  });
});
