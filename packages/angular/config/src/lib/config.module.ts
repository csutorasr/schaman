import { APP_INITIALIZER, NgModule, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from './config.service';
import {
  CONFIGURATION,
  ConfigModuleConfiguration,
} from './configuration.token';
import { AfterConfigLoadService } from './after-config-load.service';

@NgModule({})
export class ConfigModule {
  private readonly configService = inject(ConfigService);
  public static forRoot({
    configPath,
    loadConfig,
    retry,
    runAsAppInitializer,
  }: Partial<ConfigModuleConfiguration> = {}) {
    return {
      ngModule: ConfigModule,
      providers: [
        ConfigService,
        AfterConfigLoadService,
        {
          provide: CONFIGURATION,
          useValue: {
            configPath: configPath ?? 'assets/config.json',
            loadConfig: loadConfig ?? true,
            retry: retry ?? 3,
            runAsAppInitializer: runAsAppInitializer ?? false,
          } satisfies ConfigModuleConfiguration,
        },
        ...(runAsAppInitializer
          ? [
              {
                provide: APP_INITIALIZER,
                useFactory: (configService: ConfigService<unknown>) => () =>
                  configService.loadConfig(),
                multi: true,
                deps: [ConfigService],
              },
              {
                provide: APP_INITIALIZER,
                useFactory: (
                  configService: ConfigService<unknown>,
                  afterConfigLoadService: AfterConfigLoadService,
                ) => {
                  return () =>
                    firstValueFrom(configService.afterConfigLoad$).then(() => {
                      afterConfigLoadService.runAfterConfigLoadProviders();

                      return afterConfigLoadService.donePromise;
                    });
                },
                deps: [ConfigService, AfterConfigLoadService],
                multi: true,
              },
            ]
          : []),
      ],
    };
  }
}

export { ConfigService, ConfigModuleConfiguration };
