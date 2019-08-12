import { Injectable, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ColumnDefinitionsContainer } from 'src/app/shared/tables/models';
import { ColDefBuilderFactoryService } from 'src/app/shared/tables/services';

import { FactOverviewEntry } from '../../../shared-domain/models/fact-overview-entry.model';
import { FactServicesModule } from '../../fact-services.module';

@Injectable({
  providedIn: FactServicesModule
})
export class FactsOverviewColDefBuilderService {
  public constructor(
    private builderFactory: ColDefBuilderFactoryService,
    private translator: TranslateService) { }

  public async buildDefinitionsAsync(
    editTemplate: TemplateRef<any>,
    deleteTemplate: TemplateRef<any>
  ): Promise<ColumnDefinitionsContainer> {

    const questionHeading = await this.translator.get('areas.facts.overview.services.questionHeading').toPromise();
    const createdHeading = await this.translator.get('common.created').toPromise();

    return this.builderFactory
      .startBuilding()
      .withColumn('id', 'ID', 'id-cell').bindingTo<FactOverviewEntry>('id')
      .withColumn('creationDate', createdHeading, 'creation-cell').bindingTo<FactOverviewEntry>('creationDateDescription')
      .withColumn('questionText', questionHeading).bindingTo<FactOverviewEntry>('questionText')
      .withColumn('editTemplate', '', 'button-cell').withTemplate(editTemplate)
      .withColumn('deleteTemplate', '', 'button-cell').withTemplate(deleteTemplate)
      .build();
  }
}
