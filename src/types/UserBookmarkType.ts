import {AdvertisementType} from '~/types/AdvertisementType';

export type UserBookmarkType = {
  id: number;
  user_id: number;
  advertisement_id: number;
  created_at: string;
  advertisement: AdvertisementType;
};
