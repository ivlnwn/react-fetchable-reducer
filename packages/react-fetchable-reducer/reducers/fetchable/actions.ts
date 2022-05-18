import {ActionTypePrefix} from './types';

function getActionType(actionPrefix: string, reducerName: string): string {
  return actionPrefix + reducerName;
}

function getFetchingAction(reducerName: string): () => any {
  return (): any => {
    return {
      type: getActionType(ActionTypePrefix.fetching, reducerName),
    };
  };
}

function getSuccessAction<Model, ExtraModel = null>(
  reducerName: string,
): (
  data: any,
  parseToModel: (data: any) => Model | Model[] | undefined,
  parseToExtraModel?: (data: any) => ExtraModel | undefined,
) => any {
  return (
    data: any,
    parseToModel: (data: any) => Model | Model[] | undefined,
    parseToExtraModel?: (data: any) => ExtraModel | undefined,
  ): any => {
    return {
      type: getActionType(ActionTypePrefix.success, reducerName),
      payload: parseToModel(data),
      extraPayload: parseToExtraModel?.(data),
    };
  };
}

function getErrorAction(reducerName: string): (errorMessage: string) => any {
  return (errorMessage: string): any => {
    return {
      type: getActionType(ActionTypePrefix.error, reducerName),
      errorMessage: errorMessage,
    };
  };
}

function getClearAction(reducerName: string): () => any {
  return (): any => {
    return {
      type: getActionType(ActionTypePrefix.clear, reducerName),
    };
  };
}

function getSetExtraDataAction<ExtraModel>(reducerName: string, extraData: ExtraModel): () => any {
  return (): any => {
    return {
      type: getActionType(ActionTypePrefix.setExtraData, reducerName),
      extraPayload: extraData,
    };
  };
}

function getDeleteByIdsAction<Model, ExtraModel = null>(
  reducerName: string,
): (ids: number[] | string[]) => any {
  return (ids: number[] | string[]): any => {
    return {
      type: getActionType(ActionTypePrefix.deleteByIds, reducerName),
      payload: ids,
    };
  };
}

export const FetchableActions = {
  object: {
    fetching: getFetchingAction,
    success: getSuccessAction,
    error: getErrorAction,
    clear: getClearAction,
    setExtraData: getSetExtraDataAction,
  },
  array: {
    fetching: getFetchingAction,
    success: getSuccessAction,
    error: getErrorAction,
    clear: getClearAction,
    setExtraData: getSetExtraDataAction,
    deleteByIds: getDeleteByIdsAction,
  },
  getActionType,
};
