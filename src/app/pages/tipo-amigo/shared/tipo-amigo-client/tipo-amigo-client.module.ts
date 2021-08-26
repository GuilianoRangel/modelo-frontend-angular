import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoAmigoResolve } from './tipo-amigo.resolve';
import { TipoAmigoClientService } from './tipo-amigo-client.service';
import {TipoAmigoListResolve} from './tipo-amigo-list.resolve';


/**
 * Modulo de integração do projeto frontend com os serviços backend.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    TipoAmigoClientService,
    TipoAmigoResolve,
    TipoAmigoListResolve
  ]
})
export class TipoAmigoClientModule { }
