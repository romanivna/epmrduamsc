import { Component, OnInit, OnDestroy } from '@angular/core';
import { DragAndDropService } from '../../../../shared/services/drag-and-drop/drag-and-drop.service';
import { urls, ckEditorConfig } from './../../../../shared/constants';
import {ServerGetterService} from '../../../../shared/services/server-getter/server-getter.service';
import { Document } from '../../../../declarations/index';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-documents-management-page',
  templateUrl: './documents-management-page.component.html',
  styleUrls: ['./documents-management-page.component.scss']
})
export class DocumentsManagementPageComponent implements OnInit, OnDestroy {
  public documents = [];
  public about: string;
  public docImages = [];
  public docFiles = [];
  public file = [];
  public aboutUs = {};
  public savePressed = false;
  public questionForConfirmation: any;
  public questionToUpdate: boolean;
  private removedDocumentItem: number;
  private questionToCancel = false;
  private ckEditorConfig = ckEditorConfig;
  public aboutUsForm = new FormGroup({
    content: new FormControl()
  });

  constructor(private serverGetterService: ServerGetterService,
              private DnD: DragAndDropService,
              private router: Router) {
  }

  ngOnInit() {
    this.getDocuments();
  }

  public getDocuments() {
    this.serverGetterService
      .get(urls.api.prod.documents)
      .subscribe(data => {
        this.documents = data['documents'];
        this.about = data['about'];
        this.aboutUsForm.controls.content.setValue(this.about);
      });
  }

  public addFile(event: any): void {
    Array.from(event.target.files).forEach(item => {
      if (item['type'].indexOf('pdf') !== -1) {
        this.DnD.addFile(event, this.file, () => {
          this.file['img'].type = 'pdf';
          this.docFiles.push(this.file['img']);
        });
      } else {
        this.DnD.addOnlyFile(item, this.docImages, false, event.target.value, event.target, true);
      };
    });
  }

  public openDocument(link: string) {
    this.router.ngOnDestroy();
    window.open(link, '_blank');
  }


  public deleteSavedDocument(id) {
    this.removedDocumentItem = id;
    this.serverGetterService.delete(`${ urls.api.prod.documents }/${ this.removedDocumentItem }`)
      .subscribe(() => {
          this.getDocuments();
        });
  }

  public deleteUnsavedDocument(id, arr) {
    this.removedDocumentItem = id;
    this.serverGetterService.delete(`${ urls.api.prod.images }/${ this.removedDocumentItem }`)
      .subscribe(() => {
        if (arr === this.docFiles) {
          this.docFiles = this.docFiles.filter((item) => {
            return item.id !== this.removedDocumentItem;
          });
        } else {
          this.docImages = this.docImages.filter((item) => {
            return item.id !== this.removedDocumentItem;
          });
        }
      });
  }

  public suggestToSave(): void {
    this.savePressed = true;
    this.questionForConfirmation = {
      text: 'confirmationQuestionSaveDocuments'
    };
    this.questionToUpdate = true;
    this.questionToCancel = false;
  }

  public suggestToCancel(): void {
    this.questionForConfirmation = {
      text: 'confirmationQuestionCancel'
    };
    this.questionToUpdate = false;
    this.questionToCancel = true;
  }

  public decideAboutVoting(answer: boolean): void {
    this.questionForConfirmation = null;
    this.reactOnAnswer(answer);
  }

  private reactOnAnswer(answer) {
    if (this.questionToUpdate && answer) {
      this.save();
    } else if (this.questionToCancel && answer ) {
      this.cleanUnsavedDocuments(true);
    }
  }


  public cleanUnsavedDocuments(cancel: boolean) {
    if (cancel) {
      [...this.docImages, ...this.docFiles].forEach(({ id }) => this.deleteUnsavedDocument(id, this));
      this.aboutUsForm.controls.content.setValue(this.about);
    }
    this.docImages.length = 0;
    this.docFiles.length = 0;
  }


  public save() {
    this.docImages.map((item) => {
      return item.type = 'image';
    });
    this.documents = this.documents.concat(this.docImages, this.docFiles);
    this.cleanUnsavedDocuments(false);
    this.aboutUs['about'] = this.aboutUsForm.controls.content.value;
    this.aboutUs['documents'] = this.documents;
    this.sendToServer();
  }

  public sendToServer(): void {
    this.serverGetterService.post(urls.api.prod.documents, this.aboutUs, {}).subscribe(data => {
    });
  }


  public trackByFn(index, item) {
    return index;
  }


  ngOnDestroy() {
    this.cleanUnsavedDocuments(true);
  }
}

