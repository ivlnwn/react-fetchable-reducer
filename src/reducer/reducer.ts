import {
  CLEAR,
  FAILURE,
  FetchableArrayState,
  FetchableState,
  FETCHING,
  SET_EXTRA_DATA,
  SUCCESS,
} from './types';
import {Action, Reducer} from 'redux';
import {getActionName} from './actions';

export function createFetchableReducer<Model, ExtraModel = null>(
  reducerName: string,
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
      case getActionName(FETCHING, reducerName):
        return {
          ...state,
          isLoading: true,
          errorMessage: undefined,
        };
      case getActionName(SUCCESS, reducerName):
        return {
          ...state,
          isLoading: false,
          data: action.payload ?? state.data,
          extraData: {...state.extraData, ...action.extraPayload},
        };
      case getActionName(FAILURE, reducerName):
        return {
          ...state,
          isLoading: false,
          errorMessage: action.errorMessage,
        };
      case getActionName(CLEAR, reducerName):
        return {
          isLoading: false,
          data: undefined,
          extraData: undefined,
          errorMessage: undefined,
        };
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

export enum ReducerMode {
  override = 'override',
  supplement = 'supplement',
}

export function createFetchableArrayReducer<Model, ExtraModel = null>(
  reducerName: string,
  dataStorageMode: ReducerMode = ReducerMode.supplement,
  itemUpdateMode: ReducerMode = ReducerMode.override,
  initialData: Model[] = [],
): Reducer<FetchableArrayState<Model, ExtraModel>, Action> {
  return function fetchableArray(
    state: FetchableArrayState<Model, ExtraModel> = {
      isLoading: false,
      data: initialData,
      extraData: undefined,
      errorMessage: undefined,
    },
    action: any,
  ): FetchableArrayState<Model, ExtraModel> {
    switch (action.type) {
      case getActionName(FETCHING, reducerName):
        return {
          ...state,
          isLoading: true,
          errorMessage: undefined,
        };
      case getActionName(SUCCESS, reducerName):
        if (action.payload === undefined) {
          return {
            ...state,
            isLoading: false,
          };
        }
        const payloadIds = action.payload.map((p: any) => p.id);
        if (dataStorageMode === ReducerMode.supplement) {
          if (itemUpdateMode === ReducerMode.override) {
            return {
              ...state,
              isLoading: false,
              data: [
                ...state.data.filter((o: any) => !payloadIds.includes(o.id)),
                ...action.payload,
              ],
              extraData: {...state.extraData, ...action.extraPayload},
            };
          } else {
            let updatedStateData = state.data.map((o: any) => {
              if (payloadIds.includes(o.id)) {
                return {...o, ...action.payload.find((i: any) => i.id === o.id)};
              }
              return o;
            });
            const stateIds = state.data.map((p: any) => p.id);
            return {
              ...state,
              isLoading: false,
              data: [
                ...updatedStateData,
                ...action.payload.filter((o: any) => !stateIds.includes(o.id)),
              ],
              extraData: {...state.extraData, ...action.extraPayload},
            };
          }
        } else {
          return {
            ...state,
            isLoading: false,
            data: action.payload ?? state.data,
            extraData: {...state.extraData, ...action.extraPayload},
          };
        }
      case getActionName(FAILURE, reducerName):
        return {
          ...state,
          isLoading: false,
          errorMessage: action.errorMessage,
        };
      case getActionName(CLEAR, reducerName):
        return {
          isLoading: false,
          data: [],
          extraData: undefined,
          errorMessage: undefined,
        };
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

export function withExtraActions<
  Model,
  ExtraModel = null,
  State = FetchableState<Model, ExtraModel> | FetchableArrayState<Model, ExtraModel>
>(
  reducer: Reducer<State, Action>,
  actionCheck: (state: State | undefined, action: Action) => State | undefined,
): Reducer<State, Action> {
  return (state, action): State => {
    const returnedReducer = actionCheck(state, action);
    if (returnedReducer !== undefined) {
      return returnedReducer;
    } else {
      return reducer(state, action);
    }
  };
}
