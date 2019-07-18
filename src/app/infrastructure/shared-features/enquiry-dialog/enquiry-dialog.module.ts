import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatDependenciesModule } from '../../mat-dependencies';

import { EnquiryDialogComponent } from './components/enquiry-dialog';

@NgModule({
  declarations: [
    EnquiryDialogComponent
  ],
  entryComponents: [
    EnquiryDialogComponent
  ],
  imports: [
    CommonModule,
    MatDependenciesModule
  ]
})
export class EnquiryDialogModule { }
