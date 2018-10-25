import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import {GaleryNotificationsService} from '../../services/';
import {of} from 'rxjs/observable/of';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let galleryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ],
      providers: [ GaleryNotificationsService ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach((inject([GaleryNotificationsService], service => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    galleryService = service;
  })));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open footer if album modal window is closed', () => {
    const response = true;
    spyOn(galleryService, 'notificationsStream').and.returnValue(of(response));
    galleryService.galleryClose();
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.isFooterOpen).toEqual(response);
  });
});
