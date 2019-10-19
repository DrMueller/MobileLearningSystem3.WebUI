import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LearningSessionEditEntry } from 'src/app/areas/shared-domain/models';
import { IAppState } from 'src/app/shell/app-state';
import { initialSecurityState } from 'src/app/shell/security/state';

import { LearningSessionsActionTypes } from './learning-sessions-action.types';
import { LearningSessionsActions } from './learning-sessions.actions';

export const learningSessionsFeatureKey = 'learningSessions';

const getFeatureState = createFeatureSelector<ILearningSessionsState>(learningSessionsFeatureKey);

export const getOverview = createSelector(
  getFeatureState,
  state => state.overview
);

export const getCurrentSession = createSelector(
  getFeatureState,
  state => state.currentSession
);

export interface ILearningSessionsState extends IAppState {
  overview: ILearningSessionOverviewEntry[];
  currentSession: LearningSessionEditEntry;
}

export interface ILearningSessionOverviewEntry {
  amountOfFacts: number;
  id: number;
  sessionName: string;
}

export const initialState: ILearningSessionsState = {
  overview: [],
  security: initialSecurityState,
  currentSession: new LearningSessionEditEntry()
};

export function learningSessionsReducer(state = initialState, action: LearningSessionsActions): ILearningSessionsState {
  switch (action.type) {
    case LearningSessionsActionTypes.LoadOverviewSuccess: {
      return <ILearningSessionsState>{
        ...state,
        overview: action.overview
      };
    }

    case LearningSessionsActionTypes.LoadEditSuccess: {
      return <ILearningSessionsState>{
        ...state,
        currentSession: action.entry
      };
    }

    case LearningSessionsActionTypes.SaveEditSuccess: {
      const mappedOverview = state.overview.map(itm => itm.id === action.savedEntry.id ? action.savedEntry : itm);

      return <ILearningSessionsState>{
        ...state,
        overview: mappedOverview,
        currentSession: new LearningSessionEditEntry()
      };
    }

    default:
      return state;
  }
}
