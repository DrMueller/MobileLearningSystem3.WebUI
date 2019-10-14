import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EditorModule } from 'primeng/editor';
import { MatDependenciesModule } from 'src/app/mat-deps';
import { EnquiryDialogModule } from 'src/app/shared/enquiry-dialog';
import { RxFormsModule } from 'src/app/shared/rx-forms';
import { TablesModule } from 'src/app/shared/tables';

import { FactExistsInRunComponent } from './edit/components/fact-exists-in-run';
import { FactsSelectionComponent } from './edit/components/facts-selection';
import { LearningSessionEditComponent } from './edit/components/learning-session-edit/learning-session-edit.component';
import { LearningSessionsComponent } from './entry-point/components/learning-sessions/learning-sessions.component';
import { LearningSessionsRoutingModule } from './learning-sessions-routing.module';
import { LearningSessionsServicesModule } from './learning-sessions-services.module';
import { ChunkEditDialogComponent } from './overview/components/chunk-edit-dialog/chunk-edit-dialog.component';
import { LearningSessionsOverviewComponent } from './overview/components/learning-sessions-overview/learning-sessions-overview.component';
import { SessionRunComponent } from './runs/components/session-run';

@NgModule({
  declarations: [
    ChunkEditDialogComponent,
    LearningSessionsComponent,
    LearningSessionsOverviewComponent,
    LearningSessionEditComponent,
    FactExistsInRunComponent,
    FactsSelectionComponent,
    SessionRunComponent
  ],
  entryComponents: [
    ChunkEditDialogComponent
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
    TablesModule,
    TranslateModule
  ]
})
export class LearningSessionsModule {
}
