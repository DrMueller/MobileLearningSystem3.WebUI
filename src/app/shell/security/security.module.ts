import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { MatDependenciesModule } from 'src/app/mat-deps';
import { BusyIndicationModule } from 'src/app/shared/busy-indication/busy-indication.module';
import { RxFormsModule } from 'src/app/shared/rx-forms';

import { LogInComponent } from './components/log-in/log-in.component';
import { BearerAuthInterceptor } from './interceptors';
import { SecurityEffects } from './state/security.effects';

@NgModule({
  declarations: [
    LogInComponent
  ],
  imports: [
    BusyIndicationModule,
    CommonModule,
    RxFormsModule,
    MatDependenciesModule,
    EffectsModule.forFeature([SecurityEffects]),
    TranslateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BearerAuthInterceptor,
      multi: true
    }
  ]
})
export class SecurityModule { }
