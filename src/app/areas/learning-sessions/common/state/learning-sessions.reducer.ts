import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LearningSession } from 'src/app/areas/shared-domain/models';
import { IAppState, initialAppState } from 'src/app/shell/app-state';

import { LearningSessionsActionTypes } from './learning-sessions-action.types';
import { LearningSessionsActions } from './learning-sessions.actions';

export const learningSessionsFeatureKey = 'learningSessions';

const getFeatureState = createFeatureSelector<ILearningSessionsState>(learningSessionsFeatureKey);

export const getSessions = createSelector(
  getFeatureState,
  state => state.overview
);

export const getCurrentSession = createSelector(
  getFeatureState,
  state => state.currentSession
);

export const getSelectedSession = createSelector(
  getFeatureState,
  state => state.selectedSessionId
);

export interface ILearningSessionsState extends IAppState {
  overview: LearningSession[];
  currentSession: LearningSession;
  selectedSessionId: number;
}

export interface ILearningSessionOverviewEntry {
  amountOfFacts: number;
  id: number;
  sessionName: string;
}

export const initialState: ILearningSessionsState = {
  overview: [],
  security: initialAppState.security,
  currentSession: new LearningSession(),
  selectedSessionId: 0,
  router: initialAppState.router,
};

export function learningSessionsReducer(state = initialState, action: LearningSessionsActions): ILearningSessionsState {
  switch (action.type) {
    case LearningSessionsActionTypes.LoadAllLearningSessionsSuccess: {
      return <ILearningSessionsState>{
        ...state,
        overview: action.overview
      };
    }

    case LearningSessionsActionTypes.SaveLearningSessionSuccess: {
      return <ILearningSessionsState>{
        ...state,
        currentSession: action.savedLearningSession
      };
    }

    case LearningSessionsActionTypes.DeleteSuccess: {
      const mappedOverview = Array.from(state.overview);
      const index = state.overview.findIndex(f => f.id === action.deletedId);

      if (index > -1) {
        mappedOverview.splice(index, 1);
      }

      return <ILearningSessionsState>{
        ...state,
        overview: mappedOverview
      };
    }

    // case LearningSessionsActionTypes.LoadRunFactsSuccess: {
    //   const runFacts = ArrayExtensions.shuffleEntries(action.runFacts);
    //   let selectedRunFact: RunFact | undefined;
    //   if (runFacts.length > 0) {
    //     selectedRunFact = runFacts[0];
    //   }

    //   return <ILearningSessionsState>{
    //     ...state,
    //     runFacts: runFacts,
    //     selectedRunFact: selectedRunFact
    //   };
    // }

    // case LearningSessionsActionTypes.SelectSession: {
    //   return <ILearningSessionsState>{
    //     ...state,
    //     selectedSessionId: action.sessionId
    //   };
    // }

    // case LearningSessionsActionTypes.SelectNextRunFact: {
    //   return <ILearningSessionsState>{
    //     ...state,
    //     selectedRunFact: state.runFacts[state.runFacts.indexOf(state.selectedRunFact!) + 1]
    //   };
    // }

    // case LearningSessionsActionTypes.SelectPreviousRunFact: {
    //   return <ILearningSessionsState>{
    //     ...state,
    //     selectedRunFact: state.runFacts[state.runFacts.indexOf(state.selectedRunFact!) - 1]
    //   };
    // }

    // case LearningSessionsActionTypes.ReshuffleRunFacts: {
    //   const runFacts = ArrayExtensions.shuffleEntries(state.runFacts);
    //   let selectedRunFact: RunFact | undefined;
    //   if (runFacts.length > 0) {
    //     selectedRunFact = runFacts[0];
    //   }

    //   return <ILearningSessionsState>{
    //     ...state,
    //     runFacts: runFacts,
    //     selectedRunFact: selectedRunFact
    //   };
    // }

    // case LearningSessionsActionTypes.SelectNextSessionRunFactsSuccess: {
    //   return <ILearningSessionsState>{
    //     ...state,
    //     selectedSessionId: action.newSessionId
    //   };
    // }

    default:
      return state;
  }
}
