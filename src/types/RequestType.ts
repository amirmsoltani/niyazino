import type {AxiosHeaders, Method} from 'axios';
import {RawAxiosRequestHeaders} from 'axios/index';

export type RequestType<N extends string, D> = {
  code: number;
  message: string;
  error: boolean;
  data: {[K in string]: D};
  __typename: N;
};

export type RequestListType<N extends string, D> = {
  code: number;
  message: string;
  error: boolean;
  __typename: N;
  data: {
    [K in string]: D;
  };
};

export type ActionRequestType = {
  method: Method;
  url: string;
  sagaName?: string;
  headers?: RawAxiosRequestHeaders | AxiosHeaders;
  auth?: boolean;
};
export type RequestDataType = {
  data: any;
  params: {[k: string]: string | number};
  formData: FormData;
};
