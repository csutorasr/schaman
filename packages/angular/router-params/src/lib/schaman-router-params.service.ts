import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchamanRouterParams {
  [parameter: string]: Observable<string>;

  public constructor(activatedRoute: ActivatedRoute) {
    return new Proxy(this, {
      get: (_, name) => {
        if (name === 'ngOnDestroy') {
          return;
        }
        let parameter: string = name.toString();
        if (parameter.endsWith('$')) {
          parameter = parameter.substring(0, parameter.length - 1);
        }
        return activatedRoute.params.pipe(map((params) => params[parameter]));
      },
    });
  }
}
