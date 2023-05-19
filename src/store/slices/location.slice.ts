import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  SET_STORAGE,
  SetStorageActionType,
} from '~/store/Actions/setStorage.action';

export type LocationsSliceType = {
  province?: {id: number; title: string};
  city?: {id: number; title: string};
  districts: {[k: number]: {id: number; title: string}};
};

const initialState: LocationsSliceType = {
  districts: {},
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setLocation: (
      state,
      action: PayloadAction<{
        _name: 'province' | 'city' | 'districts';
        value: {id: number; title: string};
      }>,
    ) => {
      const _name = action.payload._name;
      if (_name === 'districts') {
        state.districts[action.payload.value.id] = action.payload.value;
        return;
      }
      state[_name] = action.payload.value;
    },
    clearLocation: (
      state,
      action: PayloadAction<'province' | 'city' | 'districts'>,
    ) => {
      const _name = action.payload;
      if (_name === 'districts') {
        state.districts = {};
        return;
      }

      state[_name] = undefined;
    },
    deleteDistrict: (state, action: PayloadAction<number>) => {
      const newDistricts = {...state.districts};
      delete newDistricts[action.payload];
      return {...state, districts: newDistricts};
    },
  },
  extraReducers: builder => {
    builder.addCase(SET_STORAGE, (state, action: SetStorageActionType) => {
      if (action.payload.status === 'success') {
        const data = action.payload.data!.location;
        return {...state, ...data};
      }
      return state;
    });
  },
});
export const {setLocation, clearLocation, deleteDistrict} =
  locationsSlice.actions;
export const locationsReducer = locationsSlice.reducer;
