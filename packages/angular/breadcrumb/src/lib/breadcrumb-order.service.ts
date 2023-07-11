import { Injectable, inject } from '@angular/core';

@Injectable()
export class BreadcrumbOrderService {
  public readonly parent = inject(BreadcrumbOrderService, {
    skipSelf: true,
    optional: true,
  });
}
