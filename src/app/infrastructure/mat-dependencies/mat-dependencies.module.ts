import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule,
  MatCheckboxModule, MatDatepickerModule,
  MatDialogModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule, MatMenuModule,
  MatPaginatorModule, MatSidenavModule,
  MatTableModule, MatToolbarModule, MatSortModule
} from '@angular/material';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatMenuModule,
    MatMomentDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatSidenavModule
  ]
})
export class MatDependenciesModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MatDependenciesModule,
      providers: [
        {
          provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true }
        }
      ]
    };
  }
}
