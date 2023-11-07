import { createAction } from 'redux-actions'

export const GET_INSURANCE_LIST_SUCCESS = 'GET_INSURANCE_LIST_SUCCESS';
export const GET_INSURANCE_LIST_REQUEST = 'GET_INSURANCE_LIST_REQUEST';
export const GET_INSURANCE_LIST_FAILURE = 'GET_INSURANCE_LIST_FAILURE';

export const getInsuranceListSuccess = createAction(GET_INSURANCE_LIST_SUCCESS);
export const getInsuranceListRequest = createAction(GET_INSURANCE_LIST_REQUEST);
export const getInsuranceListFailure = createAction(GET_INSURANCE_LIST_FAILURE);

export const GET_SPECIALITIES_REQUEST = 'GET_SPECIALITIES_REQUEST';
export const GET_SPECIALITIES_SUCCESS = 'GET_SPECIALITIES_SUCCESS';
export const GET_SPECIALITIES_FAILURE = 'GET_SPECIALITIES_FAILURE';

export const getSpecialitiesRequest = createAction(GET_SPECIALITIES_REQUEST);
export const getSpecialitiesSuccess = createAction(GET_SPECIALITIES_SUCCESS);
export const getSpecialitiesFailure = createAction(GET_SPECIALITIES_FAILURE);

export const GET_APPEALS_REQUEST = 'GET_APPEALS_REQUEST';
export const GET_APPEALS_SUCCESS = 'GET_APPEALS_SUCCESS';
export const GET_APPEALS_FAILURE = 'GET_APPEALS_FAILURE';

export const getAppealsRequest = createAction(GET_APPEALS_REQUEST);
export const getAppealsSuccess = createAction(GET_APPEALS_SUCCESS);
export const getAppealsFailure = createAction(GET_APPEALS_FAILURE);

export const GET_LANGUAGES_REQUEST = 'GET_LANGUAGES_REQUEST';
export const GET_LANGUAGES_SUCCESS = 'GET_LANGUAGES_SUCCESS';
export const GET_LANGUAGES_FAILURE = 'GET_LANGUAGES_FAILURE';

export const getLanguagesRequest = createAction(GET_LANGUAGES_REQUEST);
export const getLanguagesSuccess = createAction(GET_LANGUAGES_SUCCESS);
export const getLanguagesFailure = createAction(GET_LANGUAGES_FAILURE);

export const CLEAR_SCROLL_TOKEN = 'CLEAR_SCROLL_TOKEN';

export const clearScrollToken = createAction(CLEAR_SCROLL_TOKEN);