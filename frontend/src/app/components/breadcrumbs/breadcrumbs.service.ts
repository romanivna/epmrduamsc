import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export const PREFIX_BREADCRUMB = 'prefixBreadcrumb';

@Injectable()
export class BreadcrumbsService {
  public prefixedBreadcrumbs = [];
  public breadcrumbs = [];
  private breadcrumbsSource = new Subject();
  private breadcrumbsChanged$ = this.breadcrumbsSource.asObservable();

  public store(breadcrumbs) {
    this.breadcrumbs = breadcrumbs;
    const allBreadcrumbs = this.prefixedBreadcrumbs.concat(this.breadcrumbs);
    this.breadcrumbsSource.next(allBreadcrumbs);
  };

  public storePrefixed(breadcrumb) {
    this.storeIfUnique(breadcrumb);
    localStorage.setItem(PREFIX_BREADCRUMB, JSON.stringify(this.prefixedBreadcrumbs));
    const allBreadcrumbs = this.prefixedBreadcrumbs.concat(this.breadcrumbs);
    this.breadcrumbsSource.next(allBreadcrumbs);
  };

  public get() {
    return this.breadcrumbsChanged$;
  };

  public storeIfUnique(newBreadcrumb) {
    if (this.checkUnique(newBreadcrumb)) {
      this.prefixedBreadcrumbs.push(newBreadcrumb);
    }
  };

  public checkUnique(newBreadcrumb) {
    return this.prefixedBreadcrumbs.every( crumb => newBreadcrumb.url !== crumb.url );
  }

  // if breadcrumb is an id of element we clear it in breadcrumbs.conpomnent and than set it to title of element
  public setBreadcrumbToItemName(title): void {
    this.breadcrumbs[this.breadcrumbs.length - 1].label = title;
  }
}
