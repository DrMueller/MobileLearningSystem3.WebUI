import * as fromRouter from '@ngrx/router-store';
import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

import { initialSecurityState, ISecurityState } from '../security/state';

export const routerFeatureKey = 'router';
export const selectRouterFeature = createFeatureSelector<IAppState, fromRouter.RouterReducerState<any>>(routerFeatureKey);

export const {
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(selectRouterFeature);

export const initialAppState: IAppState = {
  security: initialSecurityState,
  router: <RouterReducerState<any>>{
    navigationId: 0,
    state: undefined
  }
};

export interface IAppState {
  security: ISecurityState;
  router: fromRouter.RouterReducerState<any>;
}
