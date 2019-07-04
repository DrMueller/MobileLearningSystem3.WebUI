import { Injectable, TemplateRef } from '@angular/core';
import { ColumnDefinitionsContainer } from 'src/app/infrastructure/shared-features/tables/models';
import { ColDefBuilderFactoryService } from 'src/app/infrastructure/shared-features/tables/services';

import { LearningSessionOverviewEntry } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LearningSessionsOverviewColDefBuilderService {
  public constructor(private builderFactory: ColDefBuilderFactoryService) { }

  public buildDefinitions(
    editTemplate: TemplateRef<any>,
    deleteTemplate: TemplateRef<any>): ColumnDefinitionsContainer {
    return this.builderFactory
      .startBuilding()
      .withColumn('id', 'ID', 'id-cell').bindingTo<LearningSessionOverviewEntry>('id')
      .withColumn('questionText', 'Facts', 'facts-cell').bindingTo<LearningSessionOverviewEntry>('amountOfFacts')
      .withColumn('creationDate', 'Name').bindingTo<LearningSessionOverviewEntry>('sessionName')
      .withColumn('editTemplate', '', 'button-cell').withTemplate(editTemplate)
      .withColumn('deleteTemplate', '', 'button-cell').withTemplate(deleteTemplate)
      .build();
  }
}
