import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearningSessionsComponent } from './entry-point/components/learning-sessions';
import { LearningSessionsOverviewComponent } from './overview/components/learning-sessions-overview/learning-sessions-overview.component';
import { LearningSessionEditComponent } from './edit/components/learning-session-edit/learning-session-edit.component';
import { LearningSessionEditResolver } from './edit/resolvers';

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
        path: ':sessionid',
        component: LearningSessionEditComponent,
        resolve: { session: LearningSessionEditResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningSessionsRoutingModule { }
