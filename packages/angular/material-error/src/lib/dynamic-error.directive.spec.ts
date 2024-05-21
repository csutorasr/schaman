import { TestBed } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { fireEvent } from '@testing-library/dom';
import { ErrorMessageProvider } from './error-message-provider';
import { DynamicErrorDirective } from './dynamic-error.directive';

describe('DynamicErrorDirective', () => {
  describe('Reactive form with material input', () => {
    @Component({
      template: `<form [formGroup]="formGroup">
        <mat-form-field>
          <input matInput [formControl]="formControl" />
          <mat-error *schamanDynamicError></mat-error>
        </mat-form-field>
      </form>`,
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
      public readonly formGroup = new FormGroup({
        formControl: this.formControl,
      });
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

    it('should show error message on submit', async () => {
      const { fixture } = await render();

      const form = fixture.nativeElement.querySelector('form');
      fireEvent.submit(form);

      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain('required');
    });
  });

  describe('Form with material input', () => {
    @Component({
      template: `<form>
        <mat-form-field>
          <input matInput [(ngModel)]="value" required name="test" />
          <mat-error *schamanDynamicError></mat-error>
        </mat-form-field>
      </form>`,
      standalone: true,
      imports: [
        DynamicErrorDirective,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
      ],
    })
    class DirectiveTestComponent {
      @ViewChild(DynamicErrorDirective, { static: true }) directive:
        | DynamicErrorDirective
        | undefined;
      public value = '';
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

    it('should show error message on submit', async () => {
      const { fixture } = await render();

      const form = fixture.nativeElement.querySelector('form');
      fireEvent.submit(form);

      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain('required');
    });
  });

  describe('Form control bare', () => {
    @Component({
      template: `<form [formGroup]="formGroup">
        <input [formControl]="formControl" />
        <div *schamanDynamicError="formControl"></div>
      </form>`,
      standalone: true,
      imports: [DynamicErrorDirective, ReactiveFormsModule],
    })
    class DirectiveTestComponent {
      @ViewChild(DynamicErrorDirective, { static: true }) directive:
        | DynamicErrorDirective
        | undefined;
      public readonly formControl = new FormControl('', Validators.required);
      public readonly formGroup = new FormGroup({
        formControl: this.formControl,
      });
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
      return { fixture };
    };
    it('should create', async () => {
      const { fixture } = await render();
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('should show error message', async () => {
      const { fixture } = await render();
      const input = fixture.nativeElement.querySelector('input');

      fireEvent.focus(input);
      fireEvent.input(input, { target: { value: 'a' } });
      fixture.detectChanges();
      fireEvent.input(input, { target: { value: '' } });
      fireEvent.blur(input);
      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain('required');
    });

    it('should hide error message', async () => {
      const { fixture } = await render();
      const input = fixture.nativeElement.querySelector('input');

      fireEvent.focus(input);
      fireEvent.input(input, { target: { value: 'a' } });
      fixture.detectChanges();
      fireEvent.input(input, { target: { value: '' } });
      fixture.detectChanges();
      fireEvent.input(input, { target: { value: 'a' } });
      fireEvent.blur(input);
      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).not.toContain('required');
    });

    it('should unsubscribe in on destroy', async () => {
      const { fixture } = await render();
      const input = fixture.nativeElement.querySelector('input');

      fixture.componentInstance.directive?.ngOnDestroy();
      fireEvent.focus(input);
      fireEvent.input(input, { target: { value: 'a' } });
      fixture.detectChanges();
      fireEvent.input(input, { target: { value: '' } });
      fireEvent.blur(input);
      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).not.toContain('required');
    });

    it('should show error message on submit', async () => {
      const { fixture } = await render();

      const form = fixture.nativeElement.querySelector('form');
      fireEvent.submit(form);

      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain('required');
    });
  });
});
