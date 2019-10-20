import { LogInAction, LogOutAction } from './actions';
import { InitializeUserAction } from './actions/initialize-user.action';
import { PersistUserAction } from './actions/persist-user.action';
import { UserChangedAction } from './actions/user-changed.action';

export type SecurityActions =
  LogInAction | LogOutAction |
  PersistUserAction | UserChangedAction |
  InitializeUserAction;
