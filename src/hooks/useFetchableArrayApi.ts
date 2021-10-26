import {ModelWithId} from '../reducer/types';
import {FetchableArraySelectors} from '../selectors/fetchableArraySelectors';
import {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {Selector} from 'reselect';

export interface PaginationProps {
  page: number;
  itemsPerPage: number;
}

interface Props<Model extends ModelWithId> {
  apiFetch: (props: PaginationProps) => Promise<any>;
  selectors: FetchableArraySelectors<any, Model, any>;
  customDataSelector?: (ids: Model['id'][]) => Selector<any, Model[]>;
  itemsPerPage?: number;
  getTotalPagesFromApiResult: (result: any) => number;
  getItemsIdsFromApiResult: (result: any) => Model['id'][];
}

interface ReturnType<Model> {
  data: Model[];
  fetching: boolean;
  refresh: () => void;
  refreshWithoutIndicator: () => Promise<any>;
  refreshing: boolean;
  fetchMore: () => void;
  allPagesLoaded: boolean;
}

export function useFetchableArrayApi<Model extends ModelWithId>({
  apiFetch,
  selectors,
  customDataSelector,
  itemsPerPage = 10,
  getItemsIdsFromApiResult,
  getTotalPagesFromApiResult,
}: Props<Model>): ReturnType<Model> {
  const [itemsIds, setItemsIds] = useState<Model['id'][]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [pagesLoaded, setPagesLoaded] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const data = useSelector(
    customDataSelector ? customDataSelector(itemsIds) : selectors.getByIds(itemsIds),
  );
  const fetching = useSelector(selectors.getIsFetching());

  const refreshWithoutIndicator = useCallback((): Promise<any> => {
    return apiFetch({
      page: 1,
      itemsPerPage,
    }).then((result) => {
      setItemsIds(getItemsIdsFromApiResult(result));
      setTotalPages(getTotalPagesFromApiResult(result));
      setPagesLoaded(1);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiFetch, itemsPerPage]);

  function refresh(): void {
    setRefreshing(true);
    refreshWithoutIndicator().finally(() => setRefreshing(false));
  }

  function fetchMore(): void {
    if (totalPages > pagesLoaded) {
      const pageToFetch = pagesLoaded + 1;
      apiFetch({
        page: pageToFetch,
        itemsPerPage,
      }).then((result) => {
        setItemsIds((prev) => [...prev, ...getItemsIdsFromApiResult(result)]);
        setPagesLoaded(pageToFetch);
      });
    }
  }

  return {
    data,
    fetching,
    refresh,
    refreshWithoutIndicator,
    refreshing,
    fetchMore,
    allPagesLoaded: pagesLoaded >= totalPages,
  };
}
