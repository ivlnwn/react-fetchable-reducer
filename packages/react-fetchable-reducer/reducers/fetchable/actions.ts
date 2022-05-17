import {CLEAR, FAILURE, FETCHING, SET_EXTRA_DATA, SUCCESS, DELETE_BY_IDS} from './types';

export function getActionName(actionPrefix: string, reducerName: string): string {
  return actionPrefix + reducerName;
}

export function getFetchingAction(reducerName: string): () => any {
  return (): any => {
    return {
      type: getActionName(FETCHING, reducerName),
    };
  };
}

export function getSuccessAction<Model, ExtraModel = null>(
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
      type: getActionName(SUCCESS, reducerName),
      payload: parseToModel(data),
      extraPayload: parseToExtraModel ? parseToExtraModel(data) : undefined,
    };
  };
}

export function getErrorAction(reducerName: string): (errorMessage: string) => any {
  return (errorMessage: string): any => {
    return {
      type: getActionName(FAILURE, reducerName),
      errorMessage: errorMessage,
    };
  };
}

export function getClearAction(reducerName: string): () => any {
  return (): any => {
    return {
      type: getActionName(CLEAR, reducerName),
    };
  };
}

export function getSetExtraDataAction<ExtraModel>(
  reducerName: string,
  extraData: ExtraModel,
): () => any {
  return (): any => {
    return {
      type: getActionName(SET_EXTRA_DATA, reducerName),
      extraPayload: extraData,
    };
  };
}

export function getDeleteByIdsAction<Model, ExtraModel = null>(
  reducerName: string,
): (
  ids: number[] | string[],
) => any {
  return (
    ids: number[] | string[],
  ): any => {
    return {
      type: getActionName(DELETE_BY_IDS, reducerName),
      payload: ids,
    };
  };
}


