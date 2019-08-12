import { ColumnDefinitionsContainer } from '../models';

import { IColDefBuilderService } from '.';

export interface IColDefBuilderOrchestratorService {
  withColumn(columnKey: string, headerDescription: string, className?: string): IColDefBuilderService;
  build(): ColumnDefinitionsContainer;
}
