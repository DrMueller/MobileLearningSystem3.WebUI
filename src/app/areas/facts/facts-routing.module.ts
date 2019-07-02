import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FactsComponent } from './entry-point/components/facts';
import { FactsOverviewComponent } from './overview/components/facts-overview';
import { FactEditComponent } from './edit/components/fact-edit';
import { FactEditResolver } from './edit/resolvers';

const routes: Routes = [
  {
    path: '',
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
        resolve: { fact: FactEditResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactsRoutingModule { }
