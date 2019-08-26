import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TensorflowComponent } from './entry-point/tensorflow';
import { WebcamClassifierComponent } from './webcam/components/webcam-classifier';


const routes: Routes = [
  {
    path: '',
    component: TensorflowComponent,
    children: [
      {
        path: '', redirectTo: 'webcam-classifier', pathMatch: 'full'
      },
      {
        path: 'webcam-classifier',
        component: WebcamClassifierComponent,
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TensorflowRoutingModule { }
