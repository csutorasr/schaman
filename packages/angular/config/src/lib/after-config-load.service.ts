import { Injectable, InjectionToken, inject } from '@angular/core';
import { Observable, Subscribable } from 'rxjs';

export const AFTER_CONFIG_LOAD = new InjectionToken<
  ReadonlyArray<() => Observable<unknown> | Promise<unknown> | void>
>('After config load');

@Injectable()
export class AfterConfigLoadService {
  private resolve!: (...args: unknown[]) => void;
  private reject!: (...args: unknown[]) => void;

  private initialized = false;
  public readonly done = false;
  public readonly donePromise: Promise<unknown> = new Promise((res, rej) => {
    this.resolve = res;
    this.reject = rej;
  });

  private readonly afterConfigLoadProviders =
    inject(AFTER_CONFIG_LOAD, { optional: true }) ?? [];

  constructor() {
    if (!Array.isArray(this.afterConfigLoadProviders)) {
      console.error('AFTER_CONFIG_LOAD should be multi provider');
    }
  }

  public runAfterConfigLoadProviders(): void {
    if (this.initialized) {
      return;
    }

    const asyncInitPromises = [];
    for (const appInits of this.afterConfigLoadProviders) {
      const initResult = appInits();
      if (this.isPromise(initResult)) {
        asyncInitPromises.push(initResult);
      } else if (this.isSubscribable(initResult)) {
        const observableAsPromise = new Promise<void>((resolve, reject) => {
          initResult.subscribe({ complete: resolve, error: reject });
        });
        asyncInitPromises.push(observableAsPromise);
      }
    }

    const complete = () => {
      // @ts-expect-error overwriting a readonly
      this.done = true;
      this.resolve();
    };

    Promise.all(asyncInitPromises)
      .then(() => {
        complete();
      })
      .catch((error) => {
        this.reject(error);
      });

    if (asyncInitPromises.length === 0) {
      complete();
    }
    this.initialized = true;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private isPromise<T = any>(obj: any): obj is Promise<T> {
    return !!obj && typeof obj.then === 'function';
  }

  private isSubscribable<T>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obj: any | Subscribable<T>,
  ): obj is Subscribable<T> {
    return !!obj && typeof obj.subscribe === 'function';
  }
}
