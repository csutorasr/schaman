# @schaman/angular-router-params

Get router parameters in the easiest way.

Provide, inject and use the service.

```typescript
@Component({
  /* ... */
  providers: [SchamanRouterParams],
})
class ExampleComponent {
  public id$ = this.routerParams.id$;
  public carId$ = this.routerParams['carId'];
  public constructor(private routerParams: SchamanRouterParams) {}
}
```

## Browser-compatibility

The library uses [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). See [compatibility](https://caniuse.com/proxy).

## Running unit tests

Run `nx test angular-router-params` to execute the unit tests.
