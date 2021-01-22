import {
  CLEAR,
  FAILURE,
  FetchableArrayData,
  FetchableArrayState,
  FETCHING,
  SET_EXTRA_DATA,
  SUCCESS,
} from './types';
import {Action, Reducer} from 'redux';
import {getActionName} from './actions';
import merge from 'lodash.merge';

function parseModelsToData<Model>(models: Model[]): FetchableArrayData<Model> {
  return {
    allIds: models.map((o: any) => o.id),
    byId: models.reduce((obj, item: any) => Object.assign(obj, {[item.id]: item}), {}),
  };
}

export enum ItemUpdateMode {
  override = 'override',
  merge = 'merge',
}

function addModelsToData<Model>(
  data: FetchableArrayData<Model>,
  models: Model[],
  mode: ItemUpdateMode = ItemUpdateMode.override,
): FetchableArrayData<Model> {
  const newData = parseModelsToData(models);
  if (mode === ItemUpdateMode.override) {
    return {
      allIds: [...new Set([...data.allIds, ...newData.allIds])],
      byId: {...data.byId, ...newData.byId},
    };
  } else {
    return {
      allIds: [...new Set([...data.allIds, ...newData.allIds])],
      byId: merge({}, data.byId, newData.byId),
    };
  }
}

export enum StorageMode {
  override = 'override',
  supplement = 'supplement',
}

export function createFetchableArrayReducer<Model, ExtraModel = null>(
  reducerName: string,
  dataStorageMode: StorageMode = StorageMode.supplement,
  itemUpdateMode: ItemUpdateMode = ItemUpdateMode.override,
  initialData: Model[] = [],
): Reducer<FetchableArrayState<Model, ExtraModel>, Action> {
  return function fetchableArray(
    state: FetchableArrayState<Model, ExtraModel> = {
      isLoading: false,
      data: parseModelsToData(initialData),
      extraData: undefined,
      errorMessage: undefined,
    },
    action: any,
  ): FetchableArrayState<Model, ExtraModel> {
    switch (action.type) {
      /*
       * FETCHING ACTION
       */
      case getActionName(FETCHING, reducerName):
        return {
          ...state,
          isLoading: true,
          errorMessage: undefined,
        };
      /*
       * SUCCESS ACTION
       */
      case getActionName(SUCCESS, reducerName):
        if (!Array.isArray(action.payload)) {
          return {
            ...state,
            isLoading: false,
          };
        }
        if (dataStorageMode === StorageMode.supplement) {
          return {
            ...state,
            isLoading: false,
            data: addModelsToData(state.data, action.payload, itemUpdateMode),
            extraData: {...state.extraData, ...action.extraPayload},
          };
        } else {
          return {
            ...state,
            isLoading: false,
            data: parseModelsToData(action.payload),
            extraData: {...state.extraData, ...action.extraPayload},
          };
        }
      /*
       * FAILURE ACTION
       */
      case getActionName(FAILURE, reducerName):
        return {
          ...state,
          isLoading: false,
          errorMessage: action.errorMessage,
        };
      /*
       * CLEAR ACTION
       */
      case getActionName(CLEAR, reducerName):
        return {
          isLoading: false,
          data: {allIds: [], byId: {}},
          extraData: undefined,
          errorMessage: undefined,
        };
      /*
       * SET_EXTRA_DATA ACTION
       */
      case getActionName(SET_EXTRA_DATA, reducerName):
        return {
          ...state,
          extraData: {...state.extraData, ...action.extraPayload},
        };
      default:
        return state;
    }
  };
}
