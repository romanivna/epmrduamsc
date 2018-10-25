import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, BaseRequestOptions, ConnectionBackend, RequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AlumniComponent } from './alumni.component';
import { ServerGetterService, LocalizatorService } from './../../shared/services';
import { SpinnerService } from '../../shared/services/spinner/spinner.service';
import { DetectBrowserService } from '../../shared/services';
import { AlumniItem } from './declarations';
import { Observable } from 'rxjs/Observable';

const _ = {
  id: '1',
  img: {
    id: 1,
    title: 'mockTitle',
    link: 'mockLink'
  },
  name: 'mock',
  about: 'string',
  lang: null,
};

describe('AlumniItemComponent', () => {
  let component: AlumniComponent;
  let fixture: ComponentFixture<AlumniComponent>;
  let serverGetterService: ServerGetterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumniComponent ],
      providers: [
        ServerGetterService,
        {provide: ConnectionBackend, useClass: MockBackend},
        {provide: RequestOptions, useClass: BaseRequestOptions},
        {provide: LocalizatorService, useClass: MockLocalizatorService},
        Http,
        SpinnerService,
        DetectBrowserService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(AlumniComponent);
    component = fixture.componentInstance;
    serverGetterService = TestBed.get(ServerGetterService);
  }));

  it('should create', () => {
    expect(fixture).toBeDefined();
    expect(component).toBeDefined();
  });

  it('should get alumni from server', () => {
    (component as any).onLoadAlumni({ data: [_] });
    expect(component.alumni.length).toBe(1);
  });

  it('should retrieve alumni', () => {
    const spy = spyOn(component, 'getAlumni');
    component.onNextAlumniItemsClick();
    expect(spy).toHaveBeenCalled();
  });

  it('should retrieve alumni data', () => {
    const spy = spyOn(component, 'getAlumni');
    component.onNextAlumniItemsClick();
    expect(spy).toHaveBeenCalled();
  });

  it('should called get service in getAlumni', () => {
    const spy = spyOn(serverGetterService, 'get').and.callThrough();
    component.onNextAlumniItemsClick();
    expect(spy).toHaveBeenCalled();
  });

  it('should handle if error while loading alumni', () => {
    const spy = spyOn(console, 'log');
    (component as any).onLoadAlumniError();
    expect(spy).toHaveBeenCalled();
  });

});

class MockLocalizatorService extends LocalizatorService {
  constructor() {
    super(null);
  }
}
