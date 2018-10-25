import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  NewsComponent,
  NewsItemComponent,
  ShowNextButtonComponent,
  TitleComponent,
  NewsItemPreviewComponent,
  SpinnerComponent,
  ToTopButtonComponent,
  ModalWindowComponent,
  NavigationComponent,
  NgForNumberPipe,
  OnLinkFocusedDirective,
  ConfirmationModalWindowComponent,
  AlbumsComponent,
  ErrorMessageComponent,
  EventComponent,
  EventsComponent,
  NewsContentPreviewComponent,
  NewsPreviewComponent,
  EventsContentPreviewComponent,
  EventHeaderComponent,
  EventBodyComponent,
  DndFileUploadComponent,
  DateBoxComponent,
  DndTextFileUploadComponent,
  DepartmentsComponent,
  DepartmentsItemComponent,
  DepartmentsPreviewComponent,
  DepartmentsItemPreviewComponent,
  EducationComponent,
  EducationItemPreviewComponent,
  EducationPreviewComponent,
  EnsemblesComponent,
  EnsemblesItemPreviewComponent,
  EnsemblesPreviewComponent,
  EnsemblesItemComponent
} from './components';

import { ContentPreparatorService } from './services';

import {
  RouteNormalizerPipe,
  ImageUrlCreatorPipe,
  DateToStringPipe,
  SafeHtmlPipe
} from './pipes';

import { LocalizatorPipe, LocalizatorFromObjectPipe } from './../../shared/pipes';

const components = [
  NewsComponent,
  NewsItemComponent,
  ShowNextButtonComponent,
  TitleComponent,
  NewsItemPreviewComponent,
  ModalWindowComponent,
  SpinnerComponent,
  ToTopButtonComponent,
  NavigationComponent,
  RouteNormalizerPipe,
  ImageUrlCreatorPipe,
  NgForNumberPipe,
  LocalizatorPipe,
  LocalizatorFromObjectPipe,
  OnLinkFocusedDirective,
  OnLinkFocusedDirective,
  ConfirmationModalWindowComponent,
  AlbumsComponent,
  ErrorMessageComponent,
  EventComponent,
  EventsComponent,
  NewsContentPreviewComponent,
  NewsPreviewComponent,
  EventsContentPreviewComponent,
  DateToStringPipe,
  DndFileUploadComponent,
  SafeHtmlPipe,
  DateBoxComponent,
  DndTextFileUploadComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    EventHeaderComponent,
    EventBodyComponent,
    ...components,
    ToTopButtonComponent,
    DepartmentsComponent,
    DepartmentsItemPreviewComponent,
    DepartmentsPreviewComponent,
    DepartmentsItemComponent,
    EducationComponent,
    EducationItemPreviewComponent,
    EducationPreviewComponent,
    EnsemblesComponent,
    EnsemblesItemPreviewComponent,
    EnsemblesPreviewComponent,
    EnsemblesItemComponent
  ],
  providers: [ ContentPreparatorService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: components
})
export class MSCommonModule { }
