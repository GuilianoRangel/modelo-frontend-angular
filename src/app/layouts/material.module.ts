import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import {MatMenuModule, MatButtonModule, MatCardModule, MatIconModule,
  MatProgressSpinnerModule, MatDialogModule, MatSnackBarModule, MatTooltipModule,
  MatPaginatorModule, MatSortModule, MatTableModule, MatAutocompleteModule, MatCheckboxModule,
   MatInputModule, MatRadioModule, MatSelectModule, MatSlideToggleModule,
  MatDividerModule, MatExpansionModule, MatGridListModule, MatTreeModule, MatToolbarModule, MatTabsModule,
  MatSliderModule, MatSidenavModule, MatRippleModule, MatProgressBarModule, MatNativeDateModule, MatListModule,
  MatDatepickerModule, MatStepperModule, MatChipsModule,
  MatButtonToggleModule, MatBottomSheetModule, MatBadgeModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PortalModule } from '@angular/cdk/portal';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  exports: [
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatFormFieldModule
  ],
  declarations: []
})
export class MaterialModule { }
