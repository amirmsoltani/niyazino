import {ChatType} from './ChatType';
import {MessageType} from '~/types/MessageType';
export type SocketReceivesType = {
  getChats: ChatType[];
  getMessages: MessageType[];
  newMessage: MessageType;
  readMessage: {advertisement_id: number};
};
