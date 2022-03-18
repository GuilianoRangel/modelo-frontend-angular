import { SecurityModule } from '../../shared/security/security.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../layouts/material.module';
import { AutenticacaoComponent } from './autenticacao.component';
import { MaskModule } from '../../shared/mask/mask.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AutenticacaoRoutes} from './autenticacao.routing';
import {ValidationModule} from '../../shared/validation/validation.module';
import {MessageModule} from '../../shared/message/message.module';
import {AutenticacaoGuard} from './autenticacao-guard.service';
import {AutenticacaoService} from './autenticacao.service';
import {LayoutsModule} from '../../layouts/layouts.module';
import { FormAlterarSenhaComponent } from '../autenticacao/form-alterar-senha/form-alterar-senha.component';
import { FormRecuperarSenhaComponent } from '../autenticacao/form-recuperar-senha/form-recuperar-senha.component';
import { RedefinirSenhaGuard } from './redefinir-senha.guard';



@NgModule({
  declarations: [
    AutenticacaoComponent,
    FormAlterarSenhaComponent,
    FormRecuperarSenhaComponent
  ],
  imports: [
    MaskModule,
    FormsModule,
    CommonModule,
    RouterModule,
    MaterialModule,
    SecurityModule,
    LayoutsModule,
    RouterModule.forChild(AutenticacaoRoutes),
    ValidationModule,
    MessageModule
  ],
  providers: [
    AutenticacaoGuard,
    RedefinirSenhaGuard,
    AutenticacaoService
  ]
})
export class AutenticacaoModule { }
