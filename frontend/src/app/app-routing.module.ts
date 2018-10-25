import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MSCommonModule } from './modules';

import { HomeComponent,
         ContactsComponent,
         GalleryComponent,
         HistoryComponent,
         VideosComponent,
         BoardingComponent,
         GeneralEducationComponent,
         GovernmentProcurementComponent,
         LibraryComponent,
         MusicDepartmentsComponent,
         ProjectsComponent,
         AllTeachersComponent,
         TeacherComponent,
         AlumniComponent,
         EnsembleItemComponent,
         GeneralEducationPageComponent,
         LoginComponent,
         AdmissionsComponent,
         AdmissionRulesComponent,
  //  PersonalAccountComponent,
         NotFoundComponent,
          TeachersComponent,
  AllTeachersListComponent
} from './components';

import { AuthAdminGuard } from './shared/services/guards';
import {
  NewsComponent,
  NewsItemComponent,
  NewsPreviewComponent,
  EventComponent,
  EventsComponent,
  EventsContentPreviewComponent,
  DepartmentsComponent,
  DepartmentsPreviewComponent,
  DepartmentsItemComponent,
  EnsemblesComponent,
  EnsemblesPreviewComponent,
  EnsemblesItemComponent
} from './modules/mscommon-module/components';
import { DocumentsComponent } from './components/documents/documents.component';
import { LaureatesComponent } from './components/laureates/laureates.component';

const msRoutes: Routes = [
  { path: '', data: { breadcrumb: 'home' },
    children: [
      { path: '', component: HomeComponent },
      { path: 'history', data: { breadcrumb: 'history' }, component: HistoryComponent },
      { path: 'gallery', data: { breadcrumb: 'gallery' }, component: GalleryComponent },
      { path: 'video', data: { breadcrumb: 'video' }, component: VideosComponent },
      { path: 'about-school', data: { breadcrumb: 'about school' }, component: DocumentsComponent },
      { path: 'admission-rules', data: { breadcrumb: 'admission rules' }, component: AdmissionRulesComponent },
      { path: 'compulsory-education', data: { breadcrumb: 'compulsory education' }, component: GeneralEducationComponent },
      { path: 'music-education', data: { breadcrumb: 'music education' }, component: MusicDepartmentsComponent },
      { path: 'music-departments/:id', redirectTo: 'departments/:id' },
      { path: 'admin-page', redirectTo: 'login' },
      { path: 'boarding', data: { breadcrumb: 'boarding' }, component: BoardingComponent },
      { path: 'apply', data: { breadcrumb: 'apply' }, component: AdmissionsComponent },
      // { path: 'library', data: { breadcrumb: 'library' }, component: LibraryComponent },
      { path: 'projects', data: { breadcrumb: 'projects' }, component: ProjectsComponent },
      { path: 'government-procurement', data: { breadcrumb: 'government Procurement' }, component: GovernmentProcurementComponent },
      { path: 'contacts', data: { breadcrumb: 'contacts' }, component: ContactsComponent },
      { path: 'events', component: EventsComponent,
        data: { breadcrumb: 'events' },
        children: [
          { path: '', component: EventsContentPreviewComponent},
          { path: ':breadcrumb', component: EventComponent, data: { breadcrumb: ':breadcrumb' }},
        ]
      },
      { path: 'news', data: { breadcrumb: 'news' }, component: NewsComponent,
        children: [
          { path: '', component: NewsPreviewComponent},
          { path: ':breadcrumb', component: NewsItemComponent, data: { breadcrumb: ':breadcrumb' }},
        ]
      },
      { path: 'departments', data: { breadcrumb: 'departments' }, component: DepartmentsComponent,
        children: [
          { path: '', component: DepartmentsPreviewComponent },
          { path: ':id', component: DepartmentsItemComponent, data: { breadcrumb: ':id' }},
        ]
      },
      { path: 'our-teachers', redirectTo: 'our-teachers/all' },
      { path: 'our-teachers', component: TeachersComponent, data: { breadcrumb: 'our teachers' },
        children: [
          { path: 'all', component: AllTeachersListComponent, data: { route: 'all', breadcrumb: 'All Teachers' }, },
          { path: 'all-teachers', redirectTo: 'all-teachers/0', data: { isOk: 'ok' } },
          { path: 'all-teachers/:breadcrumb', component: AllTeachersComponent, data: { breadcrumb: ':breadcrumb', route: 'all-teachers' }},
          { path: 'teacher/:breadcrumb', component: TeacherComponent, data: { breadcrumb: ':breadcrumb' } },
        ]
      },
      { path: 'alumni', data: { breadcrumb: 'alumni' }, component: AlumniComponent },
      { path: 'laureates', data: { breadcrumb: 'laureates' }, component: LaureatesComponent },
      // { path: 'symphony-orchestra', data: { breadcrumb: 'symphony orchestra' }, component: EnsembleItemComponent },
      // { path: 'boys\'-and-young-men\'s-choir', data: { breadcrumb: 'boys\' and young men\'s choir' }, component: EnsembleItemComponent },
      // { path: 'girls\'-chamber-choir', data: { breadcrumb: 'girls\' chamber choir' }, component: EnsembleItemComponent },
      { path: 'ensembles', data: { breadcrumb: 'ensembles' }, component: EnsemblesComponent,
        children: [
          { path: '', component: EnsembleItemComponent},
          { path: ':id', component: EnsemblesItemComponent, data: { breadcrumb: '' }},
        ]
      },
      { path: 'education', data: { breadcrumb: 'education' }, component: GeneralEducationPageComponent },
      { path: 'login', data: { breadcrumb: 'login' }, component: LoginComponent },
      {
        path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule',
        data: { breadcrumb: 'admin' }, canActivate: [AuthAdminGuard]
      },
      { path: '404', data: { breadcrumb: 'error 404' }, component: NotFoundComponent },
      { path: '**', redirectTo: '/404' }
    ]
  },
];

@NgModule({
  imports: [
    MSCommonModule,
    RouterModule.forRoot(msRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}

export const routingComponents = [
  HomeComponent,
  ContactsComponent,
  GalleryComponent,
  HistoryComponent,
  VideosComponent,
  BoardingComponent,
  GeneralEducationComponent,
  GovernmentProcurementComponent,
  LibraryComponent,
  MusicDepartmentsComponent,
  ProjectsComponent,
  AllTeachersComponent,
  TeacherComponent,
  AlumniComponent,
  EnsembleItemComponent,
  GeneralEducationPageComponent,
  LoginComponent,
  LaureatesComponent,
];
