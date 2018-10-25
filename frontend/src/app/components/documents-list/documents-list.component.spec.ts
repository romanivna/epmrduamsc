import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsListComponent } from './documents-list.component';
import { SpinnerComponent, NgForNumberPipe } from '../../modules/mscommon-module/components';
import { SpinnerService } from '../../shared/services';


describe('DocumentsListComponent', () => {
  let component: DocumentsListComponent;
  let fixture: ComponentFixture<DocumentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DocumentsListComponent,
        SpinnerComponent,
        NgForNumberPipe,
      ],
      providers: [
        SpinnerService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove documents', () => {
    const file1 = { file: 'mock1' };
    const file2 = { file: 'mock2' };
    component.files = [ file1, file2 ];
    component.removeFile(0);
    expect(component.files[0]).toBe(file2);
  });

  describe('getIconSuffix', () => {
    it('should get pdf-o suffix for icon class', () => {
      const type = 'pdf';
      expect(component.getIconSuffix(type)).toBe('pdf-o');
    });

    it('should get image-o suffix for icon class', () => {
      const type = 'image';
      expect(component.getIconSuffix(type)).toBe('image-o');
    });

    it('should get text-o suffix for icon class', () => {
      const type = 'txt';
      expect(component.getIconSuffix(type)).toBe('text-o');
    });
  });

});
