import { createAction } from 'redux-actions'

export const LOG_IN_ACTION_SUCCESS = 'LOG_IN_ACTION_SUCCESS';
export const LOG_IN_ACTION_REQUEST = 'LOG_IN_ACTION_REQUEST';
export const LOG_IN_ACTION_FAILURE = 'LOG_IN_ACTION_FAILURE';

export const logInActionSuccess = createAction(LOG_IN_ACTION_SUCCESS)
export const logInActionRequest = createAction(LOG_IN_ACTION_REQUEST)
export const logInActionFailure = createAction(LOG_IN_ACTION_FAILURE)

