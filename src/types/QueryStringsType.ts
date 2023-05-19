export type AdvertisementListQueryStringType = {
  province_id: number;
  city_id: number;
  'districts_ids[]'?: string[];
  category_id?: number;
  title?: string;
  page: number;
  per_page?: number;
};
