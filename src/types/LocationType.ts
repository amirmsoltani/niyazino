export type ProvinceType = {
  id: number;
  name: string;
};

export type CityType = {
  id: number;
  province_id: number;
  name: string;
};

export type DistrictType = {
  id: number;
  city_id: number;
  name: string;
  status: 'active' | 'unActive';
};
