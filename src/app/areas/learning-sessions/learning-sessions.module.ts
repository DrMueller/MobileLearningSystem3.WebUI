import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningSessionsRoutingModule } from './learning-sessions-routing.module';
import { LearningSessionsComponent } from './entry-point/components/learning-sessions/learning-sessions.component';
import { LearningSessionsOverviewComponent } from './overview/components/learning-sessions-overview/learning-sessions-overview.component';
import { LearningSessionEditComponent } from './edit/components/learning-session-edit/learning-session-edit.component';
import { MatDependenciesModule } from 'src/app/infrastructure/mat-dependencies';
import { RxFormsModule } from 'src/app/infrastructure/shared-features/rx-forms';
import { TablesModule } from 'src/app/infrastructure/shared-features/tables';
import { LearningSessionsServicesModule } from './learning-sessions-services.module';
import { FactsSelectionComponent } from './edit/components/facts-selection';
import { SessionRunComponent } from './runs/components/session-run';

@NgModule({
  declarations: [
    LearningSessionsComponent,
    LearningSessionsOverviewComponent,
    LearningSessionEditComponent,
    FactsSelectionComponent,
    SessionRunComponent
  ],
  imports: [
    CommonModule,
    LearningSessionsRoutingModule,
    LearningSessionsServicesModule,
    MatDependenciesModule,
    RxFormsModule,
    TablesModule
  ]
})
export class LearningSessionsModule { }
