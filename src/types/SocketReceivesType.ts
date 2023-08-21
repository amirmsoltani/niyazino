import {ChatType} from './ChatType';
import {MessageType} from '~/types/MessageType';
export type SocketReceivesType = {
  getChats: {data: ChatType[]; count: number; totalPages: number};
  getMessages: {data: MessageType[]; count: number; totalPages: number};
  newMessage: MessageType;
  readMessage: {advertisement_id: number};
};
