import {createSlice} from '@reduxjs/toolkit';
import {
  SocketEmitAction,
  SocketEmitActionType,
} from '~/store/Actions/socketEmit.action';
import {
  ChatType,
  HttpRequestStatusType,
  MessageType,
  SocketReceivesType,
  SocketSliceType,
} from '~/types';
import {
  SocketReceiveAction,
  SocketReceiveActionType,
} from '~/store/Actions/socketReceive.action';

const initialState: SocketSliceType = {status: 'idle', unread: []};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(SocketEmitAction, (state, action: SocketEmitActionType) => {
      if (action._name === 'userConnect') {
        return {...state, status: 'success'};
      }
      return {
        ...state,
        [action._name]: {
          ...state[action._name],
          status: 'loading',
          request: action.payload,
        },
      };
    });
    builder.addCase(
      SocketReceiveAction,
      (state, action: SocketReceiveActionType) => {
        switch (action._name) {
          case 'newMessage':
            {
              const response =
                action.payload as SocketReceivesType['newMessage'];
              if (
                state.getMessages?.status === 'success' &&
                response.advertisement_id ===
                  state.getMessages.request.advertisement_id
              ) {
                return {
                  ...state,
                  getMessages: {
                    ...state.getMessages,
                    data: [...state.getMessages!.data!, response],
                  },
                };
              } else if (state.getChats?.status === 'success') {
                const index = state.getChats?.data!.findIndex(
                  chat => chat.advertisement_id === response.advertisement_id,
                );
                if (index !== -1) {
                  state.getChats.data![index].readed = false;
                }
              }
            }
            break;
          case 'readMessage':
            {
              const response =
                action.payload as SocketReceivesType['readMessage'];
              if (
                state.getMessages?.status === 'success' &&
                response.advertisement_id ===
                  state.getMessages.request.advertisement_id
              ) {
                const newMessages = [...state.getMessages.data!].map(message =>
                  message.readed ||
                  message.to_id === state.getMessages!.request.user_id
                    ? message
                    : {...message, readed: true},
                );
                state.getMessages.data = newMessages;
              }
              if (state.getChats?.status === 'success') {
                const index = state.getChats?.data!.findIndex(
                  chat => chat.advertisement_id === response.advertisement_id,
                );
                if (index !== -1) {
                  state.getChats.data![index].readed = true;
                }
              }
            }
            break;
          default: {
            const name = action._name;
            const data = action.payload as ChatType[] | MessageType[];
            return {
              ...state,
              [name]: {
                ...state[name],
                status: 'success',
                data: state[name]?.data
                  ? [...state[name]!.data!, ...data]
                  : action.payload,
              },
            };
          }
        }
      },
    );
  },
});

const {} = socketSlice.actions;

export const socketReducer = socketSlice.reducer;
