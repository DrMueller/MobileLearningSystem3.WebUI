import { TemplateRef } from '@angular/core';

import { IColDefBuilderOrchestratorService, IColDefBuilderService } from '..';
import { ColumnDefinitionBase } from '../../models/col-defs';

import { BindingColDefValueBuilderService, IColDefValueBuilderService, TemplateColDefValueBuilderService } from './col-def-values';

export class ColDefBuilderService<T> implements IColDefBuilderService<T> {
  private _valueBuilder: IColDefValueBuilderService;

  public constructor(
    private orchestrator: IColDefBuilderOrchestratorService<T>,
    private columnKey: string,
    private headerTranslationKey: string,
    private className?: string) {
  }

  public bindingTo(propertyName: keyof T): IColDefBuilderOrchestratorService<T> {
    this._valueBuilder = new BindingColDefValueBuilderService(
      this.columnKey,
      this.headerTranslationKey,
      propertyName,
      this.className);

    return this.orchestrator;
  }

  public withTemplate(template: TemplateRef<any>): IColDefBuilderOrchestratorService<T> {
    this._valueBuilder = new TemplateColDefValueBuilderService(
      this.columnKey,
      this.headerTranslationKey,
      template,
      this.className);

    return this.orchestrator;
  }

  public build(): ColumnDefinitionBase {
    return this._valueBuilder.build();
  }
}
