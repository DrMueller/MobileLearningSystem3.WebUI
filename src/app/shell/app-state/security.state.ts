import { createFeatureSelector, createSelector } from '@ngrx/store';

const getSecurityState = createFeatureSelector<ISecurityState>('security');

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
}
