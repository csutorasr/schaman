import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CONFIGURATION } from './configuration.token';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, firstValueFrom, retry, take } from 'rxjs';

@Injectable()
export class ConfigService<T> {
  readonly #config = new BehaviorSubject<T | undefined>(undefined);
  private readonly configuration = inject(CONFIGURATION);
  private readonly http = inject(HttpClient);

  public readonly config = toSignal(this.#config);
  public readonly config$ = this.#config.asObservable();
  public readonly afterConfigLoad$ = this.config$.pipe(
    filter(Boolean),
    take(1),
  );

  constructor() {
    if (
      this.configuration.loadConfig &&
      !this.configuration.runAsAppInitializer
    ) {
      this.loadConfig();
    }
  }

  public async loadConfig(): Promise<T> {
    const promise = firstValueFrom(
      this.http
        .get<T>(this.configuration.configPath, {
          responseType: 'json',
        })
        .pipe(retry(this.configuration.retry)),
    );
    const config = await promise;
    this.#config.next(config);
    return config;
  }
}
