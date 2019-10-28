import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState, initialAppState } from 'src/app/shell/app-state';
import { addOrReplaceArrayEntry as addOrReplaceArrayEntry } from 'src/app/utils/array-utils/add-or-replace-array-entry.func';
import { deleteArrayEntry } from 'src/app/utils/array-utils/delete-array-entry.func';

import { LearningSession } from '../models/learning-session.model';

import { LearningSessionsActionTypes } from './learning-sessions-action.types';
import { LearningSessionsActions } from './learning-sessions.actions';

export const learningSessionsFeatureKey = 'learningSessions';

const getFeatureState = createFeatureSelector<ILearningSessionsState>(learningSessionsFeatureKey);

export const selectAllLearningSessions = createSelector(
  getFeatureState,
  state => state.learningSessions
);

export const selectCurrentLearningSession = createSelector(
  getFeatureState,
  state => state.currentSession
);

export interface ILearningSessionsState extends IAppState {
  learningSessions: LearningSession[];
  currentSession: LearningSession | null;
  selectedSessionId: number;
}

export interface ILearningSessionOverviewEntry {
  amountOfFacts: number;
  id: number;
  sessionName: string;
}

export const initialState: ILearningSessionsState = {
  learningSessions: [],
  security: initialAppState.security,
  currentSession: null,
  selectedSessionId: 0,
  router: initialAppState.router,
};

export function learningSessionsReducer(state = initialState, action: LearningSessionsActions): ILearningSessionsState {
  switch (action.type) {
    case LearningSessionsActionTypes.LoadAllLearningSessionsSuccess: {
      return <ILearningSessionsState>{
        ...state,
        learningSessions: action.overview
      };
    }

    case LearningSessionsActionTypes.SaveLearningSessionSuccess: {
      const newSessions = addOrReplaceArrayEntry(
        state.learningSessions,
        action.savedLearningSession,
        (a, b) => a.id === b.id);

      return <ILearningSessionsState>{
        ...state,
        learningSessions: newSessions,
        currentSession: action.savedLearningSession
      };
    }

    case LearningSessionsActionTypes.DeleteLearningSessionSuccess: {
      return <ILearningSessionsState>{
        ...state,
        learningSessions: deleteArrayEntry(state.learningSessions, f => f.id === action.deletedId)
      };
    }

    case LearningSessionsActionTypes.DeleteAllLearningSessionsSuccess: {
      return <ILearningSessionsState>{
        ...state,
        currentSession: null,
        learningSessions: [],
      };
    }

    case LearningSessionsActionTypes.LoadLearningSessionSuccess: {
      const newSessions = addOrReplaceArrayEntry(
        state.learningSessions,
        action.learningSession,
        (a, b) => a.id === b.id);

      return <ILearningSessionsState>{
        ...state,
        currentSession: action.learningSession,
        learningSessions: newSessions
      };
    }

    default:
      return state;
  }
}
