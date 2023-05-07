export type StateType = {open: boolean};

export type SetOpenActionType = {
  type: 'CHANGE_STATUS';
  payload: {isOpen: boolean};
};

export type ActionsType = SetOpenActionType;

export const drawerReducer = (
  state: StateType,
  action: ActionsType,
): StateType => {
  switch (action.type) {
    case 'CHANGE_STATUS': {
      return {...state, open: action.payload.isOpen};
    }
    default:
      return state;
  }
};
