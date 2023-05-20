import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CategoryType, HttpRequestStatusType, RequestType} from '~/types';
import {
  HttpActionType,
  HttpRequestAction,
} from '~/store/Actions/httpRequest.action';

export type CategoriesSliceType = {
  categoriesObject: {[k: number]: CategoryType};
  categoriesList: CategoryType[];
  httpRequestStatus: HttpRequestStatusType;
};

const initialState: CategoriesSliceType = {
  categoriesList: [],
  categoriesObject: {},
  httpRequestStatus: 'idle',
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: {
      reducer: (
        state,
        action: PayloadAction<{
          object: {[k: number]: CategoryType};
          list: CategoryType[];
        }>,
      ) => ({
        ...state,
        httpRequestStatus: 'success',
        categoriesObject: action.payload.object,
        categoriesList: action.payload.list,
      }),

      prepare: (request: RequestType<'categories', CategoryType[]>) => {
        const categories = request.data;
        const categoriesObject: {[k: number]: CategoryType} = {};
        categories.categories.forEach(category => {
          categoriesObject[category.id] = category;
          if (category.parent_id && categoriesObject[category.parent_id]) {
            categoriesObject[category.parent_id].childExist = true;
          } else if (category.parent_id) {
            categoriesObject[category.parent_id] = {
              childExist: true,
            } as CategoryType;
          }
        });
        return {
          payload: {
            object: categoriesObject,
            list: categories.categories,
          },
        };
      },
    },
  },

  extraReducers: builder => {
    builder.addCase(HttpRequestAction, (state, action: HttpActionType) => {
      if (action._name === 'categoryList') {
        return {...state, httpRequestStatus: 'loading'};
      }
      return state;
    });
  },
});
export const {setCategories} = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
