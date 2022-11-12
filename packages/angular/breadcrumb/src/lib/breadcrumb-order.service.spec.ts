import { TestBed } from '@angular/core/testing';

import { BreadcrumbOrderService } from './breadcrumb-order.service';

describe('BreadcrumbOrderService', () => {
  let service: BreadcrumbOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreadcrumbOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
