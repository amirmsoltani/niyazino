import {
  select,
  takeLeading,
  call,
  takeEvery,
  take,
  fork,
} from 'redux-saga/effects';
import {Socket} from 'socket.io-client';
import {RootState} from '~/store';
import {
  socketConnect,
  socketCreateChannel,
  socketHandelEmitter,
  socketHandelReceiver,
} from '~/util/socket';
import {EventChannel} from 'redux-saga';
import {
  SocketEmitAction,
  SocketEmitActionType,
} from '~/store/Actions/socketEmit.action';

function* socket() {
  const token: string = yield select(
    ({http: {verifyCode}}: RootState) => verifyCode?.data!.data.token!,
  );
  const socket: Socket = yield call(socketConnect, token);
  const channel: EventChannel<any> = yield socketCreateChannel(socket);

  yield takeEvery(channel, socketHandelReceiver);

  let action: SocketEmitActionType | undefined;
  while (action?._name !== 'userConnect') {
    action = yield take(SocketEmitAction);
    yield fork(socketHandelEmitter, action!, socket);
  }
}

export default takeLeading('SOCKET_CONNECT', socket);
