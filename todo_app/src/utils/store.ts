import {ApiPromise, ApiResponseStatus, ListPayload} from '../typings/api';
import {
  CollectionInfo,
  EntityCollection,
  EntityCollectionSet,
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

export const createEntityCollectionSet = (): EntityCollectionSet => {
  return {
    byId: [],
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
  isMini: boolean = true,
) => {
  entityArray.forEach(x => saveEntityToStore(store, x, isMini));
};

export const saveInfoToCollection = (
  collection: EntityCollection,
  info: CollectionInfo,
) => {
  collection.ids = info.ids;
  collection.last_update = Date.now();
};

export const saveInfoToCollectionSet = (
  collectionSet: EntityCollectionSet,
  id: number,
  info: CollectionInfo,
) => {
  collectionSet.byId[id] = {
    ...info,
    last_update: Date.now(),
  };
};

export const queryEntityCollection = <T extends WithId>(
  getProperty: () => EntityCollection,
  fetchData: () => ApiPromise<ListPayload<T>>,
  saveToCollection: (info: CollectionInfo) => void,
  saveToStore: (responseArray: Array<T>) => void,
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

export const queryEntity = <T extends WithId, U extends WithId>(
  getProperty: () => (U & EntityMetadata) | undefined,
  fetchData: () => ApiPromise<T>,
  saveToStore: (response: T) => void,
  forceReload: boolean = false,
): ApiPromise<U & EntityMetadata> => {
  const initialProperty = getProperty();
  if (initialProperty !== undefined) {
    const hasExisting = initialProperty.last_full_update > 0;
    const isStale = initialProperty.last_update + MAX_STALE < Date.now();

    if (hasExisting && !forceReload && !isStale) {
      return Promise.resolve({
        status: ApiResponseStatus.Success,
        payload: initialProperty,
        messages: [],
      });
    }
  }

  return fetchData().then(response => {
    const data = response.payload;
    saveToStore(data);
    return {...response, payload: getProperty()!};
  });
};

export const queryEntityCollectionSet = <T extends WithId>(
  getProperty: () => EntityCollectionSet,
  id: number,
  fetchData: () => ApiPromise<ListPayload<T>>,
  saveToCollection: (info: CollectionInfo) => void,
  saveToStore: (responseArray: Array<T>) => void,
  forceReload: boolean = false,
): ApiPromise<EntityCollection> => {
  return queryEntityCollection(
    () => {
      const store = getProperty();
      return store.byId[id] || createEntityCollection();
    },
    fetchData,
    saveToCollection,
    saveToStore,
    forceReload,
  );
};

export const executeOperationEntity = <T extends WithId, U extends WithId>(
  getStore: () => EntityStore<U>,
  executeOperation: () => ApiPromise<T>,
  saveToStore: (response: T) => void,
  runAfter?: () => void,
): ApiPromise<U & EntityMetadata> => {
  return executeOperation().then(response => {
    saveToStore(response.payload);
    const newPayload = selectEntity(getStore(), response.payload.id)!;
    runAfter && runAfter();
    return {...response, payload: newPayload};
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

export const selectCollectionSet = (
  store: EntityCollectionSet,
  id: SelectionKey,
): EntityCollection => {
  return store.byId[id] || createEntityCollection();
};

export const resetEntityCollection = (collection: EntityCollection) => {
  collection.ids = [];
  collection.last_update = 0;
};

export const resetEntityCollectionFromSet = (
  collectionSet: EntityCollectionSet,
  id: SelectionKey,
) => {
  delete collectionSet.byId[id];
};

export const resetEntity = <T extends WithId>(
  store: EntityStore<T>,
  id: SelectionKey,
) => {
  delete store.byId[id];
};
