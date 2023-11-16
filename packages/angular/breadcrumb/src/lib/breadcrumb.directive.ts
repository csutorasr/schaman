import { Directive, OnDestroy, TemplateRef, inject } from '@angular/core';
import { BreadcrumbOrderService } from './breadcrumb-order.service';
import { BreadcrumbElement } from './breadcrumb.interface';
import { BreadcrumbService } from './breadcrumb.service';

interface BreadcrumbContext {
  last: boolean;
  index: number;
}

@Directive({
  selector: '[schamanBreadcrumb]',
  standalone: true,
})
export class BreadcrumbDirective implements BreadcrumbElement, OnDestroy {
  public readonly template = inject(TemplateRef);
  public readonly orderService = inject(BreadcrumbOrderService);
  public readonly service = inject(BreadcrumbService);
  static ngTemplateContextGuard(
    directive: BreadcrumbDirective,
    context: unknown,
  ): context is BreadcrumbContext {
    return true;
  }

  public constructor() {
    this.service.addBreadcrumb(this);
  }
  public ngOnDestroy(): void {
    this.service.removeBreadcrumb(this);
  }
}
