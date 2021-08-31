import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MessageModule } from '../shared/message/message.module';
import {LoaderDialogComponent} from './loader-dialog/loader-dialog.component';
import {MaterialModule} from './material.module';

/**
 * @author Guiliano Rangel (UEG)
 */
@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    LoaderDialogComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MessageModule,
    MessageModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MaterialModule
  ],
  entryComponents: [
    LoaderDialogComponent
  ]
})
export class LayoutsModule { }
