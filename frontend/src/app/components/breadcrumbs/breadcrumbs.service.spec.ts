import { TestBed, inject } from '@angular/core/testing';
import { BreadcrumbsService, PREFIX_BREADCRUMB } from './breadcrumbs.service';

const mockBreadcrumbs = [
  {
    label: 'home',
    params: {},
    url: '/'
  },
  {
    label: 'history',
    params: {},
    url: '/history'
  },
];
const mockBreadcrumbsLength = mockBreadcrumbs.length;

describe('BreadcrumbsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreadcrumbsService]
    });
  });

  it('should create breadcrumbs service', inject([BreadcrumbsService], (service: BreadcrumbsService) => {
    expect(service).toBeTruthy();
  }));

  it('should check if url is not unique', inject([BreadcrumbsService], (service: BreadcrumbsService) => {
    service.prefixedBreadcrumbs = mockBreadcrumbs;
    expect(service.checkUnique(mockBreadcrumbs[1])).toBeFalsy();
  }));

  it('should check if url is unique', inject([BreadcrumbsService], (service: BreadcrumbsService) => {
    service.prefixedBreadcrumbs = mockBreadcrumbs;
    expect(service.checkUnique({
      label: 'video',
      params: {},
      url: '/video'
    })).toBeTruthy();
  }));

  it('should not add new breadcrumb', inject([BreadcrumbsService], (service: BreadcrumbsService) => {
    service.prefixedBreadcrumbs = mockBreadcrumbs;
    service.storeIfUnique(mockBreadcrumbs[1]);
    expect(service.prefixedBreadcrumbs.length !== mockBreadcrumbsLength).toBeFalsy();
  }));

  it('should add new breadcrumb', inject([BreadcrumbsService], (service: BreadcrumbsService) => {
    service.prefixedBreadcrumbs = mockBreadcrumbs;
    service.storeIfUnique({
      label: 'video',
      params: {},
      url: '/video'
    });
    expect(service.prefixedBreadcrumbs.length !== mockBreadcrumbsLength).toBeTruthy();
  }));

  it('should set breadcrumbs in localStorage', inject([BreadcrumbsService], (service: BreadcrumbsService) => {
    localStorage.clear();
    expect(localStorage.getItem(PREFIX_BREADCRUMB)).toBeFalsy();
  }));

  it('should set breadcrumbs in localStorage', inject([BreadcrumbsService], (service: BreadcrumbsService) => {
    localStorage.clear();
    service.storePrefixed({
      label: 'video',
      params: {},
      url: '/video'
    });
    expect(localStorage.getItem(PREFIX_BREADCRUMB)).toBeTruthy();
  }));

});
