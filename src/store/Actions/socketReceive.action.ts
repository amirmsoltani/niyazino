import {SocketReceivesType} from '~/types';

export const SocketReceiveAction = 'Socket Receive [socket]';

export type SocketReceiveActionType<
  K extends keyof SocketReceivesType = keyof SocketReceivesType,
> = {
  type: typeof SocketReceiveAction;
  _name: K;
  payload: SocketReceivesType[K];
};

const socketReceiveAction = <
  K extends keyof SocketReceivesType = keyof SocketReceivesType,
>(
  name: K,
  data: SocketReceivesType[K],
): SocketReceiveActionType<K> => ({
  type: SocketReceiveAction,
  _name: name,
  payload: data,
});

export default socketReceiveAction;
