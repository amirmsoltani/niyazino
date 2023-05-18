import {Asset} from 'react-native-image-picker';
import {FileType} from '~/types';
import {put, take} from 'redux-saga/effects';
import {httpRequestAction} from '~/store/Actions';
import {
  HttpResponseAction,
  HttpResponseActionType,
} from '~/store/Actions/httpResponse.action';

function* uploadQueue(assets: Asset[]) {
  const uploaded: FileType[] = [];
  for (let a = 0; a < assets.length; a++) {
    yield put(
      httpRequestAction('uploadFile', {
        formData: {file: assets[a], category: 'advertisements'},
      }),
    );

    let action: HttpResponseActionType<'uploadFile'> | undefined;
    while (!action || action._name !== 'uploadFile') {
      action = yield take(HttpResponseAction);
    }
    if (action.payload.httpResponseStatus === 'success') {
      uploaded.push(action.payload.responseData!.data.file);
    }
  }
  return uploaded;
}

export default uploadQueue;
