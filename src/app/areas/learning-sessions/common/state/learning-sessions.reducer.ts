import { Action } from '@ngrx/store';
import { ILearningSesionsState } from 'src/app/shell/app-state';

export const initialState: ILearningSesionsState = {

};

export function reducer(state = initialState, action: Action): ILearningSesionsState {
  switch (action.type) {

    default:
      return state;
  }
}
