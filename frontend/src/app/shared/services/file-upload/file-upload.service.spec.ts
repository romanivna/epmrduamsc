import { TestBed, inject } from '@angular/core/testing';
import { FileUploadService } from './file-upload.service';

describe('FileUploadService', () => {
  const service = new FileUploadService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileUploadService]
    });
  });

  it('should keep all uploaded documents', () => {
    const files = [];
    const event = {
      target: {
        files: [
          { name: 'mock.jpg' }
        ],
        value: 'test\\test\\test.test'
      }
    };
    const reader = {
      readAsDataURL(path: string) {
        this.onloadend({});
      }
    };
    spyOn(window, 'FileReader').and.returnValue(reader);
    (service as any).upload(event, files);
    expect(files[0].name).toBe('mock.jpg');
  });

  it('should check if uploaded file is document', () => {
    const doc = '.doc';
    expect((service as any).checkType(doc)).toBe('doc');
  });

  it('should check if uploaded file is picture', () => {
    const img = '.jpg';
    expect((service as any).checkType(img)).toBe('image');
  });

});
