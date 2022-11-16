import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicErrorDirective } from './dynamic-error.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [DynamicErrorDirective],
  exports: [DynamicErrorDirective],
})
export class SchamanMaterialErrorModule {}

export { DynamicErrorDirective };
