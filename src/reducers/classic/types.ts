export interface ModelWithId {
  id: string | number;
}

export interface ArrayState<Model extends ModelWithId> {
  allIds: string[];
  byId: {[key: string]: Model};
}

export enum ActionTypePrefix {
  add = 'ADD_',
  update = 'UPDATE_',
  deleteByIds = 'DELETE_BY_IDS_',
  reset = 'RESET_',
}
