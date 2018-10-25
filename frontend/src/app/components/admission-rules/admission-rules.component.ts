import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ServerGetterService } from '../../shared/services/server-getter/server-getter.service';
import { BreadcrumbsService } from '../../components/breadcrumbs/breadcrumbs.service';
import { urls } from '../../shared/constants/index';
import { AdmissionRules } from 'app/declarations';
import { LocalizatorService } from '../../shared/services/localizator';
import { DragAndDropService } from '../../shared/services';
import { Http, ResponseContentType } from '@angular/http';
import { DetectBrowserService } from '../../shared/services/detect-browser';

@Component({
  selector: 'app-admission-rules',
  templateUrl: './admission-rules.component.html',
  styleUrls: ['./admission-rules.component.scss']
})
export class AdmissionRulesComponent implements OnInit {

  public admissionItem: any;
  public content: string;
  public id: any;
  public file: any;

  private ngcontent: string;

  constructor(private serverGetterService: ServerGetterService,
              private localizatorService: LocalizatorService,
              private detectBrowser: DetectBrowserService,
              private http: Http) { }

  ngOnInit() {
    this.getAdmissionRules();
    this.admissionItem = {};
  }

  private getAdmissionRules(): void {
   this.serverGetterService
    .get(`${urls.api.prod.files}?lang=uk`).subscribe(data => {
      this.admissionItem = data;
      console.log('Admission Item: ', this.admissionItem);
   });

  }

  public downloadAdmissionRules() {
    return this.http
      .get(this.admissionItem.img.link, {
        responseType: ResponseContentType.Blob,
        search: this.admissionItem.img.title
      })
      .map(res => {
        return {
          filename: this.admissionItem.img.title,
          data: res.blob()
        };
      })
      .subscribe(res => {
        const url = window.URL.createObjectURL(res.data);
        const a = document.createElement('a');
        document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url;
          a.download = res.filename;
          a.click();
          if (this.detectBrowser.isIE11()) {
            window.navigator.msSaveBlob(res.data, res.filename);
          } else {
            window.URL.revokeObjectURL(url);
            a.remove(); // remove the element
          }

      }, error => {
        console.log('download error:', JSON.stringify(error));
      }, () => {
      });
  }

}
