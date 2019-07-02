import { TemplateRef } from '@angular/core';

import { IColDefBuilderOrchestratorService, IColDefBuilderService } from '..';
import { ColumnDefinitionBase } from '../../models/col-defs';
import { IColDefValueBuilderService, BindingColDefValueBuilderService, TemplateColDefValueBuilderService } from './col-def-values';

export class ColDefBuilderService implements IColDefBuilderService {
  private _valueBuilder: IColDefValueBuilderService;

  public constructor(
    private orchestrator: IColDefBuilderOrchestratorService,
    private columnKey: string,
    private headerDescription: string,
    private className?: string) {
  }

  public bindingTo<T>(propertyName: keyof T): IColDefBuilderOrchestratorService {
    this._valueBuilder = new BindingColDefValueBuilderService(
      this.columnKey,
      this.headerDescription,
      propertyName,
      this.className);

    return this.orchestrator;
  }

  public withTemplate(template: TemplateRef<any>): IColDefBuilderOrchestratorService {
    this._valueBuilder = new TemplateColDefValueBuilderService(
      this.columnKey,
      this.headerDescription,
      template,
      this.className);

    return this.orchestrator;
  }

  public build(): ColumnDefinitionBase {
    return this._valueBuilder.build();
  }
}
