import {SocketEmitActionType} from '~/store/Actions/socketEmit.action';
import {Socket} from 'socket.io-client';

export function* socketHandelEmitter(
  action: SocketEmitActionType,
  socket: Socket,
) {
  socket.emit(action._name, action.payload);
  console.log(action);
}
