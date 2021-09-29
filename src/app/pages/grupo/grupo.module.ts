import { MaterialModule } from '../../layouts/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {MessageModule} from '../../shared/message/message.module';

import { GrupoRoutes} from './grupo.routing';
import {GrupoListComponent} from './grupo-list/grupo-list.component';
import {GrupoFormComponent} from './grupo-form/grupo-form.component';
import {GrupoClientModule} from './shared/grupo-client/grupo-client.module';
import {OrderModule} from 'ngx-order-pipe';
import {ValidationModule} from '../../shared/validation/validation.module';
import {GrupoStatsComponent} from './grupo-stats/grupo-stats.component';
import {DxChartModule, DxPieChartModule} from 'devextreme-angular';

@NgModule({
  declarations: [GrupoListComponent, GrupoFormComponent, GrupoStatsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MessageModule,
    FormsModule,
    OrderModule,
    GrupoClientModule,
    RouterModule.forChild(GrupoRoutes),
    ValidationModule,
    DxPieChartModule,
    DxChartModule
  ]
})
export class GrupoModule { }
