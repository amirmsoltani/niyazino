import {StorageType} from '~/types';

export const SET_STORAGE = 'Set Storage [Storage]';

export type SetStorageActionType = {
  type: typeof SET_STORAGE;
  payload: {status: 'error' | 'success'; data?: StorageType};
};

const syncStorageAction = (
  status: 'error' | 'success',
  data?: StorageType,
): SetStorageActionType => ({
  type: SET_STORAGE,
  payload: {status, data},
});

export default syncStorageAction;
