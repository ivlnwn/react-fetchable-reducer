import {makeFetch} from './api/core';
import {useFetchableArrayApi} from './hooks/useFetchableArrayApi';
import * as FetchableActions from './reducers/fetchable/actions';
import {createFetchableReducer} from './reducers/fetchable/fetchableReducer';
import {createFetchableArrayReducer} from './reducers/fetchable/fetchableArrayReducer';
import {withExtraActions} from './reducers/fetchable/utils';
import * as FetchableTypes from './reducers/fetchable/types';
import {createFetchableSelectors} from './selectors/fetchable/selectors';
import {createFetchableArraySelectors} from './selectors/fetchable/arraySelectors';

export const FetchableReducer = {
  makeFetch,
  useFetchableArrayApi,
  actions: FetchableActions,
  createReducer: createFetchableReducer,
  createArrayReducer: createFetchableArrayReducer,
  withExtraActions,
  types: FetchableTypes,
  createSelectors: createFetchableSelectors,
  createArraySelectors: createFetchableArraySelectors,
};


import {ClassicActions} from './reducers/classic/actions';
import {createReducer as createClassicReducer} from './reducers/classic/reducer';
import {createArrayReducer as createClassicArrayReducer} from './reducers/classic/arrayReducer';
import {withExtraActions as withExtraActionsClassic} from './reducers/classic/utils';
import * as ClassicTypes from './reducers/classic/types';
import {createSelectors} from './selectors/classic/selectors';
import {createArraySelectors} from './selectors/classic/arraySelectors';

export const ClassicReducer = {
  withExtraActions: withExtraActionsClassic,
  types: ClassicTypes,
  object: {
    createReducer: createClassicReducer,
    createSelectors,
    actions: ClassicActions.object,
  },
  array: {
    createReducer: createClassicArrayReducer,
    createSelectors: createArraySelectors,
    actions: ClassicActions.array,
  }
};
