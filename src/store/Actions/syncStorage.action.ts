export const SYNC_STORAGE = 'Sync Storage [Storage]';

export type SyncStorageActionType = {
  type: typeof SYNC_STORAGE;
  payload: 'update' | 'load';
};

const syncStorageAction = (
  process: 'update' | 'load',
): SyncStorageActionType => ({
  type: SYNC_STORAGE,
  payload: process,
});

export default syncStorageAction;
