import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';

import { MessageService } from './message.service';
import { InternacionalizacaoPipe } from './internacionalizacao.pipe';
import {AlertModule, ModalModule} from 'ngx-bootstrap';
import {AlertMessageComponent} from './alert-message/alert-message.component';
import {ConfirmDialogComponent} from './confirm-mesage/confirm-dialog.component';
import {MaterialModule} from '../../layouts/material.module';

/**
 * Módulo responsável por prover recursos de 'mensagens' e 'i18n'.
 *
 * @author Guiliano Rangel (UEG)
 */
@NgModule({
  entryComponents: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    MaterialModule
  ],
  declarations: [
    InternacionalizacaoPipe,
    AlertMessageComponent,
    ConfirmDialogComponent
  ],
  exports: [
    InternacionalizacaoPipe,
    AlertMessageComponent,
    ConfirmDialogComponent
  ]
})
export class MessageModule {

  /**
   * Convenção usada para que o módulo 'app' disponibilize as instâncias 'providers' como singleton para todos os modulos da aplicação.
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MessageModule,
      providers: [
        MessageService,
        InternacionalizacaoPipe,
        ConfirmDialogComponent
      ]
    };
  }
}
