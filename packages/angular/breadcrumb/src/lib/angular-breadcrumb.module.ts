import { ModuleWithProviders, NgModule } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';
import { BreadcrumbDirective } from './breadcrumb.directive';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BreadcrumbOrderService } from './breadcrumb-order.service';

@NgModule({
  imports: [BreadcrumbDirective, BreadcrumbComponent],
  exports: [BreadcrumbDirective, BreadcrumbComponent],
})
export class SchamanBreadcrumbModule {
  public static forRoot(): ModuleWithProviders<SchamanBreadcrumbModule> {
    return {
      ngModule: SchamanBreadcrumbModule,
      providers: [BreadcrumbService],
    };
  }
}

export { BreadcrumbDirective, BreadcrumbComponent, BreadcrumbOrderService };
