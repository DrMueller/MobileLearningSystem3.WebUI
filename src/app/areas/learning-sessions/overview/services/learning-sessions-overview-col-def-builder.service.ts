import { Injectable, TemplateRef } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { LearningSession } from 'src/app/areas/shared-domain/models';
import { ColumnDefinitionsContainer } from 'src/app/shared/tables/models';
import { ColDefBuilderFactoryService } from 'src/app/shared/tables/services';

import { LearningSessionsServicesModule } from '../../learning-sessions-services.module';

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
      .withColumn('id', 'ID', 'id-cell').bindingTo<LearningSession>('id')
      // .withColumn('questionText',
      // marker('areas.learning-sessions.overview.services.amountOfFacts'),
      //   'facts-cell').bindingTo<LearningSession>('amountOfFacts')
      .withColumn('name', marker('common.name')).bindingTo<LearningSession>('sessionName')
      .withColumn('editTemplate', '', 'button-cell').withTemplate(editTemplate)
      .withColumn('deleteTemplate', '', 'button-cell').withTemplate(deleteTemplate)
      .build();
  }
}
