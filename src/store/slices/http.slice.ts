import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  HttpActionType,
  HttpRequestAction,
} from '~/store/Actions/httpRequest.action';
import {excludeList, RequestKeyExclude} from '~/util/RequestList';
import {
  HttpResponseAction,
  HttpResponseActionType,
} from '~/store/Actions/httpResponse.action';
import {
  SET_STORAGE,
  SetStorageActionType,
} from '~/store/Actions/setStorage.action';
import {HttpSliceType} from '~/types/HttpSliceType';

const initialState: HttpSliceType = {};

export const httpsSlice = createSlice({
  name: 'http',
  initialState,
  reducers: {
    httpClear: (state, action: PayloadAction<Array<RequestKeyExclude>>) => {
      const newState = {...state};
      action.payload.forEach(name => {
        newState[name] = {httpRequestStatus: 'idle'};
      });
      return newState;
    },
  },

  extraReducers: builder => {
    builder.addCase(HttpRequestAction, (state, action: HttpActionType) => {
      if (!excludeList.includes(action._name)) {
        return {
          ...state,
          [action._name]: {
            ...state[action._name as RequestKeyExclude],
            httpRequestStatus: 'loading',
          },
        };
      }
      return state;
    });

    builder.addCase(
      HttpResponseAction,
      (state, action: HttpResponseActionType) => {
        const {httpResponseStatus, responseData, error} = action.payload;
        const __typename = responseData?.data
          ? Object.keys(responseData?.data)[0]
          : undefined;

        if (
          action.payload.addToList &&
          state[action._name]?.data &&
          __typename
        ) {
          // @ts-ignore ignore for this issue manual
          responseData!.data[__typename].data = [
            // @ts-ignore ignore for this issue manual
            ...state[action._name]!.data!.data[__typename].data,
            // @ts-ignore ignore for this issue manual
            ...responseData!.data[__typename].data,
          ];
        }
        return {
          ...state,
          [action._name]: {
            httpRequestStatus: httpResponseStatus,
            error,
            data: {
              __typename,
              ...responseData,
            },
          },
        };
      },
    );

    builder.addCase(SET_STORAGE, (state, action: SetStorageActionType) => {
      if (action.payload.status === 'success') {
        const data = action.payload.data!.auth;
        return {
          ...state,
          verifyCode: {
            ...data,
            httpRequestStatus: data?.httpRequestStatus || 'idle',
          },
        };
      }
      return state;
    });
  },
});
export const {httpClear} = httpsSlice.actions;
export const httpsReducer = httpsSlice.reducer;
