import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { WebcamModule } from 'ngx-webcam';
import { MatDependenciesModule } from 'src/app//mat-deps';
import { AppAreaProviderToken } from 'src/app/shell/app-areas/constants';

import { TensorflowAreaProviderService } from './common/services/tensorflow-area-provider.service';
import { TensorflowComponent } from './entry-point/tensorflow';
import { TensorflowRoutingModule } from './tensorflow-routing.module';
import { WebcamClassifierComponent } from './webcam/components/webcam-classifier';

@NgModule({
  declarations: [
    WebcamClassifierComponent,
    TensorflowComponent
  ],
  imports: [
    CommonModule,
    TensorflowRoutingModule,
    TranslateModule,
    MatDependenciesModule,
    WebcamModule
  ]
})
export class TensorflowModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: TensorflowModule,
      providers: [
        {
          provide: AppAreaProviderToken,
          multi: true,
          useClass: TensorflowAreaProviderService
        }
      ]
    };
  }
}
