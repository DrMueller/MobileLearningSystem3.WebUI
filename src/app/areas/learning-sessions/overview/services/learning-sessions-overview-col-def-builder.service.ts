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
      .startBuilding<LearningSessionOverviewVm>()
      .withColumn('id', 'ID', 'id-cell').bindingTo('id')
      .withColumn('amountOfFacts',
        marker('areas.learning-sessions.overview.services.amountOfFacts'),
        'facts-cell').bindingTo('amountOfFacts')
      .withColumn('name', marker('common.name')).bindingTo('sessionName')
      .withColumn('editTemplate', '', 'button-cell').withTemplate(editTemplate)
      .withColumn('deleteTemplate', '', 'button-cell').withTemplate(deleteTemplate)
      .build();
  }
}
