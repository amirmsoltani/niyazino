import {HttpSliceType} from '~/types/HttpSliceType';
import {LocationsSliceType} from '~/store/slices';

export type StorageType = {
  auth: HttpSliceType<'verifyCode'>;
  location: LocationsSliceType;
};
