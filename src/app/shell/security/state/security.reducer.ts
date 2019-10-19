import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ISecurityState } from '../../app-state';

import { SecurityActionTypes } from './security-action.types';
import { SecurityActions } from './security.actions';

export const securityFeatureKey = 'security';

export const initialSecurityState: ISecurityState = {
  userIsLoggedIn: false,
  userName: '',
  userToken: ''
};

const getFeature = createFeatureSelector<ISecurityState>(securityFeatureKey);

export const getUserIsLoggedIn = createSelector(
  getFeature,
  state => state.userIsLoggedIn
);

export function securityReducer(state: ISecurityState = initialSecurityState, actions: SecurityActions): ISecurityState {
  switch (actions.type) {
    case SecurityActionTypes.SetSecurityUser:
      return {
        ...state,
        userIsLoggedIn: actions.userIsLoggedIn,
        userName: actions.userName,
        userToken: actions.userToken
      };

    default:
      return state;
  }
}
