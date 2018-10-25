import { Injectable } from '@angular/core';

@Injectable()
export class FileUploadService {

  constructor() {
  }

  upload(event: any, files: any): void {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = (e) => {
      const type = this.checkType(file.name);
      files.push({
        file,
        name: file.name,
        type
      });
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  private checkType(name: string): string {
    const parts = name.split('.');
    const ext = parts.pop().toLowerCase();
    const images = [ 'jpg', 'gif', 'bmp', 'png' ];
    const docs = [ 'doc', 'docx' ];
    if (images.includes(ext)) {
      return 'image';
    }
    if (docs.includes(ext)) {
      return 'doc';
    }
    if (ext === 'txt' || ext === 'pdf') {
      return ext;
    }
    return 'file';
  }

}
