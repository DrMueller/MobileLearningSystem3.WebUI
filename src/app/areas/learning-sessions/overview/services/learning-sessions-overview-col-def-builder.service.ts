import { Injectable, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ColumnDefinitionsContainer } from 'src/app/shared/tables/models';
import { ColDefBuilderFactoryService } from 'src/app/shared/tables/services';

import { LearningSessionsServicesModule } from '../../learning-sessions-services.module';
import { LearningSessionOverviewEntry } from '../models';

@Injectable({
  providedIn: LearningSessionsServicesModule
})
export class LearningSessionsOverviewColDefBuilderService {
  public constructor(
    private builderFactory: ColDefBuilderFactoryService,
    private translator: TranslateService) { }

  public async buildDefinitionsAsync(
    editTemplate: TemplateRef<any>,
    deleteTemplate: TemplateRef<any>): Promise<ColumnDefinitionsContainer> {

    const amountHeading = await this.translator.get('areas.learning-sessions.overview.services.amountOfFacts').toPromise();
    const sessionNameHeading = await this.translator.get('common.name').toPromise();

    return this.builderFactory
      .startBuilding()
      .withColumn('id', 'ID', 'id-cell').bindingTo<LearningSessionOverviewEntry>('id')
      .withColumn('questionText', amountHeading, 'facts-cell').bindingTo<LearningSessionOverviewEntry>('amountOfFacts')
      .withColumn('name', sessionNameHeading).bindingTo<LearningSessionOverviewEntry>('sessionName')
      .withColumn('editTemplate', '', 'button-cell').withTemplate(editTemplate)
      .withColumn('deleteTemplate', '', 'button-cell').withTemplate(deleteTemplate)
      .build();
  }
}
