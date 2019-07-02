import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/welcome',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('../../../areas/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'facts',
    loadChildren: () => import('../../../areas/facts/facts.module').then(m => m.FactsModule)
  },
  {
    path: 'learningsessions',
    loadChildren: () => import('../../../areas/learning-sessions/learning-sessions.module').then(m => m.LearningSessionsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
