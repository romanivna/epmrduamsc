import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-dnd-file-upload',
  templateUrl: './dnd-file-upload.component.html',
  styleUrls: ['./dnd-file-upload.component.scss']
})
export class DndFileUploadComponent implements OnInit {
  private uA = window.navigator.userAgent;
  public isIE = /msie\s|trident\/|edge\//i.test(this.uA);
  @Input()
  public title: string;
  @Input()
  public dndHeight: string;
  @Input()
  public couldFiles: boolean;
  @Input()
  public dndTop: string;
  @Input()
  private multiple: boolean;
  @Output()
  public fileUploaded = new EventEmitter<any>();
  @ViewChild('container')
  public container: HTMLElement;
  constructor( ) {}

  ngOnInit() {
    document.querySelector('.dnd__input-file').addEventListener('dragover', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
    if (this.isIE) {
      document.querySelector('.dnd__input-file').addEventListener('drop', (event) => {
        this.OnInputChange(event);
      });
    }
  }

  OnInputChange(event) {
    this.fileUploaded.emit(event);
  }

}
