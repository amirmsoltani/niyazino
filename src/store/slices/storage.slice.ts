import {HttpRequestStatusType, StorageType} from '~/types';
import {createSlice} from '@reduxjs/toolkit';
import {
  SYNC_STORAGE,
  SyncStorageActionType,
} from '~/store/Actions/syncStorage.action';
import {
  SET_STORAGE,
  SetStorageActionType,
} from '~/store/Actions/setStorage.action';

export type StorageSliceType = {
  status: HttpRequestStatusType;
  storage?: StorageType;
};
const initialState: StorageSliceType = {status: 'idle'};

export const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(SYNC_STORAGE, (state, action: SyncStorageActionType) => ({
      state,
      status: action.payload === 'load' ? 'loading' : state.status,
    }));
    builder.addCase(SET_STORAGE, (state, action: SetStorageActionType) => {
      if (action.payload.status === 'success') {
        return {status: 'success', storage: action.payload.data};
      } else {
        return {status: 'error'};
      }
    });
  },
});

// export const {httpClear} = httpsSlice.actions;
export const storageReducer = storageSlice.reducer;
