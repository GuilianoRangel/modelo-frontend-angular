import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../layouts/material.module';


import { OrderModule } from 'ngx-order-pipe';
import { AmigoRoutes } from './amigo.routing';
import { MessageModule } from '../../shared/message/message.module';
import { ValidationModule } from '../../shared/validation/validation.module';
import { AmigoFormComponent } from './amigo-form/amigo-form.component';
import { AmigoListComponent } from './amigo-list/amigo-list.component';
import { AmigoClientModule } from './shared/amigo-client/amigo-client.module';

@NgModule({
  declarations: [
    AmigoFormComponent,
    AmigoListComponent
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
    AmigoClientModule,
    NgxMaskModule.forRoot({}),
    RouterModule.forChild(AmigoRoutes)
  ]
})
export class AmigoModule { }
