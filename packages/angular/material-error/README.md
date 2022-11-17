# @schaman/angular-material-error

Adding every form error in your application is boilerplate.

## Setup

Import the `SchamanMaterialErrorModule`.

Provide your own `ErrorMessageProvider` to use your own messages. Pro-tip: inject other translator services.

```typescript
@Injectable()
export class MyFancyErrorMessageProvider extends ErrorMessageProvider {
  public constructor(private readonly translateService: TranslateService) {
    super();
  }
  public getErrorMessagesFor(errors: ValidationErrors): string {
    if (errors.required) {
      return this.translateService.get('ERROR.REQUIRED');
    }
    if (errors.pattern) {
      if (errors.requiredPattern === emailPattern) {
        return this.translateService.get('ERROR.EMAIL_PATTERN');
      }
      return this.translateService.get('ERROR.UNKNOWN_PATTERN');
    }
    return this.translateService.get('ERROR.UNKNOWN');
  }
}
```

```typescript
@NgModule({
  providers: [
    {
      provide: ErrorMessageProvider,
      useClass: MyFancyErrorMessageProvider,
    },
  ],
})
export class Module {}
```

In your component use the `*schamanDynamicError` directive:

```typescript
@Component({
  template: `<mat-form-field>
    <input matInput [formControl]="formControl" />
    <mat-error *schamanDynamicError></mat-error>
  </mat-form-field>`,
})
class DirectiveTestComponent {
  formControl = new FormControl('', Validators.required);
}
```

This will add and remove the error text if needed. (On state change or form submit.)

## Overrides

You can also add a custom `ErrorMessageProvider` on component level to override the translations in a single component.

```typescript
@Component({
  /* ... */
  providers: [
    {
      provide: ErrorMessageProvider,
      useClass: MyFancierErrorMessageProvider,
    },
  ],
})
export class FancierComponent {}
```

## Running unit tests

Run `nx test angular-material-error` to execute the unit tests.
