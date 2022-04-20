import {ActionTypePrefix, ArrayState, ModelWithId} from './types';
import {Action, Reducer} from 'redux';
import {ClassicActions} from './actions';
import merge from 'lodash.merge';
import filter from 'lodash.filter';

function parseModelsToData<Model extends ModelWithId>(models: Model[]): ArrayState<Model> {
  return {
    allIds: models.map((o: any) => o.id),
    byId: models.reduce((obj, item: any) => Object.assign(obj, {[item.id]: item}), {}),
  };
}

function mergePayloadToSate<Model extends ModelWithId>(
  state: ArrayState<Model>,
  payload: Model[],
): ArrayState<Model> {
  const newData = parseModelsToData(payload);

  return {
    allIds: [...new Set([...state.allIds, ...newData.allIds])],
    byId: merge({}, state.byId, newData.byId),
  };
}

interface Props<Model> {
  reducerName: string;
  initialData?: Model[];
}

export function createArrayReducer<Model extends ModelWithId>({
  reducerName,
  initialData = [],
}: Props<Model>): Reducer<ArrayState<Model>, Action> {
  return function reducer(
    state: ArrayState<Model> = {
      ...parseModelsToData(initialData),
    },
    action: any,
  ): ArrayState<Model> {
    switch (action.type) {
      case ClassicActions.getActionType(ActionTypePrefix.reset, reducerName):
        return {
          ...parseModelsToData(initialData),
        };

      case ClassicActions.getActionType(ActionTypePrefix.add, reducerName):
      case ClassicActions.getActionType(ActionTypePrefix.update, reducerName):
        return {
          ...mergePayloadToSate(state, action.payload),
        };

      case ClassicActions.getActionType(ActionTypePrefix.deleteByIds, reducerName):
        const newById = state.byId;
        action.payload.forEach((o: number | string) => {
          delete newById[o];
        });
        return {
          allIds: state.allIds.filter((o) => !action.payload.includes(o)),
          byId: newById,
        };

      default:
        return state;
    }
  };
}
