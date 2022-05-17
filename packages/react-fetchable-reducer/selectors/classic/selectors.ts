import {createSelector, Selector} from 'reselect';

interface ReturnType<RootState, Model> {
  getState: (state: RootState) => Model;
  get: () => Selector<RootState, Model>;
}

export function createSelectors<RootState, Model>(
  reducer: keyof RootState,
): ReturnType<RootState, Model> {
  const getState = (state: RootState): Model =>
    (state[reducer] as unknown) as Model;

  const get = (): Selector<RootState, Model> =>
    createSelector(getState, (state) => {
      return state;
    });

  return {
    getState,
    get,
  };
}
