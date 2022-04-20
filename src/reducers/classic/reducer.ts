import {ActionTypePrefix, ModelWithId} from './types';
import {Action, Reducer} from 'redux';
import {ClassicActions} from './actions';

interface Props<Model> {
  reducerName: string;
  initialData: Model;
}

export function createReducer<Model>({
  reducerName,
  initialData,
}: Props<Model>): Reducer<Model, Action> {
  return function reducer(state: Model = initialData, action: any): Model {
    switch (action.type) {
      case ClassicActions.getActionType(ActionTypePrefix.update, reducerName):
        return {
          ...state,
          ...action.payload,
        };

      case ClassicActions.getActionType(ActionTypePrefix.reset, reducerName):
        return initialData;

      default:
        return state;
    }
  };
}
