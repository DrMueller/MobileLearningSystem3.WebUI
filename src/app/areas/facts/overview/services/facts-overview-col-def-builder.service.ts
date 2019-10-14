import { Injectable, TemplateRef } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
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
    actionsTemplate: TemplateRef<any>,
  ): Promise<ColumnDefinitionsContainer> {
    return this.builderFactory
      .startBuilding()
      .withColumn('id', 'ID', 'id-cell').bindingTo<FactOverviewEntry>('id')
      .withColumn('creationDate',
        marker('common.created'),
        'creation-cell')
      .bindingTo<FactOverviewEntry>('creationDateDescription')
      .withColumn('questionText', marker('common.question')).bindingTo<FactOverviewEntry>('questionText')
      .withColumn('actions', '', 'button-cell').withTemplate(actionsTemplate)
      .build();
  }
}
