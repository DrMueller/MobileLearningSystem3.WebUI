import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatDependenciesModule } from '../../mat-dependencies';

import { MatTableComponent } from './components/mat-table';

@NgModule({
  declarations: [
    MatTableComponent
  ],
  exports: [
    MatTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDependenciesModule
  ],
})
export class TablesModule { }
