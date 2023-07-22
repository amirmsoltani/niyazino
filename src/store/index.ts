import {configureStore, Middleware} from '@reduxjs/toolkit';
import {
  advertisingReducer,
  categoriesReducer,
  httpsReducer,
  locationsReducer,
  socketReducer,
  storageReducer,
} from './slices';
import createSagaMiddleware from 'redux-saga';
import {AppSaga} from './saga';

const middlewares: Middleware[] = [];

const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);
export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    http: httpsReducer,
    advertising: advertisingReducer,
    locations: locationsReducer,
    storage: storageReducer,
    socket: socketReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(middlewares),
  devTools: true,
});

sagaMiddleware.run(AppSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
