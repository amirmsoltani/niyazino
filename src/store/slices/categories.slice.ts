import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  CategoriesType,
  CategoryType,
  HttpRequestStatusType,
  RequestType,
} from '~/types';
import {
  HttpActionType,
  HttpRequestAction,
} from '~/store/Actions/httpRequest.action';

export type CategoriesSliceType = {
  categoriesObject: {[k: number]: CategoriesType};
  childrenToParent: {[k: number]: number};
  categoriesList: CategoryType[];
  httpRequestStatus: HttpRequestStatusType;
};

const initialState: CategoriesSliceType = {
  categoriesList: [],
  categoriesObject: {},
  childrenToParent: {},
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
          object: {[k: number]: CategoriesType};
          list: CategoryType[];
          childrenToParent: {[k: number]: number};
        }>,
      ) => ({
        ...state,
        httpRequestStatus: 'success',
        categoriesObject: action.payload.object,
        categoriesList: action.payload.list,
        childrenToParent: action.payload.childrenToParent,
      }),

      prepare: (request: RequestType<'categories', CategoryType[]>) => {
        const categories = request.data;
        const categoriesObject: {[k: number]: CategoriesType} = {};
        const childrenToParent: {[k: number]: number} = {};
        categories.categories.forEach(category => {
          if (category.parent_id) {
            const parentId = category.parent_id;
            childrenToParent[category.id] = category.parent_id;
            if (categoriesObject[parentId]) {
              categoriesObject[parentId].children[category.id] = category;
            } else {
              // @ts-ignore
              categoriesObject[parentId] = {
                children: {[category.id]: category},
              };
            }
          } else {
            categoriesObject[category.id] = {
              ...category,
              children: categoriesObject[category.id]?.children || {},
            };
          }
        });
        return {
          payload: {
            object: categoriesObject,
            list: categories.categories,
            childrenToParent,
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
