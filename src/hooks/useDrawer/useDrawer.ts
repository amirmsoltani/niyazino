import {createContext, useContext, Dispatch} from 'react';
import {ActionsType, StateType} from './drawerReducer';

export type DrawerContextType = StateType & {
  dispatch?: Dispatch<ActionsType>;
};

export const defaultDrawerContextValue = {open: false};

export const DrawerContext = createContext<DrawerContextType>(
  defaultDrawerContextValue,
);

export const useDrawer = () => {
  const {open, dispatch} = useContext(DrawerContext);
  const setDrawerStatus = (isOpen: boolean) => {
    dispatch!({type: 'CHANGE_STATUS', payload: {isOpen}});
  };

  return {open, setDrawerStatus};
};
