import {FetchableArrayData, FetchableArrayState, ModelWithId, ActionTypePrefix} from './types';
import {Action, Reducer} from 'redux';
import {FetchableActions} from './actions';
import merge from 'lodash.merge';
import filter from 'lodash.filter';

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
  overrideItemsWithMatchingFieldValue?: keyof Model,
): FetchableArrayData<Model> {
  const newData = parseModelsToData(models);
  if (mode === ItemUpdateMode.override) {
    if (overrideItemsWithMatchingFieldValue) {
      const groupedValues = new Set(
        Object.values(newData.byId ?? {}).map((item) => item[overrideItemsWithMatchingFieldValue]),
      );
      const dataWithoutUnnecessaryItems = filter(
        data.byId,
        (item: Model) => !groupedValues.has(item[overrideItemsWithMatchingFieldValue]),
      ) as Model[];
      const cleanedOldData = parseModelsToData(dataWithoutUnnecessaryItems);
      return {
        allIds: [...new Set([...cleanedOldData.allIds, ...newData.allIds])],
        byId: {...cleanedOldData.byId, ...newData.byId},
      };
    } else {
      return {
        allIds: [...new Set([...data.allIds, ...newData.allIds])],
        byId: {...data.byId, ...newData.byId},
      };
    }
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

interface FetchableArrayReducerProps<Model> {
  reducerName: string;
  dataStorageMode?: StorageMode;
  initialData?: Model[];
  itemUpdate?: {
    mode: ItemUpdateMode;
    overrideItemsWithMatchingFieldValue?: keyof Model;
  };
}

export function createFetchableArrayReducer<Model extends ModelWithId, ExtraModel = null>({
  reducerName,
  dataStorageMode = StorageMode.supplement,
  initialData = [],
  itemUpdate = {
    mode: ItemUpdateMode.override,
  },
}: FetchableArrayReducerProps<Model>): Reducer<FetchableArrayState<Model, ExtraModel>, Action> {
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
      case FetchableActions.getActionType(ActionTypePrefix.fetching, reducerName):
        return {
          ...state,
          isLoading: true,
          errorMessage: undefined,
        };

      case FetchableActions.getActionType(ActionTypePrefix.success, reducerName):
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
            data: addModelsToData(
              state.data,
              action.payload,
              itemUpdate?.mode,
              itemUpdate?.overrideItemsWithMatchingFieldValue,
            ),
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

      case FetchableActions.getActionType(ActionTypePrefix.error, reducerName):
        return {
          ...state,
          isLoading: false,
          errorMessage: action.errorMessage,
        };

      case FetchableActions.getActionType(ActionTypePrefix.clear, reducerName):
        return {
          isLoading: false,
          data: {allIds: [], byId: {}},
          extraData: undefined,
          errorMessage: undefined,
        };

      case FetchableActions.getActionType(ActionTypePrefix.setExtraData, reducerName):
        return {
          ...state,
          extraData: {...state.extraData, ...action.extraPayload},
        };

      case FetchableActions.getActionType(ActionTypePrefix.deleteByIds, reducerName):
        const newById = state.data.byId;
        action.payload.forEach((o: number | string) => {
          delete newById[o];
        });
        return {
          ...state,
          data: {
            allIds: state.data.allIds.filter((o) => !action.payload.includes(o)),
            byId: newById,
          },
        };
      default:
        return state;
    }
  };
}
