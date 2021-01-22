import {getErrorAction, getFetchingAction, getSuccessAction} from '../reducer/actions';
import {Action, Dispatch} from 'redux';

interface FetchableReducer {
  dispatch: Dispatch<Action>;
  items: {
    reducerName: string;
    parseToModel: (data: any) => any;
    parseToExtraModel?: (data: any) => any;
  }[];
}

function dispatchFetching(fetchableReducer?: FetchableReducer): void {
  if (fetchableReducer) {
    fetchableReducer.items.forEach((item) =>
      fetchableReducer.dispatch(getFetchingAction(item.reducerName)()),
    );
  }
}

function dispatchSuccess(result: any, fetchableReducer?: FetchableReducer): void {
  if (fetchableReducer) {
    fetchableReducer.items.forEach((item) =>
      fetchableReducer.dispatch(
        getSuccessAction(item.reducerName)(result, item.parseToModel, item.parseToExtraModel),
      ),
    );
  }
}

function dispatchError(errorMessage?: string, fetchableReducer?: FetchableReducer): void {
  if (fetchableReducer) {
    fetchableReducer.items.forEach((item) =>
      fetchableReducer.dispatch(
        getErrorAction(item.reducerName)(errorMessage ?? 'An error has occurred'),
      ),
    );
  }
}

interface MakeFetchProps {
  fetchableReducer?: FetchableReducer;
  url: string;
  headers?: Record<string, string>;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  getToken?: () => Promise<string>;
  data?: Record<string, unknown>;
}

export function makeFetch({
  fetchableReducer,
  url,
  headers = {},
  method,
  getToken,
  data,
}: MakeFetchProps): Promise<any> {
  return new Promise<any>(async (resolve, reject) => {
    try {
      dispatchFetching(fetchableReducer);
      if (getToken) {
        const token = await getToken();
        if (token) {
          Object.assign(headers, {Authorization: token});
        } else {
          reject('Error getting token');
        }
      }
      const response = await fetch(url, {
        method,
        headers,
        body: data && JSON.stringify(data),
      });
      let result;
      try {
        result = await response.json();
      } catch {
        result = {};
      }
      if (response.ok) {
        dispatchSuccess(result, fetchableReducer);
        resolve(result);
      } else {
        dispatchError(result, fetchableReducer);
        reject(result);
      }
    } catch (errorMessage) {
      dispatchError(errorMessage.toString(), fetchableReducer);
      reject(errorMessage.toString());
    }
  });
}
