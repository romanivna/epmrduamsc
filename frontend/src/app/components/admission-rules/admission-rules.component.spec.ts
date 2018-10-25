import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerGetterService } from '../../shared/services/';
import { AdmissionRulesComponent } from './admission-rules.component';
import { MSCommonModule } from '../../modules';
import { MockBackend } from '@angular/http/testing';
import { SpinnerService, LocalizatorService, DetectBrowserService } from '../../shared/services/';

import { Http, ConnectionBackend, RequestOptions, BaseRequestOptions, HttpModule } from '@angular/http';

class MockLocalizationService {
  translate() {
    return 'ru';
  }
}

describe('AdmissionRulesComponent', () => {
  let component: AdmissionRulesComponent;
  let fixture: ComponentFixture<AdmissionRulesComponent>;
  let serverGetterService: ServerGetterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionRulesComponent, ],
      imports: [ MSCommonModule, ],
      providers: [
        {
          provide: LocalizatorService, useClass: MockLocalizationService
        },
        ServerGetterService,
        SpinnerService,
        DetectBrowserService,
        Http,
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    serverGetterService = TestBed.get(ServerGetterService);
  });

  it('should create admission rules component', () => {
    expect(component).toBeTruthy();
  });
});
