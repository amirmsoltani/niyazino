import {
  HttpActionType,
  HttpRequestAction,
} from '~/store/Actions/httpRequest.action';
import {put, select, takeEvery} from 'redux-saga/effects';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {httpResponseAction} from '~/store/Actions';
import {RequestKeyExclude} from '~/util/RequestList';
import {RequestDataType} from '~/types';
import {Asset} from 'react-native-image-picker';
import {RootState} from '~/store';

function* HttpRequest(action: HttpActionType) {
  const {
    actionData: {method, url, sagaName, headers, auth},
    requestData,
  } = action.payload;

  const data = requestData as RequestDataType;

  let requestHeaders: typeof headers = {'CLIENT-TOKEN': '123456789'};
  if (headers) {
    requestHeaders = {...requestHeaders, ...headers};
  }
  if (auth) {
    const token: string = yield select(
      ({http: {verifyCode}}: RootState) => verifyCode?.data!.data.token!,
    );
    requestHeaders['AUTH-TOKEN'] = token;
  }

  let urlWithParams = url;
  if (data && data.params) {
    Object.entries(data.params).forEach(([key, value]) => {
      urlWithParams = urlWithParams.replace(`{${key}}`, value.toString());
    });
  }
  let formData = data?.formData ? new FormData() : undefined;
  if (formData) {
    Object.entries(data.formData).map(
      ([key, value]: [string, string | Asset]) => {
        if (typeof value === 'object') {
          formData?.append(key, {
            name: value.fileName,
            type: value.type,
            uri: value.uri,
          });
          return;
        }
        formData?.append(key, value);
      },
    );
  }
  try {
    const response: AxiosResponse = yield axios.request({
      method,
      url: urlWithParams,
      headers: requestHeaders,
      data: formData || data?.data,
      params: data?.queryString,
    });
    if (sagaName) {
      yield put({type: sagaName, payload: response.data, _name: action._name});
    } else {
      yield put(
        httpResponseAction(action._name as RequestKeyExclude, {
          httpResponseStatus: 'success',
          responseData: response.data,
          addToList: data?.addToList,
        }),
      );
    }
  } catch (e: any | AxiosError) {
    yield put(
      httpResponseAction(action._name as RequestKeyExclude, {
        httpResponseStatus: 'error',
        error: e,
        addToList: data?.addToList,
      }),
    );
    console.log('error');
    console.log(e.isAxiosError ? (e as AxiosError).request : 'error');
  }
}

export default takeEvery(HttpRequestAction, HttpRequest);
