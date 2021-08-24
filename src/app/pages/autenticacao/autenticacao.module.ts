import { SecurityModule } from '../../shared/security/security.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../layouts/material.module';
import { AutenticacaoComponent } from './autenticacao.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AutenticacaoRoutes} from './autenticacao.routing';
import {ValidationModule} from '../../shared/validation/validation.module';
import {MessageModule} from '../../shared/message/message.module';
import {AutenticacaoGuard} from './autenticacao-guard.service';
import {AutenticacaoService} from './autenticacao.service';
import {LayoutsModule} from '../../layouts/layouts.module';

@NgModule({
  declarations: [AutenticacaoComponent],
  imports: [
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
    AutenticacaoService
  ]
})
export class AutenticacaoModule { }
