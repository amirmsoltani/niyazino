export type AdvertisementType = {
  category_id: number;
  province_id: number;
  city_id: number;
  districts_ids: string[];
  images_ids: number[] | null;
  title: string;
  description: string;
  has_chat: boolean;
  show_mobile: boolean;
  user_id: number;
  created_at: string;
  id: number;
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
>;
