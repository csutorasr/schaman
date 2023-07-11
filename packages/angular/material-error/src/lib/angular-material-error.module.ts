import { NgModule } from '@angular/core';
import { DynamicErrorDirective } from './dynamic-error.directive';
import { ErrorMessageProvider } from './error-message-provider';

@NgModule({
  imports: [DynamicErrorDirective],
  exports: [DynamicErrorDirective],
})
export class SchamanMaterialErrorModule {}

export { DynamicErrorDirective, ErrorMessageProvider };
