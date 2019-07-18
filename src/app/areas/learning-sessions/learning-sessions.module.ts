import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { MatDependenciesModule } from 'src/app/infrastructure/mat-dependencies';
import { EnquiryDialogModule } from 'src/app/infrastructure/shared-features/enquiry-dialog';
import { RxFormsModule } from 'src/app/infrastructure/shared-features/rx-forms';
import { TablesModule } from 'src/app/infrastructure/shared-features/tables';

import { FactsSelectionComponent } from './edit/components/facts-selection';
import { LearningSessionEditComponent } from './edit/components/learning-session-edit/learning-session-edit.component';
import { LearningSessionsComponent } from './entry-point/components/learning-sessions/learning-sessions.component';
import { LearningSessionsRoutingModule } from './learning-sessions-routing.module';
import { LearningSessionsServicesModule } from './learning-sessions-services.module';
import { LearningSessionsOverviewComponent } from './overview/components/learning-sessions-overview/learning-sessions-overview.component';
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
    EditorModule,
    EnquiryDialogModule,
    FormsModule,
    LearningSessionsRoutingModule,
    LearningSessionsServicesModule,
    MatDependenciesModule,
    RxFormsModule,
    TablesModule
  ]
})
export class LearningSessionsModule { }
