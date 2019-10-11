import { ISecurityState } from '../../app-state';

import { SecurityActionTypes } from './security-action.types';
import { SecurityActions } from './security.actions';

const initialSecurityState: ISecurityState = {
  userIsLoggedIn: false,
  userName: ''
};

export function securityReducer(state: ISecurityState = initialSecurityState, actions: SecurityActions): ISecurityState {
  switch (actions.type) {
    case SecurityActionTypes.SetSecurityUser:
      return {
        ...state,
        userIsLoggedIn: actions.userIsLoggedIn,
        userName: actions.userName
      };

    default:
      return state;
  }
}
