import { TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, ViewChild } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ErrorMessageProvider } from './error-message-provider';
import { DynamicErrorDirective } from './dynamic-error.directive';

@Component({
  template: `<mat-form-field>
    <input matInput [formControl]="formControl" />
    <mat-error *schamanDynamicError></mat-error>
  </mat-form-field>`,
  standalone: true,
  imports: [
    DynamicErrorDirective,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
class DirectiveTestComponent {
  @ViewChild(DynamicErrorDirective, { static: true }) directive:
    | DynamicErrorDirective
    | undefined;
  public readonly formControl = new FormControl('', Validators.required);
}

const render = async () => {
  await TestBed.configureTestingModule({
    imports: [DirectiveTestComponent, NoopAnimationsModule],
    providers: [
      {
        provide: ErrorMessageProvider,
        useValue: {
          getErrorMessagesFor: (error: ValidationErrors) =>
            Object.keys(error)[0],
        },
      },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(DirectiveTestComponent);
  fixture.detectChanges();
  const loader = TestbedHarnessEnvironment.loader(fixture);
  return { fixture, loader };
};

describe('DynamicErrorDirective', () => {
  it('should create', async () => {
    const { fixture } = await render();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show error message', async () => {
    const { fixture, loader } = await render();
    const input = await loader.getHarness(MatInputHarness);

    await input.focus();
    await input.setValue('a');
    await input.setValue('');
    await input.blur();

    expect(fixture.nativeElement.textContent).toContain('required');
  });

  it('should hide error message', async () => {
    const { fixture, loader } = await render();
    const input = await loader.getHarness(MatInputHarness);

    await input.focus();
    await input.setValue('a');
    await input.setValue('');
    await input.setValue('a');
    await input.blur();

    expect(fixture.nativeElement.textContent).not.toContain('required');
  });

  it('should unsubscribe in on destroy', async () => {
    const { fixture, loader } = await render();
    const input = await loader.getHarness(MatInputHarness);

    fixture.componentInstance.directive?.ngOnDestroy();
    await input.focus();
    await input.setValue('a');
    await input.setValue('');
    await input.blur();

    expect(fixture.nativeElement.textContent).not.toContain('required');
  });
});
