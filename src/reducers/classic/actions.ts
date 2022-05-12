import {ActionTypePrefix, ModelWithId} from './types';

function getActionType(actionPrefix: string, reducerName: string): string {
  return actionPrefix + reducerName;
}

function getResetAction(reducerName: string): () => any {
  return (): any => {
    return {
      type: getActionType(ActionTypePrefix.reset, reducerName),
    };
  };
}

function getUpdateAction<Model>(reducerName: string): (data: Partial<Model>) => any {
  return (data: Partial<Model>): any => {
    return {
      type: getActionType(ActionTypePrefix.update, reducerName),
      payload: data,
    };
  };
}

function getUpdateArrayAction<Model extends ModelWithId>(
  reducerName: string,
): (data: (Partial<Model> & Pick<Model, 'id'>)[]) => any {
  return (data: (Partial<Model> & Pick<Model, 'id'>)[]): any => {
    return {
      type: getActionType(ActionTypePrefix.update, reducerName),
      payload: data,
    };
  };
}

function getAddArrayAction<Model extends ModelWithId>(
  reducerName: string,
): (data: Model[]) => any {
  return (data: Model[]): any => {
    return {
      type: getActionType(ActionTypePrefix.add, reducerName),
      payload: data,
    };
  };
}

function getDeleteArrayAction(
  reducerName: string,
): (data: ModelWithId['id'][]) => any {
  return (data: ModelWithId['id'][]): any => {
    return {
      type: getActionType(ActionTypePrefix.deleteByIds, reducerName),
      payload: data,
    };
  };
}

export const ClassicActions = {
  object: {
    reset: getResetAction,
    update: getUpdateAction,
  }, 
  array: {
    reset: getResetAction,
    update: getUpdateArrayAction,
    add: getAddArrayAction,
    deleteByIds: getDeleteArrayAction,
  },
  getActionType,
}
