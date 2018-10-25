import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentProcurementComponent } from './government-procurement.component';

describe('GovernmentProcurementComponent', () => {
  let component: GovernmentProcurementComponent;
  let fixture: ComponentFixture<GovernmentProcurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovernmentProcurementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentProcurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
