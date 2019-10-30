import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { securityReducer } from '../security/state';

import { IAppState, routerFeatureKey } from '.';

const reducers: ActionReducerMap<IAppState> = {
  router: routerReducer,
  security: securityReducer
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreRouterConnectingModule.forRoot({ stateKey: routerFeatureKey }),
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        // strictStateImmutability: true,
        // strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot([]),
  ]
})
export class AppStateModule { }
