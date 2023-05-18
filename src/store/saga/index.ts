import {all} from 'redux-saga/effects';
import SerializeCategories from './SerializeCategories';
import HttpRequest from './HttpRequest';
import createAdvertisingAfterUploadPhotos from './createAdvertisingAfterUploadPhotos';

export function* AppSaga() {
  yield all([
    HttpRequest,
    SerializeCategories,
    createAdvertisingAfterUploadPhotos,
  ]);
}
