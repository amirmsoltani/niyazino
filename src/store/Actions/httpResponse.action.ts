import {
  RequestKeyExclude,
  RequestListTypes,
  ResponseListType,
} from '~/util/RequestList';
import {AxiosError} from 'axios';

export const HttpResponseAction = 'Http Response [http]';

export type HttpResponseActionType<
  K extends keyof RequestListTypes = keyof RequestListTypes,
> = {
  type: typeof HttpResponseAction;
  _name: K;
  payload: {
    httpResponseStatus: 'success' | 'error';
    responseData?: ResponseListType[K];
    error?: Error | AxiosError;
  };
};
const httpResponseAction = <K extends RequestKeyExclude = RequestKeyExclude>(
  requestName: K,
  payload: {
    httpResponseStatus: 'success' | 'error';
    responseData?: ResponseListType[K];
    error?: Error | AxiosError;
  },
): HttpResponseActionType<K> => ({
  type: HttpResponseAction,
  payload,
  _name: requestName,
});

export default httpResponseAction;
