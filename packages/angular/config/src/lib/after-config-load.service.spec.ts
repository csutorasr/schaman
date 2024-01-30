import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ConfigModuleConfiguration } from './configuration.token';
import { provideHttpClient } from '@angular/common/http';
import {
  AFTER_CONFIG_LOAD,
  AfterConfigLoadService,
} from './after-config-load.service';
import { ConfigModule } from './config.module';
import { ApplicationInitStatus } from '@angular/core';

describe('AfterConfigLoadService', () => {
  const setup = (
    testProviders: any[],
    configuration?: Partial<ConfigModuleConfiguration>,
  ) => {
    const localConfiguration: ConfigModuleConfiguration = {
      configPath: 'assets/config.json',
      loadConfig: true,
      retry: 3,
      runAsAppInitializer: false,
      ...configuration,
    };
    TestBed.configureTestingModule({
      imports: [ConfigModule.forRoot(localConfiguration)],
      providers: [
        ConfigService,
        AfterConfigLoadService,
        provideHttpClient(),
        provideHttpClientTesting(),
        ...testProviders,
      ],
    });
  };

  it('should run provider after config is loaded if runAsAppInitializer is true', async () => {
    const trackingFn = jest.fn();
    setup(
      [
        {
          provide: AFTER_CONFIG_LOAD,
          multi: true,
          useFactory: () => () => {
            trackingFn();
          },
        },
      ],
      {
        loadConfig: true,
        runAsAppInitializer: true,
      },
    );

    const httpTestingController = TestBed.inject(HttpTestingController);
    httpTestingController.expectOne('assets/config.json').flush({
      test: true,
    });
    await TestBed.inject(ApplicationInitStatus).donePromise;
    await TestBed.inject(AfterConfigLoadService).donePromise;
    expect(trackingFn).toHaveBeenCalledTimes(1);
  });
});
