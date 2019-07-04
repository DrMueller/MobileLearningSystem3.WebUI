import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDependenciesModule } from 'src/app/infrastructure/mat-dependencies';
import { RxFormsModule } from 'src/app/infrastructure/shared-features/rx-forms';
import { TablesModule } from 'src/app/infrastructure/shared-features/tables';

import { FactEditComponent } from './edit/components/fact-edit';
import { FactsComponent } from './entry-point/components/facts';
import { FactServicesModule } from './fact-services.module';
import { FactsRoutingModule } from './facts-routing.module';
import { FactsOverviewComponent } from './overview/components/facts-overview';

@NgModule({
  declarations: [
      FactEditComponent,
      FactsComponent,
      FactsOverviewComponent
  ],
  imports: [
    CommonModule,
    FactsRoutingModule,
    FactServicesModule,
    MatDependenciesModule,
    TablesModule,
    RxFormsModule
  ]
})
export class FactsModule { }
