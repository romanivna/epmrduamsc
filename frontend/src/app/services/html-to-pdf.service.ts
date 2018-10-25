import { Injectable } from '@angular/core';
import { LocalizatorService } from '../shared/services/localizator/localizator.service';
import { Observable, Subject } from 'rxjs/Rx';
import * as moment from 'moment';

@Injectable()
export class HtmlToPdfService {
  private translations: any;
  private applications = [];
  private header: any;
  private footer: any;
  private html: any;
  private htmlUpdateSubj = new Subject<string>();
  private isMultiple: boolean;

  constructor ( private localizator: LocalizatorService ) {
  }

  private getTranslation ( value ) {
    let val = value.split ( '' );
    val[ 0 ] = val[ 0 ].toUpperCase ();
    val = val.join ( '' );
    return this.translations[ val ];
  }

  private createApplication ( _application ) {
    moment.locale('uk');
    const app = {
      grade: _application.grade,
      date: _application.date,
      parent: [
        {
          firstName: _application.parent[0].firstName,
          lastName: _application.parent[0].lastName,
          middleName: _application.parent[0].middleName,
          birthday: moment(_application.parent[0].birthday).format('Do MMM YYYY'),
          relationship:  this.getTranslation(_application.parent[0].relationship),
          gender: this.getTranslation(_application.parent[0].gender ),
          email: _application.parent[0].email || '',
          telephone: _application.parent[0].telephone,
          permanentAddress: {
            addressLine: _application.parent[0].permanentAddress.addressLine || '',
            city: _application.parent[0].permanentAddress.city || '',
            region: _application.parent[0].permanentAddress.region || '',
            country: _application.parent[0].permanentAddress.country || '',
            postal: _application.parent[0].permanentAddress.postal || ''
          }
        }
      ],
      student: {
        firstName: _application.student.firstName,
        lastName: _application.student.lastName,
        middleName: _application.student.middleName,
        birthday: moment(_application.student.birthday).format('Do MMM YYYY'),
        gender:  this.getTranslation(_application.student.gender),
        department:  _application.student.department.name,
        telephone: _application.student.telephone || '',
        email: _application.student.email || '',
        dormitory: this.getDormintory(_application.student.dormitory),
        permanentAddress: {
          country: _application.student.permanentAddress.country || '',
          region: _application.student.permanentAddress.region || '',
          city: _application.student.permanentAddress.city || '',
          addressLine: _application.student.permanentAddress.addressLine || '',
          postal: _application.student.permanentAddress.postal || ''
        }
      }
    };
    return app;
  }

  private getDormintory(answer) {
    if (answer) {
      return 'Потрібен';
    } else {
      return 'Не потрібен';
    }
  }

  public createHtmlForApplications ( _applicationsArray, isMultiple? ) {
    this.isMultiple = isMultiple;
    this.header =
      `<html class="frameDoc">
<head>
<style>

      .header {
  font-family: 'Oswald light', Arial, sans-serif;
  color: #e55342;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 22px;
  margin: 20px 20px 20px 100px;
}

.title {
  font-family: 'Oswald light', Arial, sans-serif;
  font-size: 18px;
  display: inline-block;
  width: 5cm;
  margin: 10px;
  text-transform: capitalize;
}

.info {
  font-family: 'Oswald light', Arial, sans-serif;
  display: inline-block;
  width: 5cm;
  margin: 10px;
  text-transform: capitalize;
}

.header-date {
  font-family: 'Oswald light', Arial, sans-serif;
  text-transform: uppercase;
  margin: 0 10px;
  font-style: italic;
}

.info-date {
  font-style: italic;
}

.date {
  display: flex;
  justify-content: flex-end;
  margin: 30px;
}              
</style>
</head>
<body>
`;
    this.footer = `</body></html>`;
    this.html = '';
    this.localizator.getTranslationsByLang ( 'uk' ).subscribe ( data => {
      this.translations = data[ 'data' ];
      this.applications = _applicationsArray.map(item => {
        return this.createApplication(item);
      });
      this.createResult(this.applications);
      } );
  }

  private createResult(_applications) {
    _applications.forEach( item => {
      let innerHtml = `<div>
  <h1 class="header">Студент</h1>
 <p>
 <p>  <b class="title">Прізвище Ім'я По батькові:</b> 
 <span class="info">${item.student.firstName} ${item.student.middleName} ${item.student.lastName} </span>
</p>
  <p>  <b class="title">Стать:</b><span class="info">  ${item.student.gender} </span></p>
  <p>  <b class="title">Клас:</b><span class="info">${item.grade} </span></p>
  <p>  <b class="title">Відділ:</b><span class="info"> ${item.student.department} </span></p>
  <p>  <b class="title">День народження: </b><span class="info">  ${item.student.birthday} </span></p>
  <p>  <b class="title">Гуртожиток:</b><span class="info"> ${item.student.dormitory} </span></p>
  <p>  <b class="title">Email: </b><span class="info">  ${item.student.email} </span></p>
  <p>  <b class="title">Телефон: </b><span class="info">  ${item.student.telephone} </span></p>
  <p>  <b class="title">Адреса проживання:</b><span class="info"> ${item.student.permanentAddress.country + ','} 
        ${item.student.permanentAddress.city + ','}
        ${item.student.permanentAddress.addressLine + ','}
        ${item.student.permanentAddress.region }
        ${item.student.permanentAddress.postal} </span></p>
  <h1 class="header">Батьки</h1>`;
      item.parent.forEach(parent => {
        innerHtml += `<p>  <b class="title">Прізвище Ім'я По батькові:</b>
<span class="info">${parent.firstName} ${parent.middleName} ${parent.lastName} </span></p>
  <p>  <b class="title">Стать:</b><span class="info">  ${parent.gender} </span></p>
  <p>  <b class="title">Для дитини:</b><span class="info">  ${parent.relationship} </span></p>
  <p>  <b class="title">День народження: </b><span class="info">  ${parent.birthday} </span></p>
  <p>  <b class="title">Email: </b><span class="info">  ${parent.email} </span></p>
  <p>  <b class="title">Телефон: </b><span class="info">  ${parent.telephone} </span></p>
  <p>  <b class="title">Адреса проживання:</b><span class="info">  ${parent.permanentAddress.country + ','}
        ${parent.permanentAddress.city + ','}
        ${parent.permanentAddress.addressLine + ','}
        ${parent.permanentAddress.region  }
        ${parent.permanentAddress.postal} </span></p> `;
      });
      innerHtml += `<div class="date">
    <h2 class="header-date">Дата подачі заявки:</h2> <p class="info-date"> ${item.date}</span></p>
  </div>
</div>`;
      if (!this.isMultiple) {
        this.html = this.header + innerHtml + this.footer;
      } else {
        this.html += this.header + innerHtml + this.footer;
      }
    });
    this.htmlUpdateSubj.next(this.html);

  }

  public currentLocaleObservable(): Observable<string> {
  return this.htmlUpdateSubj.asObservable();
}
}
