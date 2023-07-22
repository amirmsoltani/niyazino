import {put} from 'redux-saga/effects';
import socketReceiveAction from '~/store/Actions/socketReceive.action';
export function* socketHandelReceiver(action: any) {
  console.log(action);
  yield put(socketReceiveAction(action[0], action[1]));
}
