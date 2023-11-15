import {
  AfterContentInit,
  ChangeDetectorRef,
  Directive,
  OnDestroy,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { FormGroupDirective, NgForm, ValidationErrors } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { merge, Subscription } from 'rxjs';
import { ErrorMessageProvider } from './error-message-provider';

@Directive({
  selector: '[schamanDynamicError]',
  standalone: true,
})
export class DynamicErrorDirective implements AfterContentInit, OnDestroy {
  private text?: Text;
  private subscription?: Subscription;
  private readonly templateReference = inject(TemplateRef);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly renderer = inject(Renderer2);
  private readonly matFormField = inject(MatFormField);
  private readonly errorMessageProvider = inject(ErrorMessageProvider);
  private readonly ngForm = inject(NgForm, { optional: true });
  private readonly formGroupDirective = inject(FormGroupDirective, {
    optional: true,
  });
  private readonly changeDetectorReference = inject(ChangeDetectorRef);
  public ngAfterContentInit(): void {
    const matFormFieldControl = this.matFormField._control;
    const ngControl = matFormFieldControl.ngControl;
    const observables = [matFormFieldControl.stateChanges];
    if (this.ngForm) {
      observables.push(this.ngForm.ngSubmit);
    }
    if (this.formGroupDirective) {
      observables.push(this.formGroupDirective.ngSubmit);
    }
    this.subscription = merge(...observables).subscribe(() => {
      if (matFormFieldControl.errorState && ngControl?.errors) {
        this.addText(ngControl.errors);
      } else if (this.text) {
        this.removeText();
      }
    });
  }
  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private removeText() {
    this.viewContainer.clear();
    this.text = undefined;
    this.changeDetectorReference.detectChanges();
  }

  private addText(errors: ValidationErrors) {
    if (this.createTextNodeIfNeeded(this.text)) {
      const newTextContent =
        this.errorMessageProvider.getErrorMessagesFor(errors);
      if (newTextContent !== this.text.textContent) {
        this.text.textContent = newTextContent;
        this.changeDetectorReference.detectChanges();
      }
    }
  }

  private createTextNodeIfNeeded(text: Text | undefined): text is Text {
    if (!this.text) {
      this.viewContainer.createEmbeddedView(this.templateReference);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const elementReference = (this.viewContainer.get(0) as any).rootNodes[0];
      this.text = this.renderer.createText('');
      this.renderer.appendChild(elementReference, this.text);
    }
    return true;
  }
}
