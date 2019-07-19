import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatDependenciesModule } from '../../mat-dependencies';

import { EnquiryDialogComponent } from './components/enquiry-dialog';
import { EnquiryService } from './services';

@NgModule({
  declarations: [
    EnquiryDialogComponent
  ],
  entryComponents: [
    EnquiryDialogComponent
  ],
  providers: [
    EnquiryService
  ],
  imports: [
    CommonModule,
    MatDependenciesModule
  ]
})
export class EnquiryDialogModule { }