import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DndFileUploadComponent } from './dnd-file-upload.component';
import { Pipe, PipeTransform, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DndFileUploadComponent', () => {
  let component: DndFileUploadComponent;
  let fixture: ComponentFixture<DndFileUploadComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DndFileUploadComponent,
        MockLocalizatorPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DndFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit action on file uploading', () => {
    const spy = spyOn(component.fileUploaded, 'emit');
    component.OnInputChange(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should emit dragover', () => {
    spyOn(component, 'ngOnInit');
    fixture.detectChanges();
    const input = debugElement.query(By.css('.dnd__input-file'));
    const inputElement = input.nativeElement;
    const event = inputElement.dispatchEvent(new Event('dragover'));
    expect(event).toBeTruthy();
  });

  it('should call onInputChange when IE', () => {
    fixture.detectChanges();
    const input = debugElement.query(By.css('.dnd__input-file'));
    const inputElement = input.nativeElement;
    const spy = spyOn(component, 'OnInputChange');
    component.isIE = true;
    component.ngOnInit();
    inputElement.dispatchEvent(new Event('drop'));
    const event  = new Event('drop');
    expect(spy).toHaveBeenCalledWith(event);
  });

});


@Pipe({ name: 'localizator' })
class MockLocalizatorPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}
