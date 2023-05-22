import {SerializeCategoriesActionName} from './SagaActionsNames';
import {
  ActionRequestType,
  AdvertisementDataType,
  AdvertisementListQueryStringType,
  AdvertisementType,
  AttributeType,
  CityType,
  DistrictType,
  FileType,
  ProvinceType,
  RequestListType,
  RequestType,
  UserBookmarkType,
  UserType,
} from '~/types';
import {Asset} from 'react-native-image-picker';

export const BASE_URL = 'http://api.niyazino.com/';

export const excludeList = ['categoryList'];
export type RequestKeyExclude = keyof Omit<RequestListTypes, 'categoryList'>;

type RequestKeys =
  | 'categoryList'
  | 'provinceList'
  | 'cityList'
  | 'districtList'
  | 'uploadFile'
  | 'sendVerificationCode'
  | 'verifyCode'
  | 'createAdvertisements'
  | 'detailAdvertisements'
  | 'listAdvertisements'
  | 'userAdvertisements'
  | 'userBookmarks'
  | 'getMe'
  | 'logOut'
  | 'attributes';
export const RequestList: {[k in RequestKeys]: ActionRequestType} = {
  categoryList: {
    url: BASE_URL + 'v1/categories',
    method: 'get',
    sagaName: SerializeCategoriesActionName,
  },
  provinceList: {
    url: BASE_URL + 'v1/locations/provinces',
    method: 'get',
  },
  cityList: {
    url: BASE_URL + 'v1/locations/cities/{id}',
    method: 'get',
  },
  districtList: {
    url: BASE_URL + 'v1/locations/districts/{id}',
    method: 'get',
  },
  uploadFile: {
    url: BASE_URL + 'v1/files/upload',
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data; '},
    auth: true,
  },
  sendVerificationCode: {
    url: BASE_URL + 'v1/auth/code',
    method: 'post',
  },
  verifyCode: {
    url: BASE_URL + 'v1/auth/verify',
    method: 'post',
  },
  createAdvertisements: {
    url: BASE_URL + 'v1/advertisements/create',
    method: 'post',
    auth: true,
  },
  detailAdvertisements: {
    url: BASE_URL + 'v1/advertisements/show/{id}',
    method: 'get',
    auth: true,
  },
  listAdvertisements: {
    url: BASE_URL + 'v1/advertisements',
    method: 'get',
    auth: true,
  },
  userAdvertisements: {
    url: BASE_URL + 'v1/advertisements/my',
    method: 'get',
    auth: true,
  },
  userBookmarks: {
    url: BASE_URL + 'v1/bookmarks',
    method: 'get',
    auth: true,
  },
  getMe: {
    url: BASE_URL + 'v1/auth/me',
    method: 'get',
    auth: true,
  },
  logOut: {
    url: BASE_URL + 'v1/auth/logout',
    method: 'get',
    auth: true,
  },
  attributes: {
    url: BASE_URL + 'v1/categories/attributes/{id}',
    method: 'get',
  },
};

export type RequestListTypes = {
  categoryList?: undefined;
  provinceList?: undefined;
  cityList: {params: {id: number}};
  districtList: {params: {id: number}};
  uploadFile: {
    formData: {
      category: 'users' | 'categories' | 'advertisements';
      file: Asset;
    };
  };
  sendVerificationCode: {
    data: {mobile: string};
  };
  verifyCode: {data: {mobile: string; code: string}};
  createAdvertisements: {data: AdvertisementDataType};
  detailAdvertisements: {
    params: {id: number};
  };
  listAdvertisements: {
    queryString: AdvertisementListQueryStringType;
    addToList?: boolean;
  };
  userAdvertisements: {
    queryString: {page?: number};
    addToList?: boolean;
  };
  userBookmarks: undefined;
  getMe: undefined;
  logOut: undefined;
  attributes: {params: {id: number}};
};

export type ResponseListType = {
  categoryList: undefined;
  provinceList: RequestType<'provinces', ProvinceType[]>;
  cityList: RequestType<'cities', CityType[]>;
  districtList: RequestType<'districts', DistrictType[]>;
  uploadFile: RequestType<'file', FileType>;
  sendVerificationCode: RequestType<'expire_in', number>;
  verifyCode: RequestType<'token', string>;
  createAdvertisements: RequestType<'advertisement', AdvertisementType>;
  detailAdvertisements: RequestType<'advertisement', AdvertisementType>;
  listAdvertisements: RequestListType<'advertisements', AdvertisementType>;
  userAdvertisements: RequestListType<'advertisements', AdvertisementType>;
  userBookmarks: RequestType<'advertisements', UserBookmarkType[]>;
  getMe: RequestType<'user', UserType>;
  logOut: RequestType<'data', null>;
  attributes: RequestType<'attributes', AttributeType[]>;
};
