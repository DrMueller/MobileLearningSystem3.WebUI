import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FactsModule } from 'src/app/areas/facts';
import { HttpModule } from 'src/app/core/http';
import { MatDependenciesModule } from 'src/app/mat-deps';
import { BusyIndicationModule } from 'src/app/shared/busy-indication/busy-indication.module';
import { RxFormsModule } from 'src/app/shared/rx-forms';
import { environment } from 'src/environments/environment';

import { LocalizationModule } from '../../core/localization/localization.module';
import { AppInitService } from '../app-init/services';
import { AppNavigationModule } from '../app-navigation/app-navigation.module';
import { AppStateModule } from '../app-state/app-state.module';
import { ErrorHandlingModule } from '../error-handling';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

export function initializeApp(appInitService: AppInitService): Function {
  return () => appInitService.initializeAppAsync();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FactsModule,
    AppNavigationModule,
    AppRoutingModule,
    AppStateModule,
    BrowserModule,
    BrowserAnimationsModule,
    BusyIndicationModule,
    ErrorHandlingModule.forRoot(),
    HttpModule,
    HttpClientModule,
    LocalizationModule,
    MatDependenciesModule.forRoot(),
    RxFormsModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    TranslateModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitService],
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
