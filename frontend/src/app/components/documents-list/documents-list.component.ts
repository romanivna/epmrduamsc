import { Component, Input, Output } from '@angular/core';
import { ServerGetterService } from '../../shared/services/index';


@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss']
})
export class DocumentsListComponent {
  @Input() public files: any[];

  constructor() {
  }

  getIconSuffix(type) {
    switch (type) {
      case 'image':
        return 'image-o';
      case 'pdf':
        return 'pdf-o';
      case 'txt':
        return 'text-o';
      case 'doc':
        return 'text';
      default:
        return 'o';
    }
  }

  removeFile(index: number): void {
    this.files.splice(index, 1);
  }
}
