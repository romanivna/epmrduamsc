import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'angular4-carousel';
import { DpDatePickerModule } from 'ng2-date-picker';
import { AppComponent } from './app.component';
import { routingComponents } from './app-routing.module';
import { TeachersService, DepartmentsService } from 'app/services';

import {
  HeaderComponent,
  FooterComponent,
  CredentialsComponent,
  LocalizationComponent,
  LogoComponent,
  SearchComponent,
  DepartmentsComponent,
  GovernmentProcurementComponent,
  MusicDepartmentsItemPreviewComponent,
  TeachersPreviewItemComponent,
  ImageSliderComponent,
  ThumbnailComponent,
  AlumniItemComponent,
  BreadcrumbsComponent,
  DocumentsListComponent,
  NotFoundComponent,
  MusicEducationGeneralComponent,
  LaureatesComponent,
  UserStateComponent,
  AdmissionsComponent,
  FormComponent,
  TextFieldComponent,
  SelectFieldComponent,
  RadioGroupFieldComponent,
  DateFieldComponent,
  TextGroupFieldComponent,
  AdmissionRulesComponent,
  TeachersComponent,
  AllTeachersListComponent,
  DocumentsComponent,
  LaureatesItemComponent
} from './components';

import { AdminModule, MSCommonModule } from './modules';

// import { UserStateComponent } from './components/header/user-state/user-state.component';
// import { AdmissionsComponent } from './components/admissions/admissions.component';
// import { FormComponent } from './components/form/form.component';
// import { TextFieldComponent } from './components/form/fields/text-field/text-field.component';
// import { SelectFieldComponent } from './components/form/fields/select-field/select-field.component';
// import { RadioGroupFieldComponent } from './components/form/fields/radio-group-field/radio-group-field.component';
// import { DateFieldComponent } from './components/form/fields/date-field/date-field.component';
// import { TextGroupFieldComponent } from './components/form/fields/text-group-field/text-group-field.component';

import { GaleryNotificationsService } from './services/';
import { DragAndDropService } from './shared/services/';
import { Ng2ImgMaxModule, Ng2ImgMaxService, ImgExifService, ImgMaxSizeService, ImgMaxPXSizeService } from 'ng2-img-max';
import { Ng2PicaService } from 'ng2-pica';
import { HideScrollElementService } from './shared/services/hide-scroll-element/hide-scroll-element.service';

// import { AdmissionRulesComponent } from './components/admission-rules/admission-rules.component';
import { SafeHtmlPipe } from './shared/pipes/safe-html.pipe';

// import { TeachersComponent } from './components/all-teachers/teachers.component';
// import { AllTeachersListComponent } from './components/all-teachers/all-teachers-list/all-teachers-list.component';
// import { DocumentsComponent } from './components/documents/documents.component';
// import { LaureatesItemComponent } from './components/laureates/laureates-item/laureates-item.component';

import { RouterLinkStubDirective } from './shared/tests/router-stub';

import {
  ServerGetterService,
  SpinnerService,
  LocalizatorService,
  AuthService,
  WindowRefService,
  FileUploadService,
  EditorInsertImageService,
  DetectBrowserService
} from './shared/services';

import { BreadcrumbsService } from './components/breadcrumbs/breadcrumbs.service';

import { AuthAdminGuard } from './shared/services/guards';

import {
  KeysPipe
} from './shared/pipes';


@NgModule({
  declarations: [
    routingComponents,
    AppComponent,
    HeaderComponent,
    LogoComponent,
    LocalizationComponent,
    SearchComponent,
    DepartmentsComponent,
    FooterComponent,
    CredentialsComponent,
    RouterLinkStubDirective,
    GovernmentProcurementComponent,
    ImageSliderComponent,
    ThumbnailComponent,
    TeachersPreviewItemComponent,
    MusicDepartmentsItemPreviewComponent,
    TeachersPreviewItemComponent,
    KeysPipe,
    AlumniItemComponent,
    UserStateComponent,
    AdmissionsComponent,
    FormComponent,
    TextFieldComponent,
    SelectFieldComponent,
    RadioGroupFieldComponent,
    DateFieldComponent,
    TextGroupFieldComponent,
    BreadcrumbsComponent,
    DocumentsListComponent,
    NotFoundComponent,
    MusicEducationGeneralComponent,
    AdmissionRulesComponent,
    SafeHtmlPipe,
    TeachersComponent,
    AllTeachersListComponent,
    DocumentsComponent,
    LaureatesComponent,
    LaureatesItemComponent
  ],
  imports: [
    MSCommonModule,
    BrowserModule,
    FormsModule,
    TextMaskModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    AdminModule,
    DpDatePickerModule,
    Ng2ImgMaxModule,

  ],
  providers: [
    ServerGetterService,
    SpinnerService,
    LocalizatorService,
    AuthAdminGuard,
    AuthService,
    WindowRefService,
    TeachersService,
    DepartmentsService,
    BreadcrumbsService,
    FileUploadService,
    EditorInsertImageService,
    DetectBrowserService,
    GaleryNotificationsService,
    DragAndDropService,
    HideScrollElementService,
    Ng2ImgMaxService,
    ImgMaxSizeService,
    ImgExifService,
    ImgMaxPXSizeService,
    Ng2PicaService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
