import { TemplateRef } from '@angular/core';
import { BreadcrumbOrderService } from './breadcrumb-order.service';

export interface BreadcrumbElement {
  orderService: BreadcrumbOrderService;
  template: TemplateRef<unknown>;
}
