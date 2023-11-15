import { TestBed } from '@angular/core/testing';
import {
  CONFIGURATION,
  ConfigModuleConfiguration,
} from './configuration.token';
import { ConfigModule } from './config.module';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ConfigModule', () => {
  let configuration: ConfigModuleConfiguration;
  const setup = (
    inputConfiguration: Partial<ConfigModuleConfiguration> = {},
  ) => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
      imports: [ConfigModule.forRoot(inputConfiguration)],
    });
    configuration = TestBed.inject(CONFIGURATION);
  };
  it('should be defined', () => {
    setup();
    expect(configuration).toBeDefined();
  });

  it('should have default values', () => {
    setup();
    expect(configuration).toEqual({
      configPath: 'assets/config.json',
      loadConfig: true,
      retry: 3,
      runAsAppInitializer: false,
    });
  });

  it('should override default values', () => {
    setup({
      configPath: 'test',
      loadConfig: false,
      retry: 1,
      runAsAppInitializer: true,
    });
    expect(configuration).toEqual({
      configPath: 'test',
      loadConfig: false,
      retry: 1,
      runAsAppInitializer: true,
    });
  });
});
