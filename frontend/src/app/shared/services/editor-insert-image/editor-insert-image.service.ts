import { Injectable } from '@angular/core';
import { ServerGetterService } from './../../../shared/services';
import { urls } from './../../../shared/constants';
import { template } from './editor-insert-image.template';

import 'ckeditor/ckeditor.js';
import 'ckeditor/plugins/autogrow/plugin.js';
declare const CKEDITOR: any;

@Injectable()
export class EditorInsertImageService {
  private url = urls.api.prod.images;
  private counter = 0;

  constructor(private serverGetterService: ServerGetterService) {
  }

  private createCustomeTab() {
    CKEDITOR.on('dialogDefinition', this.dialogCallback);
  }

  public dialogCallback(ev) {
    const dialogName = ev.data.name;
    const dialogDefinition = ev.data.definition;
    if (dialogName === 'image') {
      dialogDefinition.addContents({
        title: 'Upload',
        id: 'upload',
        label: 'Upload',
        elements: [{
          type: 'html',
          html: template.source
        }]
      });
     }
  }

  upload() {
    if (this.counter === 0) {
      this.createCustomeTab();
      this.counter++;
    }
    CKEDITOR.handleImageUpload = (event) => {
      event.preventDefault();
      const reader = new FileReader();
      const inputTarget = event.target[0];
      const file = inputTarget.files[0];
      if (file) {
        const fd = new FormData();
        fd.append('image', file, inputTarget.value.substring(inputTarget.value.lastIndexOf('\\') + 1));
        this.serverGetterService.post(`${ this.url }?title=''`, fd, {  })
          .subscribe(({ id, link }) => {
              CKEDITOR.dialog.getCurrent()
                .getContentElement('info', 'txtUrl')
                .setValue(`${link}`);
              CKEDITOR.dialog.getCurrent().selectPage( 'info' );
            });
      }
    };
  }
}
