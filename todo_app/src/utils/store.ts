import {ApiPromise, ApiResponseStatus, ListPayload} from '../typings/api';
import {
  CollectionInfo,
  EntityCollection,
  EntityMetadata,
  EntityStore,
  SelectionKey,
  WithId,
} from '../typings/store';

const MAX_STALE = 120000; // 120 seconds

export const createEntityStore = <
  T extends WithId,
  U extends T = T,
>(): EntityStore<T, U> => {
  return {byId: {}};
};

export const createEntityCollection = (): EntityCollection => {
  return {
    ids: [],
    last_update: 0,
  };
};

export const saveEntityToStore = <T extends WithId, U extends T = T>(
  store: EntityStore<T, U>,
  entity: U,
  isMini: boolean = false,
) => {
  const lastFullUpdate =
    store.byId[entity.id] !== undefined
      ? store.byId[entity.id].last_full_update
      : 0;

  store.byId[entity.id] = {
    ...entity,
    last_update: Date.now(),
    last_full_update: isMini ? lastFullUpdate : Date.now(),
  };
};

export const saveEntityArrayToStore = <T extends WithId, U extends T = T>(
  store: EntityStore<T, U>,
  entityArray: Array<T>,
) => {
  entityArray.forEach(x => saveEntityToStore(store, x, true));
};

export const saveInfoToCollection = (
  collection: EntityCollection,
  info: CollectionInfo,
) => {
  collection.ids = info.ids;
  collection.last_update = Date.now();
};

export const queryEntityCollection = <T extends WithId>(
  getProperty: () => EntityCollection,
  fetchData: () => ApiPromise<ListPayload<T>>,
  saveToCollection: (info: CollectionInfo) => void,
  saveToStore: (entityArray: Array<T>) => void,
  forceReload: boolean = false,
): ApiPromise<EntityCollection> => {
  const initialProperty = getProperty();
  const hasExisting = initialProperty.last_update > 0;
  const isStale = initialProperty.last_update + MAX_STALE < Date.now();

  if (hasExisting && !forceReload && !isStale) {
    return Promise.resolve({
      status: ApiResponseStatus.Success,
      payload: getProperty(),
      messages: [],
    });
  }

  return fetchData().then(response => {
    const ids = response.payload.items.map(x => x.id);
    const collectionInfo = {
      ids: ids,
    };
    saveToCollection(collectionInfo);
    saveToStore(response.payload.items);
    return {...response, payload: getProperty()};
  });
};

export const selectMiniEntity = <T extends WithId, U extends T = T>(
  store: EntityStore<T, U>,
  id: SelectionKey,
): (T & EntityMetadata) | undefined => {
  return store.byId[id] !== undefined ? store.byId[id] : undefined;
};

export const selectEntity = <T extends WithId, U extends T = T>(
  store: EntityStore<T, U>,
  id: SelectionKey,
): (U & EntityMetadata) | undefined => {
  return store.byId[id] !== undefined && store.byId[id].last_full_update > 0
    ? (store.byId[id] as U & EntityMetadata)
    : undefined;
};