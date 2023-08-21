export type SocketEmitsType = {
  userConnect: undefined;
  disconnect: undefined;
  getChats?: number;
  getMessages: {advertisement_id: number; user_id: number; page?: number};
  submitMessage: {
    to_id: number;
    advertisement_id: number;
    content: string;
    image: boolean;
  };
  readMessage: number;
};
