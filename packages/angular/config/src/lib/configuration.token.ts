import { InjectionToken } from '@angular/core';

export interface ConfigModuleConfiguration {
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

export const CONFIGURATION = new InjectionToken<ConfigModuleConfiguration>(
  'ConfigModule CONFIGURATION',
);
