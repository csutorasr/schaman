import { Directive, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BreadcrumbOrderService } from './breadcrumb-order.service';
import { BreadcrumbElement } from './breadcrumb.interface';
import { BreadcrumbService } from './breadcrumb.service';

@Directive({
  selector: '[schamanBreadcrumb]',
})
export class BreadcrumbDirective implements BreadcrumbElement, OnDestroy {
  public constructor(
    public readonly template: TemplateRef<unknown>,
    public readonly orderService: BreadcrumbOrderService,
    public readonly service: BreadcrumbService
  ) {
    this.service.addBreadcrumb(this);
  }
  public ngOnDestroy(): void {
    this.service.removeBreadcrumb(this);
  }
}
