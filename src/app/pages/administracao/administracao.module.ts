import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {MessageModule} from '../../shared/message/message.module';
import {AdministracaoComponent} from './administracao.component';



/**
 * Módulo responsável por prover o template padrão das interfaces principais.
 *
 * @author Guiliano Rangel (UEG)
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    MessageModule,
    BsDropdownModule,
    FlexLayoutModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    AdministracaoComponent
  ]
})
export class AdministracaoModule { }
