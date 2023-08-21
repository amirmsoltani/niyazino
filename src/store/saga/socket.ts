import {
  call,
  cancel,
  fork,
  select,
  take,
  takeEvery,
  takeLeading,
} from 'redux-saga/effects';
import {Socket} from 'socket.io-client';
import {RootState} from '~/store';
import {
  socketConnect,
  socketCreateChannel,
  socketHandelEmitter,
  socketHandelReceiver,
} from '~/util/socket';
import {EventChannel, Task} from 'redux-saga';
import {
  SocketEmitAction,
  SocketEmitActionType,
} from '~/store/Actions/socketEmit.action';

function* socket() {
  const token: string = yield select(
    ({http: {verifyCode}}: RootState) => verifyCode?.data!.data.token!,
  );
  const socket: Socket = yield call(socketConnect, token);
  const channel: EventChannel<any> = yield call(socketCreateChannel, socket);

  const forkEvery: Task = yield takeEvery(channel, socketHandelReceiver);

  let action: SocketEmitActionType = yield take(SocketEmitAction);
  while (action?._name !== 'disconnect') {
    yield fork(socketHandelEmitter, action!, socket);
    action = yield take(SocketEmitAction);
  }
  yield cancel(forkEvery);
  channel.close();
  socket.disconnect();
}

export default takeLeading('SOCKET_CONNECT', socket);
