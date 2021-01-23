import {CLEAR, FAILURE, FetchableState, FETCHING, SET_EXTRA_DATA, SUCCESS,} from './types';
import {Action, Reducer} from 'redux';
import {getActionName} from './actions';
import {ItemUpdateMode} from "./fetchableArrayReducer";
import merge from 'lodash.merge';

export function createFetchableReducer<Model, ExtraModel = null>(
  reducerName: string,
  dataUpdateMode: ItemUpdateMode = ItemUpdateMode.override,
  initialData: Model | undefined = undefined,
): Reducer<FetchableState<Model, ExtraModel>, Action> {
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
        if (dataUpdateMode === ItemUpdateMode.override) {
          return {
            ...state,
            isLoading: false,
            data: action.payload ?? state.data,
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
          data: undefined,
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
