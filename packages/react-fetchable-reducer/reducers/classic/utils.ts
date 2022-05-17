import {Action, Reducer} from 'redux';
import {ArrayState, ModelWithId} from './types';

export function withExtraActions<Model, State = Model | ArrayState<Model & ModelWithId>>(
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
