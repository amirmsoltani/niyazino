import storage from '@react-native-async-storage/async-storage';
import {put, select, takeLeading} from 'redux-saga/effects';
import {RootState} from '~/store';
import {
  SYNC_STORAGE,
  SyncStorageActionType,
} from '~/store/Actions/syncStorage.action';
import {setStorageAction} from '~/store/Actions';

type StorageType = {auth: RootState['http']['verifyCode']};

function* SyncStorage(action: SyncStorageActionType) {
  if (action.payload === 'update') {
    const state: StorageType = yield select((state: RootState) => ({
      auth: state.http.verifyCode,
      location: state.locations,
    }));
    console.log(state);
    yield storage.setItem('_storage', JSON.stringify(state));
  } else {
    const state: string = yield storage.getItem('_storage');
    yield put(
      state !== null
        ? setStorageAction('success', JSON.parse(state))
        : setStorageAction('error'),
    );
  }
}

export default takeLeading(SYNC_STORAGE, SyncStorage);
