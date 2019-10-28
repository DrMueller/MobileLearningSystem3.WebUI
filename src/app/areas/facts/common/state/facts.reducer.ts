import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState, initialAppState } from 'src/app/shell/app-state';
import { addOrReplaceArrayEntry, deleteArrayEntry } from 'src/app/utils/array-utils';

import { Fact } from '../models';

import { FactsActions } from '.';
import { FactsActionTypes } from './facts-action.types';

export interface IFactsState extends IAppState {
  facts: Fact[];
  currentFact: Fact | null;
}

export const factsFeatureKey = 'facts';
const getFeatureState = createFeatureSelector<IFactsState>(factsFeatureKey);

export const selectCurrentFact = createSelector(
  getFeatureState,
  state => state.currentFact
);

export const selectAllFacts = createSelector(
  getFeatureState,
  state => state.facts
);

export const initialState: IFactsState = {
  security: initialAppState.security,
  router: initialAppState.router,
  facts: [],
  currentFact: new Fact()
};

export function factsReducer(state = initialState, action: FactsActions): IFactsState {
  switch (action.type) {
    case FactsActionTypes.LoadAllFactsSuccess: {
      return <IFactsState>{
        ...state,
        facts: action.entries
      };
    }

    case FactsActionTypes.DeleteFactSuccess: {
      return <IFactsState>{
        ...state,
        facts: deleteArrayEntry(state.facts, f => f.id === action.deleteId)
      };
    }

    case FactsActionTypes.DeleteAllFactsSuccess: {
      return <IFactsState>{
        ...state,
        facts: [],
        currentFact: null
      };
    }

    case FactsActionTypes.SaveFactSuccess: {
      const newFacts = addOrReplaceArrayEntry(
        state.facts,
        action.savedFact,
        (a, b) => a.id === b.id);

      return <IFactsState>{
        ...state,
        overview: newFacts
      };
    }

    case FactsActionTypes.LoadFactSuccess: {
      const newFacts = addOrReplaceArrayEntry(
        state.facts,
        action.fact,
        (a, b) => a.id === b.id);

      return <IFactsState>{
        ...state,
        currentFact: action.fact,
        overview: newFacts
      };
    }

    default:
      return state;
  }
}
