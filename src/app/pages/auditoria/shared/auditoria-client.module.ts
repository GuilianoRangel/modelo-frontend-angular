import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuditoriaResolve} from './auditoria.resolve';

/**
 * Modulo de integração do projeto frontend com os serviços backend.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuditoriaResolve
  ]
})
export class AuditoriaClientModule { }
