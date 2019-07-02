import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningSessionsRoutingModule } from './learning-sessions-routing.module';
import { LearningSessionsComponent } from './entry-point/components/learning-sessions/learning-sessions.component';
import { LearningSessionsOverviewComponent } from './overview/components/learning-sessions-overview/learning-sessions-overview.component';

@NgModule({
  declarations: [LearningSessionsComponent, LearningSessionsOverviewComponent],
  imports: [
    CommonModule,
    LearningSessionsRoutingModule
  ]
})
export class LearningSessionsModule { }
