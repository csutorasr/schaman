import { CanActivateChildFn, CanActivateFn, CanMatchFn } from '@angular/router';
import { ConfigService } from './config.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const configLoadedGuard:
  | CanActivateFn
  | CanActivateChildFn
  | CanMatchFn = () => {
  return inject(ConfigService).afterConfigLoad$.pipe(map(() => true));
};
