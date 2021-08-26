import {NgModule} from '@angular/core';
import {NgxMaskModule} from 'ngx-mask';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../layouts/material.module';


import {OrderModule} from 'ngx-order-pipe';
import {TipoAmigoRoutes} from './tipo-amigo.routing';
import {MessageModule} from '../../shared/message/message.module';
import {ValidationModule} from '../../shared/validation/validation.module';
import {TipoAmigoFormComponent} from './tipo-amigo-form/tipo-amigo-form.component';
import {TipoAmigoListComponent} from './tipo-amigo-list/tipo-amigo-list.component';
import {TipoAmigoClientModule} from './shared/tipo-amigo-client/tipo-amigo-client.module';

@NgModule({
  declarations: [
    TipoAmigoFormComponent,
    TipoAmigoListComponent
  ],
  entryComponents: [
  ],
  imports: [
    FormsModule,
    OrderModule,
    CommonModule,
    MessageModule,
    MaterialModule,
    ValidationModule,
    TipoAmigoClientModule,
    NgxMaskModule.forRoot({}),
    RouterModule.forChild(TipoAmigoRoutes)
  ]
})
export class TipoAmigoModule { }
