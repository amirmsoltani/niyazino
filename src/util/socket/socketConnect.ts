import {io} from 'socket.io-client';
import {BASE_URL} from '~/util/RequestList';

export const socketConnect = (token: string) =>
  new Promise(resolve => {
    const socket = io(BASE_URL + ':3003/chat', {
      extraHeaders: {authorization: token},
    });
    socket.on('connect', () => {
      resolve(socket);
      socket.off('connect');
    });
  });
