import { ColumnDefinitionsContainer } from '../models';

import { IColDefBuilderService } from '.';

export interface IColDefBuilderOrchestratorService<T> {
  withColumn(columnKey: string, headerTranslationKey: string, className?: string): IColDefBuilderService<T>;
  build(): ColumnDefinitionsContainer;
}
