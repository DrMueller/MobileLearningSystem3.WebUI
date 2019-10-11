import { createFeatureSelector, createSelector } from '@ngrx/store';

export const securityFeatureKey = 'security';

const getSecurityState = createFeatureSelector<ISecurityState>(securityFeatureKey);

export const getUserIsLoggedIn = createSelector(
  getSecurityState,
  state => state.userIsLoggedIn
);

export const getUserName = createSelector(
  getSecurityState,
  state => state.userName
);

export interface ISecurityState {
  userIsLoggedIn: boolean;
  userName: string;
  userToken: string;
}
