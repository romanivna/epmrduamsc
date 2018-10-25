import { Component, OnInit } from '@angular/core';
import { ServerGetterService } from '../../../../shared/services/server-getter/server-getter.service';
import { urls } from '../../../../shared/constants/index';
import htmlpdfviewer from 'html-pdf-viewer';
import { HtmlToPdfService } from '../../../../services/html-to-pdf.service';
import { modalWindowAnimations } from '../../../mscommon-module/components/modal-window/animations/modal-window.animations';

@Component({
  selector: 'app-apply',
  templateUrl: 'applications.template.html',
  styleUrls: ['applications.styles.scss'],
  animations: modalWindowAnimations
})
export class ApplicationsComponent implements OnInit {
  public allApplications: any;
  public searchName = '';
  private isItemsInTheTrash = false;
  private applications: any;
  private showFilters = false;
  private departments: any;
  private filteredApplications: any;
  private departmentsShow = false;
  private yearsShow = false;
  private monthShow = false;
  private currentDepartment: any;
  private sortCoef = -1;
  private showTrash = false;
  private years = [];
  private months = [
    'January',
    'February',
    'March',
    'April',
    'MayFull',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'];
  private currentYear: any;
  private currentMonth: any;
  private arrOfFilters = [];
  private chosenApp: any;
  private checkedItems = [];
  private isAllTrashItemsChecked = false;
  private confirmQuestion: any;
  private trashAction: string;
  private subscriptions = [];
  private showFrameModal: boolean;
  private isDownloading: boolean;
  private trashCounter = 0;

  constructor(private serverGetterService: ServerGetterService,
              private htmlToPdfService: HtmlToPdfService) { }

  ngOnInit() {
    this.getApplications();
    this.subscriptions.push(this.htmlToPdfService.currentLocaleObservable().subscribe(data => {
      if (this.isDownloading) {
        this.download(data);
      } else {
        this.paintPDF(data);
      }
    }));
  }

  private getApplications() {
   this.trashCounter = 0;
      this.serverGetterService.get(`${urls.api.prod.applicants}`).subscribe(data => {
      this.getDepartments();
      this.allApplications = data['data'];
        this.isItemsInTheTrash = this.allApplications.some(item => {
          return item.deleted;
        });
      this.allApplications.forEach(item => {
        if (item.deleted) {
          this.trashCounter++;
        }
        const surname = item.student.lastName.split('');
        surname[0] = surname[0].toUpperCase();
        item['name'] = surname.join('') + ' ';
        item['name'] += `${item.student.firstName.split('')[0].toUpperCase()}. `;
        if (item.student.middleName) {
          item['name'] += `${item.student.middleName.split('')[0].toUpperCase()}.`;
        }
        const date = item.date.split('-');
        item['filters'] = {
          year: +date[2],
          month: +date[1],
          hide: false,
        };
        if (this.years.indexOf(item['filters'].year) === -1) {
          this.years.push(item['filters'].year);
        }
      });

      this.years.sort((a, b) => {
        return b - a;
      });

      this.applications = this.allApplications;
      this.filterByYear(this.currentYear);
    });
  }

  private getDepartments() {
    this.serverGetterService.get(urls.api.prod.departments).subscribe(data => {
      this.departments = data['data'];
    });
  }

  private sort(_sortType) {
    this.sortCoef = (- this.sortCoef);
    this.applications.sort((a, b) => {
      const student1 = a[_sortType];
      const student2 = b[_sortType];
      if ( student1 > student2) {
        return this.sortCoef;
      } else if (student1 < student2) {
        return (- this.sortCoef);
      }
      return 0;
    });
  }
  private sortByDate() {
    this.sortCoef = (- this.sortCoef);
    this.applications.sort((a, b) => {
      const student1 = a['filters'];
      const student2 = b['filters'];
      if (+student1.year > +student2.year) {
        return this.sortCoef;
      } else if (+student1.year < +student2.year) {
        return (- this.sortCoef);
      } else if (+student1.year === +student2.year && +student1.month > +student2.month) {
        return this.sortCoef;
      } else if (+student1.year === +student2.year && +student1.month < +student2.month) {
        return (- this.sortCoef);
      }
      return 0;
    });

  }

  public showMore(_type) {
    if (_type === 'yearsShow') {
      this.monthShow = false;
      this.departmentsShow = false;
      this.yearsShow = !this.yearsShow;
    } else if (_type === 'monthShow') {
      this.yearsShow = false;
      this.departmentsShow = false;
      this.monthShow = !this.monthShow;
    } else if (_type === 'departmentsShow') {
      this.yearsShow = false;
      this.monthShow = false;
      this.departmentsShow = !this.departmentsShow;
    }
  }

  public filterByDepartment(_department) {
    this.departmentsShow = false;
    this.currentDepartment = _department;

    this.showAfterFilter();
  }

  filterByYear(_year) {
    this.yearsShow = false;
    this.currentYear = _year;

    this.showAfterFilter();
  }

  filterByMonth(_month) {
    this.monthShow = false;
    this.currentMonth = _month;

    this.showAfterFilter();
  }

  showAfterFilter() {
    this.applications = this.allApplications.filter(item => {

      if (this.currentDepartment && this.currentYear && this.currentMonth) {
        return this.currentDepartment.id === item.student.department.id
        && this.currentYear === item['filters'].year
        && this.currentMonth === item['filters'].month;
      } else if (!this.currentDepartment && this.currentYear && this.currentMonth) {
        return this.currentYear === item['filters'].year
        && this.currentMonth === item['filters'].month;
      } else if (this.currentDepartment && !this.currentYear && this.currentMonth) {
        return this.currentDepartment.id === item.student.department.id
        && this.currentMonth === item['filters'].month;
      } else if (this.currentDepartment && this.currentYear && !this.currentMonth) {
        return this.currentDepartment.id === item.student.department.id
        && this.currentYear === item['filters'].year;
      } else if (this.currentDepartment && !this.currentYear && !this.currentMonth) {
        return this.currentDepartment.id === item.student.department.id;
      } else if (!this.currentDepartment && this.currentYear && !this.currentMonth) {
        return this.currentYear === item['filters'].year;
      } else if (!this.currentDepartment && !this.currentYear && this.currentMonth) {
        return this.currentMonth === item['filters'].month;
      } else {
        return item;
      }
    });
    this.search();
  }

  private search() {
    this.showTrash = false;
    const regExp = new RegExp('^' + this.searchName, 'ig');

    if (this.searchName === '') {
      this.applications.forEach(item => {
        item['filters'].hide = false;
      });
    }

    this.applications.forEach(item => {
      item['filters'].hide = !item.name.match(regExp);
    });
  }


  private trashApplication(_applicationToTrash) {
    this.isAllTrashItemsChecked = false;
    this.serverGetterService.delete(`${urls.api.prod.applicants}/${_applicationToTrash.id}`).subscribe(data => {
      this.applications = this.applications.map( item => {
        if (item['id'] === _applicationToTrash.id) {
          item['filters'].checked = false;
          item['deleted'] = data['deleted'];
          data['deleted'] ? this.trashCounter++ : this.trashCounter--;
        }
        this.isItemsInTheTrash = this.allApplications.some(apl => {
          return apl.deleted;
        });
        return item;
      });
    });
  }

  private deletePermanently(arr) {
    let arrayToDelete = arr.reduce((flat, toFlatten) =>
      flat.concat(Array.isArray(toFlatten) ? arrayToDelete(toFlatten) : toFlatten), []);
    arrayToDelete = arrayToDelete.map(item => {
        this.trashCounter--;
      this.isItemsInTheTrash = this.allApplications.some(apl => {
        return apl.deletedk;
      });
        return item.id;
      });
    this.serverGetterService.delete(`${urls.api.prod.applicants}`, true, arrayToDelete).subscribe(data => {
      this.getApplications();
      this.showTrash = true;
    });
  }

  private showApplication(_app) {
    this.chosenApp = _app;
    this.isDownloading = false;
    this.htmlToPdfService.createHtmlForApplications([_app]);
  }

  private paintPDF(_html) {
    this.showFrameModal = true;
    const frame = document.createElement('iframe');
    frame.setAttribute('id', 'iframe');
    document.body.appendChild(frame);
    htmlpdfviewer( _html, {
      margin:       20,
      filename:     `${this.chosenApp.name}.pdf`,
      output:       { mode: 'display', container: '#iframe'}
    });
    frame.style.position = 'fixed';
    frame.style.top = '50px';
    frame.style.left = '20%';
    frame.style.width = '60%';
    frame.style.height = '900px';
    frame.style.zIndex = '20';
  }

  private clearIframe() {
    this.showFrameModal = false;
    const frame = document.getElementById('iframe');
    const body = document.querySelector('body');
    body.removeChild(frame);
  }

  private downloadApplication(_app) {
    this.isDownloading = true;
    this.chosenApp = _app;
    this.htmlToPdfService.createHtmlForApplications([_app]);
  }

  private download(_html) {
    htmlpdfviewer( _html, {
      margin:       20,
      filename:     `${this.chosenApp.name}.pdf`,
      output:       { mode: 'save'}
    });
  }

  private saveAllApplications(_applications) {
   const applicationsToDownload = _applications.filter(item => {
     return !item.deleted;
   });
      this.isDownloading = true;
      this.chosenApp = {
        name: 'Заявки'
      };
      this.htmlToPdfService.createHtmlForApplications(applicationsToDownload, true);
  }

  private checkItems(_chosenItem) {
    _chosenItem['filters'].checked = !_chosenItem['filters'].checked;
    this.checkedItems = this.applications.filter( item => {
      return item.deleted && item['filters'].checked;
    });
    const deletedItems = this.applications.filter( item => {
      return item.deleted ? item : null;
    });
    this.isAllTrashItemsChecked = false;
    if (this.checkedItems.length === deletedItems.length) {
      this.isAllTrashItemsChecked = true;
    }
  }

  private checkAll() {
    this.isAllTrashItemsChecked = !this.isAllTrashItemsChecked;
      this.checkedItems = this.applications.filter( item => {
        return item.deleted;
      });
    this.checkedItems.forEach(item => {
      item['filters'].checked = this.isAllTrashItemsChecked;
    });
  }

  private deleteChosenItems() {
    if (this.checkedItems.length > 0) {
      this.confirmQuestion = {
        text: 'deleteChosenApplicationsQuestion'
      };
      this.trashAction = 'delete';
    }
  }

  private restoreChosenItems() {
    if (this.checkedItems.length > 0) {
    this.confirmQuestion =  {
      text: 'restoreChosenApplicationsQuestion'
    };
      this.trashAction = 'restore';
    }
  }

  private decideVoting(answer) {
    this.confirmQuestion = null;
    this.isAllTrashItemsChecked = false;
    if (answer && this.trashAction === 'delete') {
      const arrayToDelete = this.checkedItems.map(item => {
        this.trashCounter--;
        return item.id;
      });
      this.serverGetterService.delete(`${urls.api.prod.applicants}`, true, arrayToDelete).subscribe(data => {
        this.getApplications();
      });
    } else if (answer && this.trashAction === 'restore') {
      this.checkedItems.forEach(item => {
        item['filters'].checked = false;
        this.trashApplication(item);
        this.checkedItems = [];
      });
    }
  }
}
