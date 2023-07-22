import {HttpRequestStatusType} from '~/types/HttpRequestStatusType';
import {AxiosError} from 'axios';
import {SocketEmitsType} from '~/types/SocketEmitsType';
import {SocketReceivesType} from '~/types/SocketReceivesType';

export type SocketSliceType = {
  status: HttpRequestStatusType;
  unread: number[];
  getChats?: {
    status: HttpRequestStatusType;
    data?: SocketReceivesType['getChats'];
    error?: AxiosError;
    request: SocketEmitsType['getChats'];
  };
  getMessages?: {
    status: HttpRequestStatusType;
    data?: SocketReceivesType['getMessages'];
    error?: AxiosError;
    request: SocketEmitsType['getMessages'];
  };
  submitMessage?: {
    status: HttpRequestStatusType;
    request: SocketEmitsType['submitMessage'];
    error?: AxiosError;
  };
  readMessage?: {
    status: HttpRequestStatusType;
    data?: SocketReceivesType['readMessage'];
    request: SocketEmitsType['readMessage'];
    error?: AxiosError;
  };
};
