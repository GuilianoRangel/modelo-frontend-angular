import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AmigoResolve} from './amigo.resolve';
import {AmigoClientService} from './amigo-client.service';
import {TipoAmigoListResolve} from '../../../tipo-amigo/shared/tipo-amigo-client/tipo-amigo-list.resolve';
import {AmigoListResolve} from './amigo-list.resolve';


/**
 * Modulo de integração do projeto frontend com os serviços backend.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AmigoClientService,
    AmigoResolve,
    TipoAmigoListResolve,
    AmigoListResolve
  ]
})
export class AmigoClientModule { }
