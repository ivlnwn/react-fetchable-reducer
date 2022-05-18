import {makeFetch} from './api/core';
import {useFetchableArrayApi} from './hooks/useFetchableArrayApi';
import {FetchableActions} from './reducers/fetchable/actions';
import {createFetchableReducer} from './reducers/fetchable/fetchableReducer';
import {createFetchableArrayReducer} from './reducers/fetchable/fetchableArrayReducer';
import {withExtraActions as withExtraActionsFetchable} from './reducers/fetchable/utils';
import * as FetchableTypes from './reducers/fetchable/types';
import {createFetchableSelectors} from './selectors/fetchable/selectors';
import {createFetchableArraySelectors} from './selectors/fetchable/arraySelectors';

export const FetchableReducer = {
  makeFetch,
  useFetchableArrayApi,
  withExtraActions: withExtraActionsFetchable,
  types: FetchableTypes,
  object: {
    createReducer: createFetchableReducer,
    createSelectors: createFetchableSelectors,
    actions: FetchableActions.object,
  },
  array: {
    createReducer: createFetchableArrayReducer,
    createSelectors: createFetchableArraySelectors,
    actions: FetchableActions.array,
  }
};

import {ClassicActions} from './reducers/classic/actions';
import {createReducer as createClassicReducer} from './reducers/classic/reducer';
import {createArrayReducer as createClassicArrayReducer} from './reducers/classic/arrayReducer';
import {withExtraActions as withExtraActionsClassic} from './reducers/classic/utils';
import * as ClassicTypes from './reducers/classic/types';
import {createSelectors as createClassicSelectors} from './selectors/classic/selectors';
import {createArraySelectors as createClassicArraySelectors} from './selectors/classic/arraySelectors';

export const ClassicReducer = {
  withExtraActions: withExtraActionsClassic,
  types: ClassicTypes,
  object: {
    createReducer: createClassicReducer,
    createSelectors: createClassicSelectors,
    actions: ClassicActions.object,
  },
  array: {
    createReducer: createClassicArrayReducer,
    createSelectors: createClassicArraySelectors,
    actions: ClassicActions.array,
  }
};
