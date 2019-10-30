import { TemplateRef } from '@angular/core';

import { IColDefBuilderOrchestratorService } from '.';

export interface IColDefBuilderService<T> {
  bindingTo(propertyName: keyof T): IColDefBuilderOrchestratorService<T>;
  withTemplate(template: TemplateRef<any>): IColDefBuilderOrchestratorService<T>;
}
