import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { ConfigModuleConfiguration } from './configuration.token';
import { configLoadedGuard } from './config-loaded.guard';
import { Observable } from 'rxjs';
import { ConfigModule } from './config.module';

describe('ConfigLoadedGuard', () => {
  const setup = (configuration?: Partial<ConfigModuleConfiguration>) => {
    const localConfiguration: ConfigModuleConfiguration = {
      configPath: 'assets/config.json',
      loadConfig: true,
      retry: 3,
      runAsAppInitializer: false,
      ...configuration,
    };
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
      imports: [ConfigModule.forRoot(localConfiguration)],
    });
  };
  it('should be defined', () => {
    setup();
    TestBed.runInInjectionContext(() => {
      expect(
        (configLoadedGuard as unknown as () => Observable<true>)(),
      ).toBeTruthy();
    });
    expect.assertions(1);
  });

  it('should return true if config is loaded', fakeAsync(() => {
    setup({
      loadConfig: true,
    });
    const httpTestingController = TestBed.inject(HttpTestingController);
    tick();
    httpTestingController.expectOne('assets/config.json').flush({
      test: true,
    });
    TestBed.runInInjectionContext(() => {
      (configLoadedGuard as unknown as () => Observable<true>)().subscribe(
        (result) => {
          expect(result).toBe(true);
        },
      );
    });
    expect.assertions(1);
  }));

  it('should not return if config is not loaded', fakeAsync(() => {
    setup({
      loadConfig: false,
    });
    const httpTestingController = TestBed.inject(HttpTestingController);
    tick();
    httpTestingController.expectNone('assets/config.json');
    const subscriber = jest.fn();
    TestBed.runInInjectionContext(() => {
      (configLoadedGuard as unknown as () => Observable<true>)().subscribe(
        subscriber,
      );
    });
    tick();
    expect(subscriber).not.toHaveBeenCalled();
    TestBed.inject(ConfigService).loadConfig();
    httpTestingController.expectOne('assets/config.json').flush({
      test: true,
    });
    tick();
    expect(subscriber).toHaveBeenCalledWith(true);
  }));
});
