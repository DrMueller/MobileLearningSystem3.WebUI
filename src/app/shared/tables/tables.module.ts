import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MatDependenciesModule } from '../../mat-deps';

import { ButtonTemplateComponent } from './components/button-template';
import { MatTableComponent } from './components/mat-table';

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
  ],
})
export class TablesModule { }
