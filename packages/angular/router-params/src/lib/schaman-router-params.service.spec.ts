import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SchamanRouterParams } from './schaman-router-params.service';

const createService = (params: Record<string, string>) => {
  TestBed.configureTestingModule({
    providers: [
      SchamanRouterParams,
      {
        provide: ActivatedRoute,
        useValue: {
          params: of(params),
        },
      },
    ],
  });
  return TestBed.inject(SchamanRouterParams);
};

describe('SchamanRouterParams', () => {
  it('should be created', () => {
    const service = createService({});

    expect(service).toBeTruthy();
  });

  it('should show value', (done) => {
    const service = createService({ parameter: 'value' });

    service['parameter'].subscribe((value) => {
      expect(value).toBe('value');
      done();
    });
  });
});
