import { Injectable, TemplateRef } from '@angular/core';
import { ColumnDefinitionsContainer } from 'src/app/shared/tables/models';
import { ColDefBuilderFactoryService } from 'src/app/shared/tables/services';

import { FactOverviewEntry } from '../../../shared-domain/models/fact-overview-entry.model';
import { FactServicesModule } from '../../fact-services.module';

@Injectable({
  providedIn: FactServicesModule
})
export class FactsOverviewColDefBuilderService {
  public constructor(
    private builderFactory: ColDefBuilderFactoryService) { }

  public async buildDefinitionsAsync(
    editTemplate: TemplateRef<any>,
    deleteTemplate: TemplateRef<any>
  ): Promise<ColumnDefinitionsContainer> {
    return this.builderFactory
      .startBuilding()
      .withColumn('id', 'ID', 'id-cell').bindingTo<FactOverviewEntry>('id')
      .withColumn('creationDate',
        'areas.facts.overview.services.questionHeading',
        'creation-cell')
      .bindingTo<FactOverviewEntry>('creationDateDescription')
      .withColumn('questionText', 'common.created').bindingTo<FactOverviewEntry>('questionText')
      .withColumn('editTemplate', '', 'button-cell').withTemplate(editTemplate)
      .withColumn('deleteTemplate', '', 'button-cell').withTemplate(deleteTemplate)
      .build();
  }
}
