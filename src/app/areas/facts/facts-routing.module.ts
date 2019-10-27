import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FactEditComponent } from './edit/components/fact-edit';
import { FactsComponent } from './entry-point/components/facts';
import { FactsOverviewComponent } from './overview/components/facts-overview';

const routes: Routes = [
  {
    path: 'facts',
    component: FactsComponent,
    children: [
      {
        path: '', redirectTo: 'overview', pathMatch: 'full'
      },
      {
        path: 'overview',
        component: FactsOverviewComponent
      },
      {
        path: ':factid',
        component: FactEditComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactsRoutingModule { }
