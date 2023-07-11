import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  inject,
} from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { AsyncPipe, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'schaman-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgForOf, NgTemplateOutlet, AsyncPipe],
})
export class BreadcrumbComponent {
  private readonly service = inject(BreadcrumbService);
  @Input() public separator?: TemplateRef<{ index: number }>;
  public readonly breadcrumbs$ = this.service.breadcrumbs$;
}
