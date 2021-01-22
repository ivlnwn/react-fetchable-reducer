import {FetchableArrayState, FetchableState} from './types';
import {Action, Reducer} from 'redux';

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
