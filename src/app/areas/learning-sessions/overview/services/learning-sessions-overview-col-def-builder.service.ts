import { Injectable, TemplateRef } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { ColumnDefinitionsContainer } from 'src/app/shared/tables/models';
import { ColDefBuilderFactoryService } from 'src/app/shared/tables/services';

import { LearningSessionsServicesModule } from '../../learning-sessions-services.module';
import { LearningSessionOverviewVm } from '../view-models';

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
      .withColumn('id', 'ID', 'id-cell').bindingTo<LearningSessionOverviewVm>('id')
      .withColumn('amountOfFacts',
        marker('areas.learning-sessions.overview.services.amountOfFacts'),
        'facts-cell').bindingTo<LearningSessionOverviewVm>('amountOfFacts')
      .withColumn('name', marker('common.name')).bindingTo<LearningSessionOverviewVm>('sessionName')
      .withColumn('editTemplate', '', 'button-cell').withTemplate(editTemplate)
      .withColumn('deleteTemplate', '', 'button-cell').withTemplate(deleteTemplate)
      .build();
  }
}
