import { TestBed } from '@angular/core/testing';
import { SchamanBreadcrumbModule } from './angular-breadcrumb.module';

import { BreadcrumbService } from './breadcrumb.service';

describe('BreadcrumbService', () => {
  let service: BreadcrumbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SchamanBreadcrumbModule.forRoot()],
    });
    service = TestBed.inject(BreadcrumbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store breadcrumbs', () => {
    const element = {
      orderService: {},
    };
    service.addBreadcrumb(element as any);
    service.breadcrumbs$.subscribe((breadcrumbs) => {
      expect(breadcrumbs).toEqual([element]);
    });
  });

  it('should order breadcrumbs', () => {
    const element = {
      orderService: {},
    };
    const childElement = {
      orderService: {
        parent: element.orderService,
      },
    };
    service.addBreadcrumb(childElement as any);
    service.addBreadcrumb(element as any);
    service.breadcrumbs$.subscribe((breadcrumbs) => {
      expect(breadcrumbs).toEqual([element, childElement]);
    });
  });

  it('should remove breadcrumbs', () => {
    const element = {
      orderService: {},
    };
    const childElement = {
      orderService: {
        parent: element.orderService,
      },
    };
    service.addBreadcrumb(childElement as any);
    service.addBreadcrumb(element as any);
    service.removeBreadcrumb(childElement as any);
    service.breadcrumbs$.subscribe((breadcrumbs) => {
      expect(breadcrumbs).toEqual([element]);
    });
  });
});
