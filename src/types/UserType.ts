export type UserType = {
  id: number;
  role_id: number;
  role_name: 'admin';
  first_name: string | null;
  last_name: string | null;
  mobile: string;
  province_id: null | number;
  city_id: null | number;
  avatar_id: null | number;
  status: 'active';
  created_at: number;
  updated_at: number | null;
  deleted_at: null | number;
  avatar: null | string;
};
