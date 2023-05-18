import {HttpSliceType} from '~/types/HttpSliceType';

export type StorageType = {
  auth: HttpSliceType<'verifyCode'>;
};
