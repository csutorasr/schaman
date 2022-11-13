# @schaman/angular-breadcrumb

This module provides custom breadcrumb functionality. To use the module do 3 easy steps.

Provide the module for root.

```typescript
SchamanBreadcrumbModule.forRoot();
```

Inject the order service on component level in your page. This will control the order of the breadcrumbs. Also use the `*schamanBreadcrumb` structural directive.

```typescript
@Component({
  template: `<a *schamanBreadcrumb routerLink="Homepage">Homepage</a>`,
  selector: 'test-1',
  providers: [BreadcrumbOrderService],
})
class RouterPageComponent {}
```

Use the breadcrumb anywhere.

```typescript
@Component({
  template: `
    <schaman-breadcrumb [separator]="sep"></schaman-breadcrumb>
    <ng-template #sep let-i="index">&gt;</ng-template>
    <router-outlet></router-outlet>
  `,
})
class LayoutComponent {}
```

## Running unit tests

Run `nx test angular-breadcrumb` to execute the unit tests.
