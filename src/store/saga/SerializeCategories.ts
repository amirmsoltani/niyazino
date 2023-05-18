import {put, takeLeading} from 'redux-saga/effects';
import {SerializeCategoriesActionName} from '~/util/SagaActionsNames';
import {CategoriesType, RequestType} from '~/types';
import {setCategories} from '~/store/slices';

function* SerializeCategories(action: {
  type: typeof SerializeCategoriesActionName;
  payload: RequestType<'categories', CategoriesType[]>;
}) {
  yield put(setCategories(action.payload));
}

export default takeLeading(SerializeCategoriesActionName, SerializeCategories);
