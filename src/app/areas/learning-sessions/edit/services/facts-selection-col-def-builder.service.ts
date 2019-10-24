import { Injectable, TemplateRef } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Fact } from 'src/app/areas/shared-domain/models';
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
      .withColumn('id', 'ID', 'id-cell').bindingTo<Fact>('id')
      .withColumn('creationDate', marker('common.created'), 'creation-cell').bindingTo<Fact>('creationDate')
      .withColumn('existsInRun', marker('areas.learning-sessions.edit.services.inRun')).withTemplate(existsInRunTemplate)
      .withColumn('questionText', marker('common.question')).bindingTo<Fact>('questionText')
      .build();
  }
}
