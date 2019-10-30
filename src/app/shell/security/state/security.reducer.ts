import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SecurityUser } from '../models';

import { SecurityActionTypes } from './security-action.types';
import { SecurityActions } from './security.actions';

export const securityFeatureKey = 'security';

export const initialSecurityState: ISecurityState = {
  user: new SecurityUser()
};

const getFeature = createFeatureSelector<ISecurityState>(securityFeatureKey);

const getUserState = createSelector(
  getFeature,
  state => state.user
);

export const getUserIsAuthenticated = createSelector(
  getUserState,
  state => state.isAuthenticated
);

export const getUserToken = createSelector(
  getUserState,
  state => state.token
);

export const getUserName = createSelector(
  getUserState,
  state => state.userName
);

export interface ISecurityState {
  user: SecurityUser;
}

export function securityReducer(state: ISecurityState = initialSecurityState, action: SecurityActions): ISecurityState {
  switch (action.type) {
    case SecurityActionTypes.UserChanged:
      return {
        ...state,
        user: action.user
      };

    default:
      return state;
  }
}
