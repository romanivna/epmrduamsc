import { Injectable } from '@angular/core';
import { urls } from '../../../shared/constants/';
import { ServerGetterService, SpinnerService } from '../';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DetectBrowserService} from '../detect-browser/detect-browser.service';

@Injectable()
export class DragAndDropService {

  public evTarVal: any;
  public evtar: any;
  private eventData: any;
  private isImgSelected: boolean;
  private fileReader: FileReader;
  private formData: FormData;
  private isMultiple: boolean;
  private order: any;


  constructor(private serverGetter: ServerGetterService,
              public ng2ImgMaxService: Ng2ImgMaxService,
              private spinnerService: SpinnerService,
              private detectBrowser: DetectBrowserService) { }

  public addImage(event, eventData, isImgSelected, order?) {
    this.spinnerService.show = true;
    this.eventData = eventData;
    this.isImgSelected = isImgSelected;

    if (this.detectBrowser.isIE11() && (event.type === 'drop')) {
      this.evTarVal = event.dataTransfer.files[0].name;
      this.evtar = event.dataTransfer;
    } else {
      this.evTarVal = event.target.value;
      this.evtar = event.target;
    }
    this.addOnlyFile(this.evtar.files[0], this.eventData,  this.isImgSelected, this.evTarVal, this.evtar, false, order);
  }

  public addOnlyFile(file, EventData, IsImgSelected, EvTarVal, Evtar, IsMultiple?, Order?, fn?) {
    this.eventData = EventData;
    this.isImgSelected = IsImgSelected;
    this.order = Order;
    this.evTarVal = EvTarVal;
    this.evtar = Evtar;
    this.isMultiple = IsMultiple;
    this.ng2ImgMaxService.resize([file], 2000, 1000).subscribe((result) => {
      this.spinnerService.show = false;
      const reader = new FileReader();
      reader.onloadend = (e) => {
        const fd = new FormData();
        fd.append('image', result, this.evTarVal);
        if ( this.order !== undefined ) {
          this.eventData = this.eventData[this.order];
        }
        if ( this.eventData.img == null || this.eventData.img === undefined || !this.eventData.img.id) {
          this.serverGetter.post(`${ urls.api.prod.images }?title=''`, fd, {})
            .subscribe((res) => {
              this.updateImg(res, this.evtar, this.order);
              this.evTarVal = '';
              if (fn) {
                fn();
              };
            });
        } else {
          this.serverGetter.post(`${ urls.api.prod.images }/${this.eventData.img.id}?title=''`, fd, {})
            .subscribe((res) => {
              this.updateImg(res, this.evtar, this.order);
              this.evTarVal = '';
              if (fn) {
                fn();
              };
            });
        }
      };
      reader.readAsDataURL(result);
    });
  }

  public updateImg(data: any, target, order?): void {
    this.isImgSelected = false;
    if (this.isMultiple) {
      this.eventData.push(data);
    // } else if (order !== undefined) {
    //   this.eventData[order].img = data;
    } else {
      this.eventData.img = data;
    }
    (<HTMLInputElement>target).value = '';
    this.spinnerService.show = false;
  }

  public addFile(event, eventData, fn?) {
    this.spinnerService.show = true;
    this.eventData = eventData;
    if (this.detectBrowser.isIE11() && (event.type === 'drop')) {
      this.evTarVal = event.dataTransfer.files[0].name;
      this.evtar = event.dataTransfer;
    } else {
      this.evTarVal = event.target.value;
      this.evtar = event.target;
    }

    this.spinnerService.show = false;
      this.fileReader = new FileReader();
      this.fileReader.onloadend = (e) => {
        this.formData = new FormData();
        this.formData.append('image', this.evtar.files[0], this.evTarVal);
        if (eventData.img && eventData.img.id !== '' && !fn) {
          this.serverGetter.post(`${ urls.api.prod.images }/${eventData.img.id}?title=${this.evtar.files[0].name}`, this.formData, {})
            .subscribe((res) => {
              this.updateFile(res);
              this.evTarVal = '';
              if (fn) { fn(res); };
            });
        } else {
          this.serverGetter.post(`${ urls.api.prod.images }?title=${this.evtar.files[0].name}`, this.formData, {})
            .subscribe((res) => {
              this.updateFile(res);
              this.evTarVal = '';
              if (fn) { fn(res); };
            });
        }
      };
      this.fileReader.readAsDataURL(this.evtar.files[0]);
  }

  public updateFile(data: any): void {
    this.eventData.img = data;
      (<HTMLInputElement>document.getElementById('input')).value = '';
    this.spinnerService.show = false;
  }
}
