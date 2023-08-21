import {Asset} from 'react-native-image-picker';

export type MessageType = {
  id: number;
  from_id: number;
  to_id: number;
  advertisement_id: number;
  type: 'text' | 'image';
  content: string;
  readed: boolean;
  created_at: number;
  deleted_at: number;
};
