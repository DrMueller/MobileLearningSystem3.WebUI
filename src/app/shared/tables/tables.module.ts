import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { MatDependenciesModule } from '../../mat-deps';

import { ButtonTemplateComponent } from './components/button-template';
import { MatTableComponent } from './components/mat-table';
import { CustomMatPaginatorIntl } from './services';

@NgModule({
  declarations: [
    MatTableComponent,
    ButtonTemplateComponent
  ],
  exports: [
    MatTableComponent,
    ButtonTemplateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDependenciesModule,
    TranslateModule
  ]
})
export class TablesModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: TablesModule,
      providers: [
        {
          provide: MatPaginatorIntl,
          useClass: CustomMatPaginatorIntl
        }
      ]
    };
  }
}
