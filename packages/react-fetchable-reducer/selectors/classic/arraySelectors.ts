import {ArrayState, ModelWithId} from '../../reducers/classic/types';
import {createSelector, Selector} from 'reselect';

interface ReturnType<RootState, Model extends ModelWithId> {
  getState: (state: RootState) => ArrayState<Model>;
  getAll: () => Selector<RootState, Model[]>;
  getById: (id: Model['id']) => Selector<RootState, Model | undefined>;
  getByIds: (ids: Model['id'][]) => Selector<RootState, Model[]>;
}

export function createArraySelectors<
  RootState,
  Model extends ModelWithId
>(reducer: keyof RootState): ReturnType<RootState, Model> {
  const getState = (state: RootState): ArrayState<Model> =>
    (state[reducer] as unknown) as ArrayState<Model>;

  const getAll = (): Selector<RootState, Model[]> =>
    createSelector(getState, (state) => {
      return Object.values(state.byId ?? {});
    });

  const getById = (id: Model['id']): Selector<RootState, Model | undefined> =>
    createSelector(getState, (state) => {
      return state.byId[id];
    });

  const getByIds = (ids: Model['id'][]): Selector<RootState, Model[]> =>
    createSelector(getState, (state) => {
      return (
        ids.reduce((current, item) => {
          if (state.byId[item]) {
            return [...current, state.byId[item]];
          } else {
            return current;
          }
        }, [] as Model[]) ?? []
      );
    });

  return {
    getState,
    getAll,
    getById,
    getByIds,
  };
}
