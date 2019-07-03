import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatDependenciesModule } from '../../mat-dependencies';

import { MatTableComponent } from './components/mat-table';
import { ButtonTemplateComponent } from './components/button-template';

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
    MatDependenciesModule
  ],
})
export class TablesModule { }
