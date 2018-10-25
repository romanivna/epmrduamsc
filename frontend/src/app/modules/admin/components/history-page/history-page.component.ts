import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { DragAndDropService, ServerGetterService } from '../../../../shared/services/';
import { urls } from '../../../../shared/constants/index';
import { GaleryNotificationsService } from '../../../../services/';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';


@Component({
  selector: 'app-history-page',
  templateUrl: 'history-page.template.html',
  styleUrls: ['history-page.styles.scss']
})

export class HistoryPageComponent implements OnInit, AfterViewInit, OnDestroy {
  public tabItems = [
    {
      name: 'In Ukrainian',
      lang: 'uk'
    },
    {
      name: 'In Russian',
      lang: 'ru'
    },
    {
      name: 'In English',
      lang: 'en'
    },
  ];
  public isAdminPageOpen: boolean;
  public historyItems: any;
  public historyMain: any;
  public questionForConfirmation: any;
  public questionToSave: boolean;
  public imgSelection = false;
  public savePressed = false;
  public currentLang: string;
  public deletingOrder: number;
  public albumsChosenOrderBlock: any;
  public dragTarget: any;
  private left: number;
  private dragOrder: number;
  private isDragging: boolean;
  private draggableObject: any;
  private isDragSuccessful: boolean;
  private isClickOutside: boolean;
  private isLangChanged: boolean;
  private subscriptions = [];
  private isNewFieldAdd: boolean;
  private routeGo = new Subject<boolean>();


  constructor( private DnD: DragAndDropService,
               private serverGetter: ServerGetterService,
               public galleryService: GaleryNotificationsService,
               private router: Router ) {


  }
  public ngOnInit() {
    this.isNewFieldAdd = false;
    this.currentLang = 'uk';
    this.isAdminPageOpen = true;
    this.galleryService.notificationsStream
      .subscribe((data) => {
        this.isAdminPageOpen = data === 'open';
      });
    this.historyMain = {
      orderNum: '',
      header: '',
      content: '',
      img: {
        link: '',
        id: '',
        title: ''
      },
      lang: {
        id: '',
        name: ''
      }
    };
    this.getData();
  }

  public getData() {
    this.serverGetter.get(`${urls.api.prod.history}?_lang=${this.currentLang}`)
      .subscribe(data => {
        this.historyItems = data.data;
        this.historyMain = data.data[0];
        this.historyMain.lang.name = this.currentLang;
        this.historyItems.splice(0, 1);
        this.historyItems.forEach(item => {
          item.lang.name = this.currentLang;
        });
        this.recountOrders();
      });
  }

  public ngAfterViewInit() {
    Array.from(document.querySelectorAll('.tab-item'))[0].classList.add('tab-item--active');
  }

  public highlightElement(event) {
    const activeItems = Array.from(document.querySelectorAll('.tab-item--active'));
    activeItems.forEach(item => {
      item.classList.remove('tab-item--active');
    });
    event.target.classList.add('tab-item--active');
  }

  public changeLanguage(event) {
    this.questionForConfirmation = {
      text: 'confirmationQuestionCancel'
    };
    this.questionToSave = false;
    this.savePressed = false;
    this.isLangChanged = true;
    this.canDeactivate();
    this.subscriptions.push(this.routeGo.subscribe(data => {
      if (data) {
        this.highlightElement(event);
        if (event.target.lang === this.currentLang) {
          return;
        } else {
          this.currentLang = event.target.lang;
        }
        this.questionForConfirmation = null;
        this.isLangChanged = false;
      }
      this.serverGetter.get(`${urls.api.prod.history}?_lang=${this.currentLang}`)
        .subscribe( (obj) => {
          this.historyItems = obj.data;
          this.getMain();
          this.recountOrders();
        });
    }));

    }

  public recountOrders() {
    for (let i = 0; i < this.historyItems.length; i++) {
      this.historyItems[i].orderNum = +i;
    }
    this.checkImagesPosition();
  }

  public getMain() {
    this.historyMain = this.historyItems[0];
    this.historyMain.lang.name = this.currentLang;
    this.historyItems.splice(0, 1);
  }

  public onDragBegin(event) {
      this.isDragging = true;
    this.dragTarget = event.target.parentElement;
    do {
      this.dragTarget = this.dragTarget.parentElement;
    } while (this.dragTarget.parentElement.classList[0] === 'history-page-block');
    this.dragOrder = this.dragTarget.attributes['data-order'].value;
    this.left = this.dragTarget.offsetLeft;
    this.dragTarget.classList.add('draggable');
    this.dragTarget.style.width = '80%';
  }

  public onDragging(event) {
    if (this.isDragging && !this.isDragSuccessful) {
      this.moveAt(event.pageY);
    }
  }

  public onDragEnd() {
    this.dragTarget.classList.remove('draggable');
    this.isDragSuccessful = true;
  }

  public onDrop(event) {
    if (this.isDragSuccessful) {
      this.draggableObject = this.historyItems[this.dragOrder];
      this.historyItems.splice(this.dragOrder, 1);
      const order = event.target.attributes['data-order'].value;
      this.historyItems.splice(order, 0, this.draggableObject);
      this.recountOrders();
    }
    this.reset();
  }

  private moveAt(coordY) {
    this.dragTarget.style.top = coordY - this.dragTarget.offsetHeight / 2 + 'px';
    this.dragTarget.previousElementSibling.style.display = 'none';
  }

  public reset() {
    if (this.dragTarget !== undefined) {
      this.dragTarget.style.width = '100%';
      this.dragTarget.classList.remove('draggable');
      this.dragTarget = null;
      this.isDragging = false;
      this.dragOrder = null;
      this.left = null;
      this.isDragSuccessful = false;
    }
  }

  private stopDrop(event) {
    event.stopPropagation();
  }

  public checkImagesPosition() {
      this.historyItems.forEach( (item, i) => {
        if (i % 2 === 0) {
          item.position = 'history-page-img-right';
        } else {
          item.position = 'history-page-img-left';
        }
      });
  }

  public updateImg(data: any): void {
    this.imgSelection = false;
    if (this.albumsChosenOrderBlock === 'main') {
      this.historyMain.img = data;
    } else {
      this.historyItems[this.albumsChosenOrderBlock].img = data;
    }
  }

  public addImage(event: any, order?): void {
    if (order === 'main') {
      this.DnD.addImage(event, this.historyMain, this.imgSelection);
    } else {
      this.DnD.addImage(event, this.historyItems, this.imgSelection, order);
    }
  }

  public showAlbums(order): void {
    this.imgSelection = true;
    this.albumsChosenOrderBlock = order;
  }

  public isValid(historyItems): boolean {
    let allValid = true;
    historyItems.forEach(item => {
      allValid = allValid && ( (item.title !== '') && (item.content !== '') && (item.img.id !== '') && (item.img.link !== '') );
      if (item.img.link === '') {
        document.querySelector(`.history-page-block[data-order='${item.orderNum}'] .history-page-block-img`).classList.add('required');
      }
    });
    return allValid;
  }

  public addField() {
    if (this.historyItems === undefined) {
      this.historyItems = [];
    }
    this.historyItems.push({
      orderNum: this.historyItems.length,
      header: '',
      img: {
      id: '',
        link: '',
        title: '',
    },
    content: '',
      lang: {
        id: '',
        name: this.currentLang,
      }
  });
    this.isNewFieldAdd = true;
    this.checkImagesPosition();
  }

  public delete(order) {
    this.deletingOrder = +order + 1;
    this.questionForConfirmation = {
      text: 'confirmationQuestion',
      itemHeader: ` '${ this.historyItems[order].header }' `,
      itemName: 'confirmationQuestionHistory'
    };
  }

  public remove() {
    this.historyItems.splice(0, 0, this.historyMain);
    this.historyItems.splice(this.deletingOrder, 1);
    this.serverGetter.post(`${urls.api.prod.history}?_lang=${this.currentLang}`, this.historyItems, {})
      .subscribe(data => {
        this.historyItems = data;
        this.historyMain = data[0];
        this.historyMain.lang.name = this.currentLang;
        this.historyItems.splice(0, 1);
        this.recountOrders();
      });
  }

  public suggestToSave(): void {
    const historyItemsArray = Array.from(document.querySelectorAll('.history-page-block'));
    const historyItemsContent = Array.from(document.querySelectorAll('.history-page-block-content__content'));
    const historyItemsTitle = Array.from(document.querySelectorAll('.history-page-block-content__title'));
    historyItemsArray.forEach((item, i) => {
      this.historyItems[i].orderNum = i;
      this.historyItems[i].header = (<HTMLInputElement>historyItemsTitle[i]).value;
      this.historyItems[i].content = (<HTMLInputElement>historyItemsContent[i]).value;
      this.historyItems[i].lang.name = this.currentLang;

    });
    this.savePressed = true;
    this.historyMain.header = (<HTMLInputElement>document.querySelector('.history-page-main-title__text')).value;
    if (!this.isValid(this.historyItems)) {
      return;
    }
    this.questionForConfirmation = {
      text: 'confirmationQuestionSaveHistory'
    };
    this.questionToSave = true;
  }

  public suggestToCancel(): void {
    this.questionForConfirmation = {
      text: 'confirmationQuestionCancel'
    };
    this.questionToSave = false;
  }

  public canDeactivate() {
    if (this.savePressed) {
      return true;
    } else {
      this.suggestToCancel();
      this.isClickOutside = true;
      return this.routeGo.asObservable();
    }
  }

  public decideAboutVoting(answer) {
    if (this.questionForConfirmation.itemName === 'confirmationQuestionHistory') {
      this.decideRemoving(answer);
      this.questionForConfirmation = null;
      return;
    }else if (answer && this.savePressed) {
      this.decideSaving();
      this.questionForConfirmation = null;
      return;
    } else if (!answer && this.savePressed) {
      this.questionForConfirmation = null;
      this.getData();
      return;
    } else if (answer && this.isLangChanged) {
      this.questionForConfirmation = null;
      return this.routeGo.next(true);
    } else if (!answer && this.isClickOutside) {
      this.questionForConfirmation = null;
      return this.routeGo.next(false);
    } else if (answer && this.isClickOutside) {
      return this.routeGo.next(true);
    } else if (answer && !this.savePressed) {
      this.getData();
      return;
    }
    this.questionForConfirmation = null;

  }

  public decideRemoving(answer) {
    if (answer) {
      this.remove();
      this.questionForConfirmation = null;
    } else {
      this.deletingOrder = null;
      this.questionForConfirmation = null;
      this.getData();
    }
  }

  public decideSaving() {
    this.questionForConfirmation = null;
    this.historyMain.orderNum = '';
    this.historyItems.splice(0, 0, this.historyMain);
    this.serverGetter.post(`${urls.api.prod.history}?_lang=${this.currentLang}`, this.historyItems, {})
      .subscribe(data => {
        this.historyItems = data;
        this.historyMain = data[0];
        this.historyMain.lang.name = this.currentLang;
        this.historyItems.splice(0, 1);
        this.recountOrders();
      });
    this.reset();
  };

  ngOnDestroy() {
    this.routeGo.unsubscribe();
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
