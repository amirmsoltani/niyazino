import {Asset} from 'react-native-image-picker';

export type SocketEmitsType = {
  userConnect: undefined;
  getChats?: number;
  getMessages: {advertisement_id: number; user_id: number; page?: number};
  submitMessage: {
    to_id: number;
    advertisement_id: number;
    content: string | Asset;
    image: boolean;
  };
  readMessage: {advertisement_id: number};
};
