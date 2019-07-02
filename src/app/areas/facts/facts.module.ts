import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactsRoutingModule } from './facts-routing.module';
import { FactServicesModule } from './fact-services.module';
import { FactEditComponent } from './edit/components/fact-edit';
import { FactsComponent } from './entry-point/components/facts';
import { FactsOverviewComponent } from './overview/components/facts-overview';
import { TablesModule } from 'src/app/infrastructure/shared-features/tables';
import { RxFormsModule } from 'src/app/infrastructure/shared-features/rx-forms';
import { MatDependenciesModule } from 'src/app/infrastructure/mat-dependencies';

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
