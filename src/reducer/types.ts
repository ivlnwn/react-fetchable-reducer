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

export const FETCHING = 'FETCHING_';
export const SUCCESS = 'FETCHING_SUCCESS_';
export const FAILURE = 'FETCHING_FAILURE_';
export const CLEAR = 'CLEAR_';
export const SET_EXTRA_DATA = 'SET_EXTRA_DATA_';
export const DELETE_BY_IDS = 'DELETE_BY_IDS_';
