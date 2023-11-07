import { LayoutActions, LayoutState } from './types';
import {
  HIDE_LOADER_ACTION,
  SHOW_LOADER_ACTION,
} from './actions/loaderActions';

import {
  SET_MODAL_WINDOW_OPEN,
} from './actions/modalActions';

export const INITIAL_STATE: LayoutState = {
  loading: false,
  modalIsOpen: false,
};

const LayoutReducer = (state = INITIAL_STATE, { type, payload }: LayoutActions<string>) => {
  switch (type) {
    case SHOW_LOADER_ACTION:
      return { ...state, loading: true };
    case HIDE_LOADER_ACTION:
      return { ...state, loading: false };
    case SET_MODAL_WINDOW_OPEN:
      return {
        ...state,
        modalIsOpen: payload
      }
    default:
      return state;
  }
};
export default LayoutReducer;