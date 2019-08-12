import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatDependenciesModule } from 'src/app//mat-deps';
import { BusyIndicationModule } from 'src/app/shared/busy-indication/busy-indication.module';
import { AppAreaProviderToken } from 'src/app/shell/app-areas/constants';

import { HomeAreaProviderService } from './common/services/home-area-provider.service';
import { HomeComponent } from './entry-point/components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { WelcomeComponent } from './welcome/components/welcome/welcome.component';

@NgModule({
  declarations: [HomeComponent, WelcomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatDependenciesModule,
    BusyIndicationModule,
    TranslateModule
  ]
})
export class HomeModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: HomeModule,
      providers: [
        {
          provide: AppAreaProviderToken,
          multi: true,
          useClass: HomeAreaProviderService
        }
      ]
    };
  }
}
