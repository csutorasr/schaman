import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BreadcrumbElement } from './breadcrumb.interface';

@Injectable()
export class BreadcrumbService {
  private readonly breadcrumbs = new BehaviorSubject<BreadcrumbElement[]>([]);
  public breadcrumbs$ = this.breadcrumbs.asObservable();

  public addBreadcrumb(breadcrumb: BreadcrumbElement) {
    const breadcrumbs = [...this.breadcrumbs.value, breadcrumb];
    const orderedBreadcrumbs: BreadcrumbElement[] = [];
    const firstIndex = breadcrumbs.findIndex((b) => !b.orderService.parent);
    orderedBreadcrumbs.push(...breadcrumbs.splice(firstIndex, 1));
    while (breadcrumbs.length > 0) {
      const index = breadcrumbs.findIndex(
        (b) =>
          b.orderService.parent ===
          orderedBreadcrumbs[orderedBreadcrumbs.length - 1].orderService
      );
      orderedBreadcrumbs.push(...breadcrumbs.splice(index, 1));
    }
    this.breadcrumbs.next(orderedBreadcrumbs);
  }

  public removeBreadcrumb(breadcrumb: BreadcrumbElement) {
    this.breadcrumbs.next(
      this.breadcrumbs.value.filter((b) => b !== breadcrumb)
    );
  }
}
