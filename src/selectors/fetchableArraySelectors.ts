import {FetchableArrayState, ModelWithId} from '../reducer/types';
import {createSelector, Selector} from 'reselect';

export interface FetchableArraySelectors<RootState, Model extends ModelWithId, ExtraModel = null> {
  getState: (state: RootState) => FetchableArrayState<Model, ExtraModel>;
  getAll: () => Selector<RootState, Model[]>;
  getById: (id: Model['id']) => Selector<RootState, Model | undefined>;
  getByIds: (ids: Model['id'][]) => Selector<RootState, Model[]>;
  getIsFetching: () => Selector<RootState, boolean>;
}

export function createFetchableArraySelectors<
  RootState,
  Model extends ModelWithId,
  ExtraModel = null
>(reducer: keyof RootState): FetchableArraySelectors<RootState, Model, ExtraModel> {
  const getState = (state: RootState): FetchableArrayState<Model, ExtraModel> =>
    (state[reducer] as unknown) as FetchableArrayState<Model, ExtraModel>;

  const getAll = (): Selector<RootState, Model[]> =>
    createSelector(getState, (state) => {
      return Object.values(state.data.byId ?? {});
    });

  const getById = (id: Model['id']): Selector<RootState, Model | undefined> =>
    createSelector(getState, (state) => {
      return state.data.byId[id];
    });

  const getByIds = (ids: Model['id'][]): Selector<RootState, Model[]> =>
    createSelector(getState, (state) => {
      return (
        ids.reduce((current, item) => {
          if (state.data.byId[item]) {
            return [...current, state.data.byId[item]];
          } else {
            return current;
          }
        }, [] as Model[]) ?? []
      );
    });

  const getIsFetching = (): Selector<RootState, boolean> =>
    createSelector(getState, (state) => {
      return state.isLoading;
    });

  return {
    getState,
    getAll,
    getById,
    getByIds,
    getIsFetching,
  };
}
