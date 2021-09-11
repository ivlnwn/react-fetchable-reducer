import {FetchableState} from '../reducer/types';
import {createSelector, Selector} from 'reselect';

export interface FetchableSelectors<RootState, Model, ExtraModel = null> {
  getState: (state: RootState) => FetchableState<Model, ExtraModel>;
  get: () => Selector<RootState, Model | undefined>;
  getIsFetching: () => Selector<RootState, boolean>;
}

export function createFetchableSelectors<RootState, Model, ExtraModel = null>(
  reducer: keyof RootState,
): FetchableSelectors<RootState, Model, ExtraModel> {
  const getState = (state: RootState): FetchableState<Model, ExtraModel> =>
    (state[reducer] as unknown) as FetchableState<Model, ExtraModel>;

  const get = (): Selector<RootState, Model | undefined> =>
    createSelector(getState, (state) => {
      return state.data;
    });

  const getIsFetching = (): Selector<RootState, boolean> =>
    createSelector(getState, (state) => {
      return state.isLoading;
    });

  return {
    getState,
    get,
    getIsFetching,
  };
}
