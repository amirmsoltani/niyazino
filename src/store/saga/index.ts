import {all} from 'redux-saga/effects';
import SerializeCategories from './SerializeCategories';
import HttpRequest from './HttpRequest';
import createAdvertisingAfterUploadPhotos from './createAdvertisingAfterUploadPhotos';
import SyncStorage from '~/store/saga/SyncStorage';
import socket from './socket';
export function* AppSaga() {
  yield all([
    HttpRequest,
    SerializeCategories,
    createAdvertisingAfterUploadPhotos,
    SyncStorage,
    socket,
  ]);
}
