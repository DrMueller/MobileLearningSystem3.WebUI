import { ISecurityState } from '.';
import { ILearningSesionsState } from '.';

export interface IAppState {
  security: ISecurityState;
  learningSessions: ILearningSesionsState;
}
