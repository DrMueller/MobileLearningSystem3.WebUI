import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { EditorModule } from 'primeng/editor';
import { MatDependenciesModule } from 'src/app//mat-deps';
import { EnquiryDialogModule } from 'src/app/shared/enquiry-dialog';
import { RxFormsModule } from 'src/app/shared/rx-forms';
import { TablesModule } from 'src/app/shared/tables';
import { AppAreaProviderToken } from 'src/app/shell/app-areas/constants';

import { FactsAreaProviderService } from './common/services';
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
    EditorModule,
    EnquiryDialogModule,
    FactsRoutingModule,
    FactServicesModule,
    MatDependenciesModule,
    TablesModule,
    TextFieldModule,
    TranslateModule,
    RxFormsModule
  ]
})
export class FactsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: FactsModule,
      providers: [
        {
          provide: AppAreaProviderToken,
          multi: true,
          useClass: FactsAreaProviderService
        }
      ]
    };
  }
}
