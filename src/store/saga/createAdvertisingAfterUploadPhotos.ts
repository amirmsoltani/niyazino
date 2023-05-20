import {put, select, takeLeading} from 'redux-saga/effects';
import {createAdvertisingAfterUploadPhotosAction} from '~/store/Actions/createAdvertisingAfterUploadPhotos.action';
import {RootState} from '~/store';
import {AdvertisingSliceType} from '~/store/slices';
import uploadQueue from './uploadQueue';
import {FileType} from '~/types';
import {httpRequestAction} from '~/store/Actions';

function* createAdvertisingAfterUploadPhotos() {
  const advertising: AdvertisingSliceType = yield select(
    (state: RootState) => state.advertising,
  );
  const files: FileType[] = yield uploadQueue(advertising.assets!);
  yield put(
    httpRequestAction('createAdvertisements', {
      data: {
        title: advertising.title!,
        districts_ids: advertising.districts_ids!.includes('-1')
          ? []
          : advertising.districts_ids!,
        description: advertising.description!,
        show_mobile: true,
        has_chat: true,
        province_id: advertising.province_id!,
        city_id: advertising.city_id!,
        images_ids: files.length ? files.map(file => file.id) : null,
        category_id: advertising.category_id!,
      },
    }),
  );
}

export default takeLeading(
  createAdvertisingAfterUploadPhotosAction,
  createAdvertisingAfterUploadPhotos,
);
