import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Fact } from 'src/app/areas/shared-domain/models';
import { IAppState, initialAppState } from 'src/app/shell/app-state';

import { FactsActions } from '.';
import { FactsActionTypes } from './facts-action.types';

export const factsFeatureKey = 'facts';

export interface IFactsState extends IAppState {
  facts: Fact[];
  currentFact: Fact;
}

const getFeatureState = createFeatureSelector<IFactsState>(factsFeatureKey);

export const selectFact = createSelector(
  getFeatureState,
  state => (id: number) => state.facts.find(f => f.id === id)
);

export const selectFacts = createSelector(
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

    case FactsActionTypes.SaveFactSuccess: {
      const mappedOverview = state.facts.map(itm => itm.id === action.savedFact.id ? action.savedFact : itm);

      return <IFactsState>{
        ...state,
        overview: mappedOverview
      };
    }

    default:
      return state;
  }
}
