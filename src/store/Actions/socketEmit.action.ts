import {SocketEmitsType} from '~/types';
export const SocketEmitAction = 'socket Emit [socket]';

export type SocketEmitActionType<
  K extends keyof SocketEmitsType = keyof SocketEmitsType,
> = {
  type: typeof SocketEmitAction;
  _name: K;
  payload: SocketEmitsType[K];
};

const socketEmit = <K extends keyof SocketEmitsType>(
  name: K,
  data: SocketEmitsType[K],
): SocketEmitActionType<K> => ({
  type: SocketEmitAction,
  _name: name,
  payload: data,
});

export default socketEmit;
