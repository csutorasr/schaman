import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';

@Component({
  selector: 'schaman-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  @Input() public separator?: TemplateRef<{index: number}>;
  public readonly breadcrumbs$ = this.service.breadcrumbs$;
  public constructor(private readonly service: BreadcrumbService) {}
}
