import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA,
         NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ConnectionBackend,
         RequestOptions,
         BaseRequestOptions,
         Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/of';
import {} from '@types/jasmine';
import { AllTeachersComponent } from './all-teachers.component';
import { DepartmentsService, TeachersService } from '../../../services/';
import { BreadcrumbsService } from '../../breadcrumbs/breadcrumbs.service';
import { LocalizatorService, ServerGetterService, SpinnerService, DetectBrowserService } from '../../../shared/services';
import { MockRouter, MockActivatedRoute } from '../../../shared/tests/mock-routes';
import { LocalizatorPipe } from '../../../shared/pipes';
import { ROUTE_DATA_BREADCRUMB, ROUTE_PARAM_BREADCRUMB } from '../../breadcrumbs/breadcrumbs.component';

const departmentsMock = {
  'data': [
    {
      'id': '83',
      'name': 'Вiддiл фортепiано',
      'description': 'Фортепіанний відділ очолює випускник школи, доцент НМАУ ІМ. П.І. Чайковського Сергій Рябов.',
      'img': 100,
      'head_id': '220'
    },
    {
      'id': '84',
      'name': 'Вiддiл cкрипки',
      'description': 'Вiддiл cкрипки',
      'img': 101,
      'head_id': '194'
    },
    {
      'id': '85',
      'name': 'Вiддiл струнних iнструментiв',
      'description': 'Вiддiл струнних iнструментiв',
      'img': 102,
      'head_id': '219'
    },
    {
      'id': '88',
      'name': 'Відділ камерної музики',
      'description': 'Відділ камерного та концертмейстерского класу є провідним відділом паралельно з виконавським.',
      'img': 105,
      'head_id': '228'
    }
  ],
  'total-count': 4
};

const teachersMock = {
  'data': [
    {
      'id': '220',
      'email': 'email@mymail.com',
      'about': 'Доцент кафедри спец, фортепіано НМАУ ім. П.І. Чайковського',
      'photo': '502',
      'firstName': 'С.',
      'lastName': 'Рябов',
      'departmentId': '83',
      'position': 'Голова'
    },
    {
      'id': '200',
      'email': 'email@mymail.com',
      'about': 'Заслужений працівник культури України, доцент кафедри спец, фортепіано НМАУ ім. П.І. Чайковського',
      'photo': '518',
      'firstName': 'Н.',
      'lastName': 'Гриднєва',
      'departmentId': '83'
    },
    {
      'id': '206',
      'email': 'email@mymail.com',
      'about': 'Викладач-методист',
      'photo': '515',
      'firstName': 'С.',
      'lastName': 'Рябова',
      'departmentId': '83'
    }
  ],
  'department': {
    'id': '83',
    'name': 'Вiддiл фортепiано',
    'description': 'Фортепіанний відділ очолює випускник школи, доцент НМАУ ІМ. П.І. Чайковського Сергій Рябов.',
    'img': 100,
    'head_id': '220'
  }
};

const dataMock = {
  departmentsMock,
  teachersMock
};

describe('AllTeachersComponent', () => {
  let component: AllTeachersComponent;
  let fixture: ComponentFixture<AllTeachersComponent>;
  let routerMock: MockRouter;
  let departmentsServiceMock;
  let breadcrumbsService: BreadcrumbsService;
  let localizatorService: LocalizatorService;
  let serverGetterService: ServerGetterService;
  let mockActivatedRoute: any;

  beforeEach(async(() => {
    mockActivatedRoute = new MockActivatedRoute({ id: '1' });
    routerMock = new MockRouter();
    departmentsServiceMock = {
      departmentsWithTeachers : function() { return dataMock; }
    };

    TestBed.configureTestingModule({
      declarations: [
        AllTeachersComponent,
        LocalizatorPipe
      ],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ConnectionBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        { provide: DepartmentsService, useValue: departmentsServiceMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        ServerGetterService,
        Http,
        SpinnerService,
        LocalizatorService,
        BreadcrumbsService,
        DetectBrowserService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTeachersComponent);
    component = fixture.componentInstance;
    localizatorService = TestBed.get(LocalizatorService);
    breadcrumbsService = TestBed.get(BreadcrumbsService);
    serverGetterService = TestBed.get(ServerGetterService);
  });


  it('should activate get data', () => {
    const result = component.getData({params: {id: 84}}, 'uk');
    expect(result).toBeTruthy();
  });


  it('should activate route with previous Id param', () => {
    component.previousDepartmentId = 88;
    const expectedResult = [`our-teachers/all-teachers/` + component.previousDepartmentId];
    component.getPreviousDepartment();
    expect( routerMock.navigate).toHaveBeenCalledWith(expectedResult);
  });


  it('should activate route with next Id param', () => {
    component.nextDepartmentId = 84;
    const expectedResult = [`our-teachers/all-teachers/` + component.nextDepartmentId];
    component.getNextDepartment();
    expect( routerMock.navigate).toHaveBeenCalledWith(expectedResult);
  });


  it('should get department id when index is in the end of departments array', () => {
    const index = departmentsMock['data'].length - 1;
    component.getNextDepartmentsIds(departmentsMock['data'][index], departmentsMock['data']);
    expect((component as any).nextDepartmentId).toEqual(departmentsMock['data'][0].id);
    expect((component as any).previousDepartmentId).toEqual(departmentsMock['data'][index - 1].id);
  });


  it('should get department id when index is in the middle of departments array', () => {
    const index = 1;
    component.getNextDepartmentsIds(departmentsMock['data'][index], departmentsMock['data']);
    expect((component as any).nextDepartmentId).toEqual(departmentsMock['data'][index + 1].id);
    expect((component as any).previousDepartmentId).toEqual(departmentsMock['data'][index - 1].id);
  });


  it('should get department id when index is first in departments array', () => {
    const length = departmentsMock['data'].length;
    component.getNextDepartmentsIds(departmentsMock['data'][0], departmentsMock['data']);
    expect((component as any).nextDepartmentId).toEqual(departmentsMock['data'][1].id);
    expect((component as any).previousDepartmentId).toEqual(departmentsMock['data'][length - 1].id);
  });

  it('should call routeNavigate in getNextDepartment', () => {
    const spy = routerMock.navigate;
    component.getNextDepartment();
    expect(spy).toHaveBeenCalled();
  });


  it('should call routeNavigate in getPreviousDepartment', () => {
    const spy = routerMock.navigate;
    component.getPreviousDepartment();
    expect(spy).toHaveBeenCalled();
  });

  it('should get next department id', () => {
    component.ngOnInit();
    component.getNextDepartmentsIds(departmentsMock.data[0], departmentsMock.data);
    expect(component.nextDepartmentId).toBe('84');
  });


  it('should call onDestroy', () => {
    component.ngOnInit();
    component.ngOnDestroy();
    expect(component.ngOnDestroy).toBeTruthy();
  });
});
