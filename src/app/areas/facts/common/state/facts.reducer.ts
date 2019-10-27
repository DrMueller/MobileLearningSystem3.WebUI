import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Fact } from 'src/app/areas/shared-domain/models';
import { IAppState, initialAppState } from 'src/app/shell/app-state';

import { FactsActions } from '.';
import { FactsActionTypes } from './facts-action.types';

export const factsFeatureKey = 'facts';

export interface IFactsState extends IAppState {
  facts: Fact[];
  currentFact: Fact | null;
}

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
      const mappedOverview = Array.from(state.facts);
      const index = state.facts.findIndex(f => f.id === action.deleteId);

      if (index > -1) {
        mappedOverview.splice(index, 1);
      }

      return <IFactsState>{
        ...state,
        facts: mappedOverview
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
      let newFacts: Fact[];
      const existingEntry = state.facts.find(f => f.id === action.savedFact.id);
      if (!existingEntry) {
        newFacts = Array.from(state.facts);
        newFacts.push(action.savedFact);
      } else {
        newFacts = state.facts.map(itm => itm.id === action.savedFact.id ? action.savedFact : itm);
      }

      return <IFactsState>{
        ...state,
        overview: newFacts
      };
    }

    case FactsActionTypes.LoadFactSuccess: {
      let newFacts: Fact[];
      const existingEntry = state.facts.find(f => f.id === action.fact.id);
      if (!existingEntry) {
        newFacts = Array.from(state.facts);
        newFacts.push(action.fact);
      } else {
        newFacts = state.facts.map(itm => itm.id === action.fact.id ? action.fact : itm);
      }

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
