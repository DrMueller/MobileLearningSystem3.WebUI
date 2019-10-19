import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LearningSessionEditComponent } from './edit/components/learning-session-edit/learning-session-edit.component';
import { LearningSessionsComponent } from './entry-point/components/learning-sessions';
import { LearningSessionsOverviewComponent } from './overview/components/learning-sessions-overview/learning-sessions-overview.component';
import { SessionRunComponent } from './runs/components/session-run';
import { RunFactResolver } from './runs/resolvers/run-fact.resolver';

const routes: Routes = [
  {
    path: '',
    component: LearningSessionsComponent,
    children: [
      {
        path: '', redirectTo: 'overview', pathMatch: 'full'
      },
      {
        path: 'overview',
        component: LearningSessionsOverviewComponent
      },
      {
        path: 'edit',
        component: LearningSessionEditComponent,
      },
      {
        path: 'runs/:sessionid',
        component: SessionRunComponent,
        resolve: { runfacts: RunFactResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningSessionsRoutingModule { }
