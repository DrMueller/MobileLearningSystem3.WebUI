import { Injectable } from '@angular/core';
import { ColDefBuilderFactoryService } from 'src/app/infrastructure/shared-features/tables/services';
import { ColumnDefinitionsContainer } from 'src/app/infrastructure/shared-features/tables/models';
import { FactOverviewEntry } from '../models/fact-overview-entry.model';

@Injectable({
  providedIn: 'root'
})
export class FactsOverviewColDefBuilderService {
  public constructor(private builderFactory: ColDefBuilderFactoryService) { }

  public buildDefinitions(): ColumnDefinitionsContainer {
      return this.builderFactory
          .startBuilding()
          .withColumn('id', 'ID', 'id-cell').bindingTo<FactOverviewEntry>('id')
          .withColumn('creationDate', 'Created', 'creation-cell').bindingTo<FactOverviewEntry>('creationDate')
          .withColumn('questionText', 'Question').bindingTo<FactOverviewEntry>('questionText')
          .build();
  }
}
