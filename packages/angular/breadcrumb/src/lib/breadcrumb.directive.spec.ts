import { BreadcrumbDirective } from './breadcrumb.directive';

describe('BreadcrumbDirective', () => {
  it('should create an instance', () => {
    const service = { addBreadcrumb: jest.fn(), removeBreadcrumb: jest.fn() };
    const directive = new BreadcrumbDirective({} as any, {} as any, service as any);
    expect(directive).toBeTruthy();
  });
  it('should call add on creation', () => {
    const service = { addBreadcrumb: jest.fn(), removeBreadcrumb: jest.fn() };
    const directive = new BreadcrumbDirective({} as any, {} as any, service as any);
    expect(service.addBreadcrumb).toHaveBeenCalledWith(directive);
  });
  it('should call remove on destory', () => {
    const service = { addBreadcrumb: jest.fn(), removeBreadcrumb: jest.fn() };
    const directive = new BreadcrumbDirective({} as any, {} as any, service as any);
    directive.ngOnDestroy();
    expect(service.removeBreadcrumb).toHaveBeenCalledWith(directive);
  });
});
