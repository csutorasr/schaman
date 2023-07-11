import { TestBed } from '@angular/core/testing';
import { BreadcrumbDirective } from './breadcrumb.directive';
import { BreadcrumbService } from './breadcrumb.service';
import { TemplateRef } from '@angular/core';
import { BreadcrumbOrderService } from './breadcrumb-order.service';

describe('BreadcrumbDirective', () => {
  let service: {
    addBreadcrumb: jest.Mock<any, any>;
    removeBreadcrumb: jest.Mock<any, any>;
  };
  beforeEach(() => {
    service = { addBreadcrumb: jest.fn(), removeBreadcrumb: jest.fn() };
    TestBed.configureTestingModule({
      providers: [
        { provide: BreadcrumbService, useValue: service },
        { provide: TemplateRef, useValue: {} },
        { provide: BreadcrumbOrderService, useValue: {} },
        BreadcrumbDirective,
      ],
    });
  });

  it('should create an instance', () => {
    const directive = TestBed.inject(BreadcrumbDirective);
    expect(directive).toBeTruthy();
  });
  it('should call add on creation', () => {
    const directive = TestBed.inject(BreadcrumbDirective);
    expect(service.addBreadcrumb).toHaveBeenCalledWith(directive);
  });
  it('should call remove on destroy', () => {
    const directive = TestBed.inject(BreadcrumbDirective);
    directive.ngOnDestroy();
    expect(service.removeBreadcrumb).toHaveBeenCalledWith(directive);
  });
});
