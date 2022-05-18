import {FetchableState, ActionTypePrefix} from './types';
import {Action, Reducer} from 'redux';
import {FetchableActions} from './actions';
import {ItemUpdateMode} from './fetchableArrayReducer';
import merge from 'lodash.merge';

interface FetchableReducerProps<Model> {
  reducerName: string;
  initialData?: Model | undefined;
  dataUpdate?: {
    mode: ItemUpdateMode;
    overridableProperties?: (keyof Model)[];
  };
}

export function createFetchableReducer<Model, ExtraModel = null>({
  reducerName,
  initialData = undefined,
  dataUpdate = {
    mode: ItemUpdateMode.override,
  },
}: FetchableReducerProps<Model>): Reducer<FetchableState<Model, ExtraModel>, Action> {
  return function fetchable(
    state: FetchableState<Model, ExtraModel> = {
      isLoading: false,
      data: initialData,
      extraData: undefined,
      errorMessage: undefined,
    },
    action: any,
  ): FetchableState<Model, ExtraModel> {
    switch (action.type) {
      case FetchableActions.getActionType(ActionTypePrefix.fetching, reducerName):
        return {
          ...state,
          isLoading: true,
          errorMessage: undefined,
        };

      case FetchableActions.getActionType(ActionTypePrefix.success, reducerName):
        if (dataUpdate?.mode === ItemUpdateMode.override) {
          return {
            ...state,
            isLoading: false,
            data: action.payload ?? state.data,
            extraData: {...state.extraData, ...action.extraPayload},
          };
        } else {
          if (dataUpdate?.overridableProperties && dataUpdate.overridableProperties.length > 0) {
            const mergedData = merge({}, state.data, action.payload ?? {});
            const overridableData = dataUpdate.overridableProperties.reduce((current, item) => {
              if (Object.prototype.hasOwnProperty.call(action.payload, item)) {
                return {...current, [item]: action.payload[item]};
              } else {
                return current;
              }
            }, {});
            return {
              ...state,
              isLoading: false,
              data: {...mergedData, ...overridableData},
              extraData: {...state.extraData, ...action.extraPayload},
            };
          } else {
            return {
              ...state,
              isLoading: false,
              data: merge({}, state.data, action.payload ?? {}),
              extraData: {...state.extraData, ...action.extraPayload},
            };
          }
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
          data: undefined,
          extraData: undefined,
          errorMessage: undefined,
        };

      case FetchableActions.getActionType(ActionTypePrefix.setExtraData, reducerName):
        return {
          ...state,
          extraData: {...state.extraData, ...action.extraPayload},
        };
      default:
        return state;
    }
  };
}
