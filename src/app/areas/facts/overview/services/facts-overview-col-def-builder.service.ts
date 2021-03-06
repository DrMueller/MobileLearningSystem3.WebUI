import { Injectable, TemplateRef } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { ColumnDefinitionsContainer } from 'src/app/shared/tables/models';
import { ColDefBuilderFactoryService } from 'src/app/shared/tables/services';

import { FactServicesModule } from '../../fact-services.module';
import { FactOverviewEntryVm } from '../view-models';

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
      .startBuilding<FactOverviewEntryVm>()
      .withColumn('id', 'ID', 'id-cell').bindingTo('id')
      .withColumn('creationDate', marker('common.created'), 'creation-cell').bindingTo('creationDateDescription')
      .withColumn('questionText', marker('common.question')).bindingTo('questionText')
      .withColumn('actions', '', 'button-cell').withTemplate(actionsTemplate)
      .build();
  }
}
