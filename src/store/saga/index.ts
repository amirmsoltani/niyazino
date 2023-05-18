import {all} from 'redux-saga/effects';
import SerializeCategories from './SerializeCategories';
import HttpRequest from './HttpRequest';
import createAdvertisingAfterUploadPhotos from './createAdvertisingAfterUploadPhotos';
import SyncStorage from '~/store/saga/SyncStorage';

export function* AppSaga() {
  yield all([
    HttpRequest,
    SerializeCategories,
    createAdvertisingAfterUploadPhotos,
    SyncStorage,
  ]);
}
