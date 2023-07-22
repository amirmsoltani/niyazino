import {eventChannel} from 'redux-saga';
import {Socket} from 'socket.io-client';

export const socketCreateChannel = (socket: Socket) =>
  eventChannel(emit => {
    socket.onAny((...args) => {
      emit(args);
    });

    return () => {
      socket.offAny();
    };
  });
