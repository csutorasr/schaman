# @schaman/angular-config

This module provides configuration functionality. If you want to use the same built code for different environments, you can use this module to provide different configuration for each environment. This is the III. factor of the [Twelve-Factor App](https://12factor.net/config).

## Features

- [x] Provide configuration for different environments
- [x] Retry loading configuration
- [x] Guard for loading configuration
- [x] Signal support
- [x] RxJS support
- [ ] Pass configuration without load during SSR

## Installation

```bash
npm install @schaman/angular-config
```

## Usage

Provide the configuration in the `assets/config.json`.

```json
{
  "backendUrl": "https://api.example.com"
}
```

Import the `ConfigModule` in your `AppModule` and provide the path to the configuration file.

```typescript
import { ConfigModule } from '@schaman/angular-config';

@NgModule({
  imports: [ConfigModule.forRoot()],
})
export class AppModule {}
```

Inject the `ConfigService` in your component and use it.

```typescript
import { ConfigService } from '@schaman/angular-config';

@Component({
  selector: 'app-root',
  template: ` <p>Backend URL: {{ config().backendUrl }}</p> `,
})
export class AppComponent {
  public readonly config = inject(ConfigService).config;
}
```

### Standalone component

If you want to use the `ConfigService` in a standalone component, you have to import the `ConfigModule` in the component module.

```typescript
import { ConfigModule } from '@schaman/angular-config';

@Component({
  selector: 'app-root',
  template: ` <p>Backend URL: {{ config().backendUrl }}</p> `,
  imports: [ConfigModule.forRoot()],
})
export class AppComponent {
  public readonly config = inject(ConfigService).config;
}
```

## Configuration

The `ConfigModule` can be configured with the following options:

```typescript
interface ConfigModuleOptions {
  /**
   * Number of retries when loading the config file.
   * @default 3
   */
  retry: number;
  /**
   * Path to the config file.
   */
  configPath: string;
  /**
   * If true, the config will be loaded when the module is imported.
   * @default true
   */
  loadConfig: boolean;
  /**
   * If true, the config will be loaded when the app is initialized.
   * @default false
   */
  runAsAppInitializer: boolean;
}
```

### Wait for config during app initialization

If you want to wait for the config to be loaded before the app is initialized, you can use the `runAsAppInitializer` option.

```typescript
import { ConfigModule } from '@schaman/angular-config';

@NgModule({
  imports: [ConfigModule.forRoot({ runAsAppInitializer: true })],
})
export class AppModule {}
```

If you need the config in your app initializer, you can inject the `ConfigService` and use the `afterConfigLoad$` observable.

```typescript
import { ConfigService } from '@schaman/angular-config';

@NgModule({
  imports: [ConfigModule.forRoot({ runAsAppInitializer: true })],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => () =>
        configService.afterConfigLoad$.pipe(
          tap((config) => {
            /* use config here */
          }),
        ),
      deps: [ConfigService],
    },
  ],
})
export class AppModule {}
```

If you would like to execute code after the config is loaded, you can use the `AFTER_CONFIG_LOAD` provider token just like the `APP_INITIALIZER`.
Note: `runAsAppInitializer` must be set to `true` for this to work.

```typescript
providers: [
  {
    provide: AFTER_CONFIG_LOAD,
    useFactory: (store: Store) => () => store.dispatch(loadProfile())
    deps: [Store],
  },
],
```

### Configure your generated backend base url

If you generate the backend using [openapi-generator](https://github.com/OpenAPITools/openapi-generator) then provide the values like this:

```typescript
import { ConfigModule } from '@schaman/angular-config';
import { ApiConfiguration } from 'your-data-package';

@NgModule({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: ApiConfiguration,
      useFactory: (configService: ConfigService): ApiConfiguration => {
        const configuration = new ApiConfiguration();
        configService.afterConfigLoad$.subscribe((config) => (configuration.basePath = config.backendUrl));
        return configuration;
      },
      deps: [ConfigService],
    },
  ],
})
export class AppModule {}
```

### Use as guard

If not all routes should be available before the config is loaded, you can use the `configLoadedGuard`.

```typescript
import { configLoadedGuard } from '@schaman/angular-config';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    canActivate: [configLoadedGuard],
    component: LoginComponent,
  },
];
```

## Best Practices

If you have the interface defined in your code, then you can skip the Template parameter.

```typescript
import { ConfigService } from '@schaman/angular-config';
import { computed } from '@angular/core';

interface Config {
  backendUrl: string;
}

@Injectable()
export class MyConfigService {
  private readonly configService = inject<ConfigService<Config>>(ConfigService);
  public readonly config = this.configService.config;
  public readonly config$ = this.configService.config$;
  public readonly afterConfigLoad$ = this.configService.afterConfigLoad$;
  // Computed signals can be added here, also.
  public readonly backendUrl = computed(() => this.configService.config().backendUrl);
  // Or RxJS operators
  public readonly backendUrl$ = this.configService.config$.pipe(map((config) => config.backendUrl));
}
```

And provide it in your app module.

```typescript
import { ConfigModule } from '@schaman/angular-config';
import { MyConfigService } from './my-config.service';

@NgModule({
  imports: [ConfigModule.forRoot()],
  providers: [MyConfigService],
})
export class AppModule {}
```
