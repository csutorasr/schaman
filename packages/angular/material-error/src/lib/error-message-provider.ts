import { ValidationErrors } from '@angular/forms';

export abstract class ErrorMessageProvider {
  public abstract getErrorMessagesFor(errors: ValidationErrors): string;
}
