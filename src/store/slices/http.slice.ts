import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {HttpRequestStatusType} from '~/types';
import {
  HttpActionType,
  HttpRequestAction,
} from '~/store/Actions/httpRequest.action';
import {
  excludeList,
  RequestKeyExclude,
  ResponseListType,
} from '~/util/RequestList';
import {AxiosError} from 'axios';
import {
  HttpResponseAction,
  HttpResponseActionType,
} from '~/store/Actions/httpResponse.action';

export type HttpSliceType<K extends RequestKeyExclude = RequestKeyExclude> = {
  [k in K]?: {
    httpRequestStatus: HttpRequestStatusType;
    data?: ResponseListType[k];
    error?: AxiosError | Error;
  };
};

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
        return {...state, [action._name]: {httpRequestStatus: 'loading'}};
      }
      return state;
    });

    builder.addCase(
      HttpResponseAction,
      (state, action: HttpResponseActionType) => {
        const {httpResponseStatus, responseData, error} = action.payload;

        return {
          ...state,
          [action._name]: {
            httpRequestStatus: httpResponseStatus,
            error,
            data: {
              __typename: responseData?.data
                ? Object.keys(responseData?.data)[0]
                : undefined,
              ...responseData,
            },
          },
        };
      },
    );
  },
});
export const {httpClear} = httpsSlice.actions;
export const httpsReducer = httpsSlice.reducer;
