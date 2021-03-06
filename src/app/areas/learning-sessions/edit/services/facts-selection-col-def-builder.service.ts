import { Injectable, TemplateRef } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { ColumnDefinitionsContainer } from 'src/app/shared/tables/models';
import { ColDefBuilderFactoryService } from 'src/app/shared/tables/services';

import { LearningSessionsServicesModule } from '../../learning-sessions-services.module';
import { FactSelectionEntryVm } from '../view-models';

@Injectable({
  providedIn: LearningSessionsServicesModule
})
export class FactsSelectionColDefBuilderService {
  public constructor(private builderFactory: ColDefBuilderFactoryService) { }

  public buildDefinitions(existsInRunTemplate: TemplateRef<any>): ColumnDefinitionsContainer {
    return this.builderFactory
      .startBuilding<FactSelectionEntryVm>()
      .withColumn('id', 'ID', 'id-cell').bindingTo('id')
      .withColumn('creationDate', marker('common.created'), 'creation-cell').bindingTo('creationDateDescription')
      .withColumn('existsInRun', marker('areas.learning-sessions.edit.services.inRun'), 'in-run-cell').withTemplate(existsInRunTemplate)
      .withColumn('questionText', marker('common.question')).bindingTo('questionText')
      .build();
  }
}
