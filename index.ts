import {makeFetch} from './src/api/core';
import {useFetchableArrayApi} from './src/hooks/useFetchableArrayApi';
import * as FetchableActions from './src/reducers/fetchable/actions';
import {createFetchableReducer} from './src/reducers/fetchable/fetchableReducer';
import {createFetchableArrayReducer} from './src/reducers/fetchable/fetchableArrayReducer';
import {withExtraActions} from './src/reducers/fetchable/utils';
import * as FetchableTypes from './src/reducers/fetchable/types';
import {createFetchableSelectors} from './src/selectors/fetchable/selectors';
import {createFetchableArraySelectors} from './src/selectors/fetchable/arraySelectors';

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

import {ClassicActions} from './src/reducers/classic/actions';
import {createReducer as createClassicReducer} from './src/reducers/classic/reducer';
import {createArrayReducer as createClassicArrayReducer} from './src/reducers/classic/arrayReducer';
import {withExtraActions as withExtraActionsClassic} from './src/reducers/classic/utils';
import * as ClassicTypes from './src/reducers/classic/types';
import {createSelectors} from './src/selectors/classic/selectors';
import {createArraySelectors} from './src/selectors/classic/arraySelectors';

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
