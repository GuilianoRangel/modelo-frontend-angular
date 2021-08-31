import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { HomeComponent } from './home.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {MessageModule} from '../../shared/message/message.module';
import {MaterialModule} from '../../layouts/material.module';
import {GrupoUsuarioClientModule} from '../../shared/services/grupo-usuario-client/grupo-usuario-client.module';
import {ModuloClientModule} from '../../shared/services/modulo-client/modulo-client.module';

/**
 * Módulo responsável por prover o template padrão das interfaces principais.
 *
 * @author Guiliano Rangel (UEG)
 */
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    BrowserModule,
    MessageModule,
    FlexLayoutModule,
    FilterPipeModule,
    GrupoUsuarioClientModule,
    ModuloClientModule,
    AngularFontAwesomeModule,
    BsDropdownModule.forRoot(),
    MaterialModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
