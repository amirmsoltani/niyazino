import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AdvertisementDataType, AdvertisementType} from '~/types';
import {Asset} from 'react-native-image-picker';

export type AdvertisingSliceType = Partial<AdvertisementDataType> & {
  assets?: Asset[];
};

const initialState: AdvertisingSliceType = {};

export const advertisingSlice = createSlice({
  name: 'advertising',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Partial<AdvertisementType>>) => {
      return {...state, ...action.payload};
    },
    setRemoveDistrict: (state, action: PayloadAction<string>) => {
      const newState = [...(state.districts_ids || [])];
      const index = newState.indexOf(action.payload);
      if (index === -1) {
        newState.push(action.payload);
        return {...state, districts_ids: newState};
      }

      newState.splice(index, 1);
      return {...state, districts_ids: newState};
    },
    setRemoveAssets: (state, action: PayloadAction<Asset>) => {
      const newAssets = [...(state.assets || [])];
      const index = newAssets.findIndex(
        asset => asset.fileSize === action.payload.fileSize,
      );
      if (index === -1) {
        newAssets.push(action.payload);
        return {...state, assets: newAssets};
      }

      newAssets.splice(index, 1);
      return {...state, assets: newAssets};
    },
    advertisingRemoveData: (
      state,
      action: PayloadAction<keyof AdvertisementDataType>,
    ) => {
      state[action.payload] = undefined;
    },
    advertisingClear: () => {
      return initialState;
    },
  },
});
export const {
  setData: advertisingSetData,
  advertisingRemoveData,
  setRemoveDistrict,
  setRemoveAssets,
  advertisingClear,
} = advertisingSlice.actions;
export const advertisingReducer = advertisingSlice.reducer;
