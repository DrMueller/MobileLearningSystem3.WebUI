import { Injectable, TemplateRef } from '@angular/core';
import { ColumnDefinitionsContainer } from 'src/app/shared/tables/models';
import { ColDefBuilderFactoryService } from 'src/app/shared/tables/services';

import { LearningSessionsServicesModule } from '../../learning-sessions-services.module';
import { LearningSessionOverviewEntry } from '../models';

@Injectable({
  providedIn: LearningSessionsServicesModule
})
export class LearningSessionsOverviewColDefBuilderService {
  public constructor(
    private builderFactory: ColDefBuilderFactoryService) { }

  public async buildDefinitionsAsync(
    editTemplate: TemplateRef<any>,
    deleteTemplate: TemplateRef<any>): Promise<ColumnDefinitionsContainer> {

    return this.builderFactory
      .startBuilding()
      .withColumn('id', 'ID', 'id-cell').bindingTo<LearningSessionOverviewEntry>('id')
      .withColumn('questionText',
        'areas.learning-sessions.overview.services.amountOfFacts',
        'facts-cell').bindingTo<LearningSessionOverviewEntry>('amountOfFacts')
      .withColumn('name', 'common.name').bindingTo<LearningSessionOverviewEntry>('sessionName')
      .withColumn('editTemplate', '', 'button-cell').withTemplate(editTemplate)
      .withColumn('deleteTemplate', '', 'button-cell').withTemplate(deleteTemplate)
      .build();
  }
}
