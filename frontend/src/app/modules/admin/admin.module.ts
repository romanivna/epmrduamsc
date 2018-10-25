import { NgModule } from '@angular/core';
import { CKEditorModule } from 'ng2-ckeditor';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-date-picker';
import { TextMaskModule } from 'angular2-text-mask';

import {
  AlbumsModalWindowComponent,
  AlbumPreviewComponent,
  HistoryPageComponent,
  GalleryPageComponent,
  AlbumCreatingComponent,
  EnsemblesCreatingComponent,
  AdmissionRulesComponent,
  TeacherManagementPageComponent,
  TeacherManagementComponent,
  CreateEditTeacherComponent,
  EducationEditingComponent,
  MockAlbumsComponent,
  DepartmentCreatingComponent,
  AlumniManagementPageComponent,
  AlumniManagementComponent,
  CreateEditAlumniComponent,
  DocumentsManagementPageComponent,
  ApplicationsComponent,
  LaureatesPageComponent,
  CreateEditLaureateComponent,
  LaureatesManagementPageComponent
} from './components';

import {
  AdminRoutingModule,
  routingComponents
} from './admin-routing.module';

import { UserCreateGuard } from './guards/create-user.guard';
import { SaveFormGuard } from './guards/save-form.guard';
import { MSCommonModule } from '../mscommon-module/mscommon.module';
import { UserService } from './services/user.service';
import { HtmlToPdfService } from '../../services/html-to-pdf.service';
import { LocalizatorFromObjectPipe } from '../../shared/pipes/localizator-from-object/localizator-from-object.pipe';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    MSCommonModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    DpDatePickerModule,
    TextMaskModule
  ],
  declarations: [
    routingComponents,
    AlbumsModalWindowComponent,
    AlbumPreviewComponent,
    AdmissionRulesComponent,
    HistoryPageComponent,
    MockAlbumsComponent,
    GalleryPageComponent,
    AlbumCreatingComponent,
    DepartmentCreatingComponent,
    TeacherManagementPageComponent,
    TeacherManagementComponent,
    EducationEditingComponent,
    CreateEditTeacherComponent,
    MockAlbumsComponent,
    AlumniManagementPageComponent,
    AlumniManagementComponent,
    CreateEditAlumniComponent,
    EnsemblesCreatingComponent,
    ApplicationsComponent,
    DocumentsManagementPageComponent,
    LaureatesPageComponent,
    CreateEditLaureateComponent,
    LaureatesManagementPageComponent,
  ],
  providers: [ UserCreateGuard, UserService, SaveFormGuard, HtmlToPdfService, LocalizatorFromObjectPipe]
})
export class AdminModule { }
