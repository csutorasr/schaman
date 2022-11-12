import { Inject, Injectable, Optional, SkipSelf } from '@angular/core';

@Injectable()
export class BreadcrumbOrderService {
  public constructor(
    @SkipSelf()
    @Optional()
    @Inject(BreadcrumbOrderService)
    public readonly parent?: BreadcrumbOrderService
  ) {}
}
