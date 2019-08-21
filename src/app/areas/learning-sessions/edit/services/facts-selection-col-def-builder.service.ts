import { Injectable, TemplateRef } from '@angular/core';
import { FactOverviewEntry } from 'src/app/areas/shared-domain/models';
import { ColumnDefinitionsContainer } from 'src/app/shared/tables/models';
import { ColDefBuilderFactoryService } from 'src/app/shared/tables/services';

import { LearningSessionsServicesModule } from '../../learning-sessions-services.module';

@Injectable({
  providedIn: LearningSessionsServicesModule
})
export class FactsSelectionColDefBuilderService {
  public constructor(private builderFactory: ColDefBuilderFactoryService) { }

  public buildDefinitions(existsInRunTemplate: TemplateRef<any>): ColumnDefinitionsContainer {
    return this.builderFactory
      .startBuilding()
      .withColumn('id', 'ID', 'id-cell').bindingTo<FactOverviewEntry>('id')
      .withColumn('creationDate', 'Created', 'creation-cell').bindingTo<FactOverviewEntry>('creationDateDescription')
      .withColumn('existsInRun', 'In Run').withTemplate(existsInRunTemplate)
      .withColumn('questionText', 'Question').bindingTo<FactOverviewEntry>('questionText')
      .build();
  }
}
