import { ListAuditoriaComponent } from './list-auditoria/list-auditoria.component';
import { AuditoriaClientModule } from './shared/auditoria-client.module';
import { AuditoriaRoutes } from './audit.routing';
import { ValidationModule } from '../../shared/validation/validation.module';
import { OrderModule } from 'ngx-order-pipe';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'src/app/shared/message/message.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../layouts/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FlexModule, FlexLayoutModule } from '@angular/flex-layout';
import { AuditoriaFormComponent } from './auditoria-form/auditoria-form.component';

@NgModule({
declarations: [ListAuditoriaComponent, AuditoriaFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MatDatepickerModule,
    HttpClientModule,
    MessageModule,
    FormsModule,
    OrderModule,
    ValidationModule,
    FlexModule,
    FlexLayoutModule,
    AuditoriaClientModule,
    RouterModule.forChild(AuditoriaRoutes)
  ]
})
export class AuditModule { }
