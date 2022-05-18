export interface ModelWithId {
  id: string | number;
}

export interface FetchableState<Model, ExtraModel = null> {
  isLoading: boolean;
  errorMessage?: string;
  data?: Model;
  extraData?: ExtraModel;
}

export interface FetchableArrayData<Model> {
  allIds: string[];
  byId: {[key: string]: Model};
}

export interface FetchableArrayState<Model, ExtraModel = null> {
  isLoading: boolean;
  errorMessage?: string;
  data: FetchableArrayData<Model>;
  extraData?: ExtraModel;
}

export enum ActionTypePrefix {
  fetching = 'FETCHING_',
  success = 'FETCHING_SUCCESS_',
  error = 'FETCHING_FAILURE_',
  clear = 'CLEAR_',
  setExtraData = 'SET_EXTRA_DATA_',
  deleteByIds = 'DELETE_BY_IDS_',
}
