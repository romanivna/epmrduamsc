import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumCreatingComponent } from './album-creating.component';

describe('AlbumCreatingComponent', () => {
  let component: AlbumCreatingComponent;
  let fixture: ComponentFixture<AlbumCreatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumCreatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumCreatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
