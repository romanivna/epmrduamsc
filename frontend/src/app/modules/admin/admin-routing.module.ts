import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  InitialPageComponent,
  NewsItemCreatingComponent,
  EventCreatingComponent,
  CreateUserComponent,
  UserManagementComponent,
  AdmissionRulesComponent,
  HistoryPageComponent,
  EditUserComponent,
  UserManagementPageComponent,
  DepartmentCreatingComponent,
  TeacherManagementPageComponent,
  TeacherManagementComponent,
  CreateEditTeacherComponent,
  EducationEditingComponent,
  AlumniManagementPageComponent,
  CreateEditAlumniComponent,
  AlumniManagementComponent,
  EnsemblesCreatingComponent,
  DocumentsManagementPageComponent,
  GalleryPageComponent,
  AlbumCreatingComponent,
  ApplicationsComponent,
  LaureatesPageComponent,
  CreateEditLaureateComponent,
  LaureatesManagementPageComponent
} from './components';
import { UserCreateGuard } from './guards/create-user.guard';
import { SaveFormGuard } from './guards/save-form.guard';
import {
  NewsComponent,
  NewsPreviewComponent,
  DepartmentsPreviewComponent,
  EventsComponent,
  EventsContentPreviewComponent,
  DepartmentsComponent,
  EnsemblesComponent,
  EnsemblesPreviewComponent,
  AlbumsComponent,
  EducationComponent,
  EducationPreviewComponent
} from '../mscommon-module/components';

const adminRoutes: Routes = [
  {
    path: '',
    component: InitialPageComponent,
    children: [
      // {
      //   path: 'personal-account',
      //   data: { breadcrumb: 'personal account' },
      //   component: PersonalAccountComponent,
      // },
      {
        path: 'gallery',
        data: {
          breadcrumb: 'gallery',
          extended: true
        },
        component: GalleryPageComponent,
        children: [
          {
            path: 'album-creation',
            data: { breadcrumb: 'album creation' },
            component: AlbumCreatingComponent,
            canDeactivate: [ SaveFormGuard ]
          },
          { path: '', component: AlbumsComponent },
          {
            path: ':id',
            data: { breadcrumb: 'album editing', id: ':id' },
            component: AlbumCreatingComponent,
            canDeactivate: [ SaveFormGuard ]
          }
        ]
      },
      {
        path: 'news',
        component: NewsComponent,
        data: {
          breadcrumb: 'news',
          extended: true
        },
        children: [
          {
            path: 'news-creation',
            data: { breadcrumb: 'news creation' },
            component: NewsItemCreatingComponent,
            canDeactivate: [ SaveFormGuard ]
          },
          { path: '', component: NewsPreviewComponent },
          {
            path: ':id',
            data: { breadcrumb: 'news editing', id: ':id' },
            component: NewsItemCreatingComponent,
            canDeactivate: [ SaveFormGuard ]
          }
        ]
      },
      {
        path: 'events',
        component: EventsComponent,
        data: {
          breadcrumb: 'events',
          extended: true
        },
        children: [
          {
            path: 'events-creation',
            data: { breadcrumb: 'events creation' },
            component: EventCreatingComponent,
            canDeactivate: [ SaveFormGuard ]
          },
          { path: '', component: EventsContentPreviewComponent },
          {
            path: ':id',
            data: { breadcrumb: 'event editing', id: ':id' },
            component: EventCreatingComponent,
            canDeactivate: [ SaveFormGuard ]
          }
        ]
      },
      {
        path: 'events-creation',
        data: { breadcrumb: 'events creation' },
        component: EventCreatingComponent,
        canDeactivate: [ SaveFormGuard ]
      },
      {
        path: 'history',
        component: HistoryPageComponent,
        data: {
          breadcrumb: 'history',
          extended: true
        },
        canDeactivate: [ SaveFormGuard ]
      },
      {
        path: 'admission-rules',
        data: { breadcrumb: 'admission rules' },
        component: AdmissionRulesComponent,
        canDeactivate: [ SaveFormGuard ]
      },
      {
        path: 'about-us',
        data: { breadcrumb: 'about school' },
        component: DocumentsManagementPageComponent,
        canDeactivate: [ SaveFormGuard ]
      },
      {
        path: 'departments',
        component: DepartmentsComponent,
        data: {
          breadcrumb: 'departments',
          extended: true
        },
        children: [
          {
            path: 'department-creation',
            data: { breadcrumb: 'department creation' },
            component: DepartmentCreatingComponent,
            canDeactivate: [ SaveFormGuard ]
          },
          { path: '', component: DepartmentsPreviewComponent },
          {
            path: ':id',
            data: { breadcrumb: 'department editing', id: ':id' },
            component: DepartmentCreatingComponent,
            canDeactivate: [ SaveFormGuard ]
          }
        ]
      },
      {
        path: 'teachers-management',
        component: TeacherManagementPageComponent,
        data: {
          breadcrumb: 'teachers management',
        },
        children: [
          {
            path: 'teacher-creation',
            data: { breadcrumb: 'teacher creation', },
            component: CreateEditTeacherComponent,
            canDeactivate: [ SaveFormGuard ]
          },
          { path: '', component: TeacherManagementComponent },
          {
            path: ':id',
            data: { breadcrumb: 'teacher editing', id: ':id', extended: true },
            component: CreateEditTeacherComponent,
            canDeactivate: [ SaveFormGuard ]
          }
        ]
      },
      {
        path: 'education',
        component: EducationComponent,
        data: {
          breadcrumb: 'education',
          extended: true
        },
        children: [
          { path: '',
            component: EducationPreviewComponent
          },
          {
            path: ':id',
            data: { breadcrumb: 'education editing', id: ':id' },
            component: EducationEditingComponent,
            canDeactivate: [ SaveFormGuard ]
          }
        ]
      },
      {
        path: 'alumni-management',
        component: AlumniManagementPageComponent,
        data: {
          breadcrumb: 'alumni management',
          extended: true
        },
        children: [
          {
            path: 'alumni-creation',
            data: { breadcrumb: 'alumni creation' },
            component: CreateEditAlumniComponent,
            canDeactivate: [ SaveFormGuard ]
          },
          { path: '',
            component: AlumniManagementComponent
          },
          {
            path: ':id',
            data: {
              breadcrumb: 'alumni editing',
              id: ':id',
            },
            component: CreateEditAlumniComponent,
            canDeactivate: [ SaveFormGuard ]
          }
        ]
      },
      {
        path: 'laureates-management',
        component: LaureatesManagementPageComponent,
        data: {
          breadcrumb: 'laureates',
          extended: true
        },
        children: [
          {
            path: 'laureates-creation',
            data: { breadcrumb: 'laureates creation' },
            component: CreateEditLaureateComponent,
            canDeactivate: [ SaveFormGuard ]
          },
          { path: '',
            component: LaureatesPageComponent
          },
          {
            path: ':id',
            data: {
              breadcrumb: 'laureates editing',
              id: ':id',
            },
            component: CreateEditLaureateComponent,
            canDeactivate: [ SaveFormGuard ]
          }
        ]
      },
      {
        path: 'create-user',
        data: { breadcrumb: 'create user' },
        component: CreateUserComponent,
        canActivate: [ UserCreateGuard ],
        canDeactivate: [ SaveFormGuard ]
      },
      {
        path: 'ensembles',
        component: EnsemblesComponent,
        data: {
          breadcrumb: 'ensembles',
          extended: true
        },
        children: [
          {
            path: 'ensembles-creation',
            data: { breadcrumb: 'ensemble creation' },
            component: EnsemblesCreatingComponent,
            canDeactivate: [ SaveFormGuard ]
          },
          { path: '', component: EnsemblesPreviewComponent },
          {
            path: ':id',
            data: { breadcrumb: 'ensemble editing', id: ':id' },
            component: EnsemblesCreatingComponent,
            canDeactivate: [ SaveFormGuard ]
          }
        ]
      },
      {
        path: 'user-management',
        canActivate: [ UserCreateGuard ],
        component: UserManagementPageComponent,
        data: { breadcrumb: 'user-management'
      },
        children: [
          {
            path: '',
            component: UserManagementComponent
          },
          {
            path: 'edit',
            data: { breadcrumb: 'user-editing' },
            component: EditUserComponent,
            canDeactivate: [ SaveFormGuard ]
          }
        ]
      },
      {
        path: 'applications',
        canActivate: [UserCreateGuard],
        component: ApplicationsComponent,
        data: {
          breadcrumb: 'applications'
        }
      },
    ]
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule { }

export const routingComponents = [
  InitialPageComponent,
  NewsItemCreatingComponent,
  CreateUserComponent,
  EventCreatingComponent,
  UserManagementComponent,
  AdmissionRulesComponent,
  EditUserComponent,
  UserManagementPageComponent,
  DepartmentCreatingComponent,
  EducationEditingComponent
];
