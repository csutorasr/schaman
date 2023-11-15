import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ConfigService } from './config.service';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  CONFIGURATION,
  ConfigModuleConfiguration,
} from './configuration.token';
import { provideHttpClient } from '@angular/common/http';

describe('ConfigService', () => {
  let service: ConfigService<object>;
  const setup = (configuration?: Partial<ConfigModuleConfiguration>) => {
    const localConfiguration: ConfigModuleConfiguration = {
      configPath: 'assets/config.json',
      loadConfig: true,
      retry: 3,
      runAsAppInitializer: false,
      ...configuration,
    };
    TestBed.configureTestingModule({
      providers: [
        ConfigService,
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: CONFIGURATION,
          useValue: localConfiguration,
        },
      ],
    });
    service = TestBed.inject(ConfigService);
  };
  it('should be defined', () => {
    setup();
    expect(service).toBeTruthy();
  });

  it('should load config by default', fakeAsync(() => {
    setup({
      loadConfig: true,
    });
    const httpTestingController = TestBed.inject(HttpTestingController);
    httpTestingController.expectOne('assets/config.json').flush({
      test: true,
    });
    tick();
    expect(service.config()).toEqual({
      test: true,
    });
  }));

  it('should not load config if loadConfig is false', fakeAsync(() => {
    setup({
      loadConfig: false,
    });
    const httpTestingController = TestBed.inject(HttpTestingController);
    httpTestingController.expectNone('assets/config.json');
    tick();
    expect(service.config()).toBeUndefined();
  }));

  it('should load config if loadConfig is false and loadConfig is called', fakeAsync(() => {
    setup({
      loadConfig: false,
    });
    const httpTestingController = TestBed.inject(HttpTestingController);
    httpTestingController.expectNone('assets/config.json');
    tick();
    expect(service.config()).toBeUndefined();
    service.loadConfig();
    httpTestingController.expectOne('assets/config.json').flush({
      test: true,
    });
    tick();
    expect(service.config()).toEqual({
      test: true,
    });
  }));

  it('should load config as an awaitable', async () => {
    setup({
      loadConfig: false,
    });
    const httpTestingController = TestBed.inject(HttpTestingController);
    httpTestingController.expectNone('assets/config.json');
    expect(service.config()).toBeUndefined();
    const promise = service.loadConfig();
    httpTestingController.expectOne('assets/config.json').flush({
      test: true,
    });
    expect(await promise).toEqual({
      test: true,
    });
  });

  it('should retry 3 times', fakeAsync(() => {
    setup({
      retry: 3,
    });
    const httpTestingController = TestBed.inject(HttpTestingController);
    httpTestingController
      .expectOne('assets/config.json')
      .flush({}, { status: 404, statusText: 'Not Found' });
    httpTestingController
      .expectOne('assets/config.json')
      .flush({}, { status: 404, statusText: 'Not Found' });
    httpTestingController
      .expectOne('assets/config.json')
      .flush({}, { status: 404, statusText: 'Not Found' });
    httpTestingController.expectOne('assets/config.json').flush({
      test: true,
    });
    tick();
    expect(service.config()).toEqual({
      test: true,
    });
  }));

  it('should retry 3 times and then fail', fakeAsync(() => {
    setup({
      retry: 3,
    });
    const httpTestingController = TestBed.inject(HttpTestingController);
    httpTestingController
      .expectOne('assets/config.json')
      .flush({}, { status: 404, statusText: 'Not Found' });
    httpTestingController
      .expectOne('assets/config.json')
      .flush({}, { status: 404, statusText: 'Not Found' });
    httpTestingController
      .expectOne('assets/config.json')
      .flush({}, { status: 404, statusText: 'Not Found' });
    httpTestingController
      .expectOne('assets/config.json')
      .flush({}, { status: 404, statusText: 'Not Found' });
    expect(tick).toThrow();
  }));

  it('should set the config as an observable', fakeAsync(() => {
    setup({
      loadConfig: true,
    });
    const httpTestingController = TestBed.inject(HttpTestingController);
    httpTestingController.expectOne('assets/config.json').flush({
      test: true,
    });
    service.config$
      .subscribe((config) => {
        expect(config).toBeUndefined();
      })
      .unsubscribe();
    tick();
    service.config$
      .subscribe((config) => {
        expect(config).toEqual({
          test: true,
        });
      })
      .unsubscribe();
    expect.assertions(2);
  }));

  it('should call afterConfigLoad$ once when config is loaded', fakeAsync(() => {
    setup({
      loadConfig: true,
    });
    const httpTestingController = TestBed.inject(HttpTestingController);
    httpTestingController.expectOne('assets/config.json').flush({
      test: true,
    });
    service.afterConfigLoad$.subscribe((config) => {
      expect(config).toEqual({
        test: true,
      });
    });
    tick();
    expect.assertions(1);
  }));

  it('should not call afterConfigLoad$ if config is not loaded', fakeAsync(() => {
    setup({
      loadConfig: false,
    });
    const subscriber = jest.fn();
    service.afterConfigLoad$.subscribe(subscriber);
    tick();
    expect(subscriber).not.toHaveBeenCalled();
  }));

  it('should pass the right url to the http client', fakeAsync(() => {
    setup({
      loadConfig: true,
      configPath: 'assets/config2.json',
    });
    const httpTestingController = TestBed.inject(HttpTestingController);
    httpTestingController.expectOne('assets/config2.json').flush({
      test: true,
    });
    tick();
    expect(service.config()).toEqual({
      test: true,
    });
  }));

  it('should not load config if runAsAppInitializer is true', fakeAsync(() => {
    setup({
      loadConfig: true,
      runAsAppInitializer: true,
    });
    const httpTestingController = TestBed.inject(HttpTestingController);
    httpTestingController.expectNone('assets/config.json');
    tick();
    expect(service.config()).toBeUndefined();
  }));
});
