import { Component, OnInit } from '@angular/core';
import { ServerGetterService } from '../../shared/services/server-getter/server-getter.service';
import { urls } from '../../shared/constants/index';
import { Http, ResponseContentType } from '@angular/http';
import { DetectBrowserService } from '../../shared/services/detect-browser/detect-browser.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  public showModal: boolean;
  public activeImage: any;
  private isDocuments: boolean;
  private aboutUs: any;


  constructor(private serverGetter: ServerGetterService,
              private http: Http,
              private detectBrowser: DetectBrowserService) { }

  ngOnInit() {
    this.serverGetter.get(urls.api.prod.documents).subscribe(data => {
      this.aboutUs = {
        about: data['about'],
        documents: data['documents']
      };
      if (this.aboutUs.documents.length === 0) {
        this.isDocuments = true;
      }
    });
  }

  private downloadFile(_doc) {
    return this.http
      .get(_doc.link, {
        responseType: ResponseContentType.Blob,
        search: _doc.title
      })
      .map(res => {
        return {
          filename: _doc.title,
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
