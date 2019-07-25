import { Injectable, TemplateRef } from '@angular/core';
import { ColumnDefinitionsContainer } from 'src/app/infrastructure/shared-features/tables/models';
import { ColDefBuilderFactoryService } from 'src/app/infrastructure/shared-features/tables/services';

import { FactOverviewEntry } from '../../../shared-domain/models/fact-overview-entry.model';
import { FactServicesModule } from '../../fact-services.module';

@Injectable({
  providedIn: FactServicesModule
})
export class FactsOverviewColDefBuilderService {
  public constructor(private builderFactory: ColDefBuilderFactoryService) { }

  public buildDefinitions(
    editTemplate: TemplateRef<any>,
    deleteTemplate: TemplateRef<any>
  ): ColumnDefinitionsContainer {
    return this.builderFactory
      .startBuilding()
      .withColumn('id', 'ID', 'id-cell').bindingTo<FactOverviewEntry>('id')
      .withColumn('creationDate', 'Created', 'creation-cell').bindingTo<FactOverviewEntry>('creationDateDescription')
      .withColumn('questionText', 'Question').bindingTo<FactOverviewEntry>('questionText')
      .withColumn('editTemplate', '', 'button-cell').withTemplate(editTemplate)
      .withColumn('deleteTemplate', '', 'button-cell').withTemplate(deleteTemplate)
      .build();
  }
}
