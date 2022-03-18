import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaskPipe } from './mask.pipe';
import { MaskDirective } from './mask.directive';

/**
 * Módulo responsável prover o recurso de mascara monetária.
 *
 * @author Guiliano Rangel (UEG)
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MaskPipe,
    MaskDirective
  ],
  exports: [
    MaskPipe,
    MaskDirective
  ]
})
export class MaskModule {

}
