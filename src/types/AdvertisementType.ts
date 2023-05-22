import {CityType, DistrictType, ProvinceType} from '~/types/LocationType';
import {ShowAttributeType} from '~/types/AttributeType';

export type AdvertisementType = {
  category_id: number;
  province_id: number;
  city_id: number;
  districts_ids: string[] | string;
  images_ids: number[] | string | null;
  title: string;
  description: string;
  has_chat: boolean;
  show_mobile: boolean;
  user_id: number;
  created_at: string;
  id: number;
  status: 'active' | 'pending' | 'rejected';
  min_price?: number;
  max_price?: number;
  attributes?: ShowAttributeType[];
  districts: DistrictType[];
  province: ProvinceType;
  city: CityType;
};

export type AdvertisementDataType = Pick<
  AdvertisementType,
  | 'city_id'
  | 'description'
  | 'title'
  | 'districts_ids'
  | 'images_ids'
  | 'has_chat'
  | 'province_id'
  | 'show_mobile'
  | 'category_id'
  | 'min_price'
  | 'max_price'
> & {attributes: Array<null | string>};
