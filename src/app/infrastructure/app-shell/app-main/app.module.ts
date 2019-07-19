import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

import { MatDependenciesModule } from '../../mat-dependencies';
import { BusyIndicationModule } from '../../shared-features/busy-indication/busy-indication.module';
import { RxFormsModule } from '../../shared-features/rx-forms';
import { AppNavigationModule } from '../app-navigation/app-navigation.module';
import { ErrorHandlingModule } from '../error-handling';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppNavigationModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    BusyIndicationModule,
    ErrorHandlingModule.forRoot(),
    HttpClientModule,
    MatDependenciesModule.forRoot(),
    RxFormsModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
