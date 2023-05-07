import {configureStore} from '@reduxjs/toolkit';
import {picturesReducer} from './slices';

export const store = configureStore({
  reducer: {
    pictures: picturesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
