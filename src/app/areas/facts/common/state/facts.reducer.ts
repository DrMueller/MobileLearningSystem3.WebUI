import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FactOverviewEntry } from 'src/app/areas/shared-domain/models';
import { FactEditEntry } from 'src/app/areas/shared-domain/models/fact-edit-entry.model';
import { IAppState, initialAppState } from 'src/app/shell/app-state';

import { FactsActions } from '.';
import { FactsActionTypes } from './facts-action.types';

export const factsFeatureKey = 'facts';

export interface IFactsState extends IAppState {
  overview: FactOverviewEntry[];
  detailsEntry: FactEditEntry;
}

const getFeatureState = createFeatureSelector<IFactsState>(factsFeatureKey);

export const selectDetails = createSelector(
  getFeatureState,
  state => state.detailsEntry
);

export const selecetOverview = createSelector(
  getFeatureState,
  state => state.overview
);

export const initialState: IFactsState = {
  security: initialAppState.security,
  router: initialAppState.router,
  overview: [],
  detailsEntry: new FactEditEntry()
};

export function factsReducer(state = initialState, action: FactsActions): IFactsState {
  switch (action.type) {
    case FactsActionTypes.LoadFactsOverviewSuccess: {
      return <IFactsState>{
        ...state,
        overview: action.entries
      };
    }

    case FactsActionTypes.LoadFactDetailsSuccess: {
      return <IFactsState>{
        ...state,
        detailsEntry: action.entry
      };
    }

    case FactsActionTypes.DeleteFactSuccess: {
      const mappedOverview = Array.from(state.overview);
      const index = state.overview.findIndex(f => f.id === action.deleteId);

      debugger;

      if (index > -1) {
        mappedOverview.splice(index, 1);
      }

      return <IFactsState>{
        ...state,
        overview: mappedOverview
      };
    }

    case FactsActionTypes.FactOverviewEntryLoadedSuccess: {
      const mappedOverview = state.overview.map(itm => itm.id === action.entry.id ? action.entry : itm);

      return <IFactsState>{
        ...state,
        overview: mappedOverview
      };
    }


    default:
      return state;
  }
}
