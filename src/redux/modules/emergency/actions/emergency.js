import { createAction } from 'redux-actions'

export const GET_EMERGENCY_CONTACT_SUCCESS = 'GET_EMERGENCY_CONTACT_SUCCESS';
export const GET_EMERGENCY_CONTACT_REQUEST = 'GET_EMERGENCY_CONTACT_REQUEST';
export const GET_EMERGENCY_CONTACT_FAILURE = 'GET_EMERGENCY_CONTACT_FAILURE';

export const GET_ONE_EMERGENCY_CONTACT_SUCCESS = 'GET_ONE_EMERGENCY_CONTACT_SUCCESS';
export const GET_ONE_EMERGENCY_CONTACT_REQUEST = 'GET_ONE_EMERGENCY_CONTACT_REQUEST';
export const GET_ONE_EMERGENCY_CONTACT_FAILURE = 'GET_ONE_EMERGENCY_CONTACT_FAILURE';

export const SET_EMERGENCY_CONTACT_SUCCESS = 'SET_EMERGENCY_CONTACT_SUCCESS';
export const SET_EMERGENCY_CONTACT_REQUEST = 'SET_EMERGENCY_CONTACT_REQUEST';
export const SET_EMERGENCY_CONTACT_FAILURE = 'SET_EMERGENCY_CONTACT_FAILURE';

export const GET_EMERGENCY_TYPES_SUCCESS = 'GET_EMERGENCY_TYPES_SUCCESS';
export const GET_EMERGENCY_TYPES_REQUEST = 'GET_EMERGENCY_TYPES_REQUEST';
export const GET_EMERGENCY_TYPES_FAILURE = 'GET_EMERGENCY_TYPES_FAILURE';

export const UPDATE_EMERGENCY_CONTACT_SUCCESS = 'UPDATE_EMERGENCY_CONTACT_SUCCESS';
export const UPDATE_EMERGENCY_CONTACT_REQUEST = 'UPDATE_EMERGENCY_CONTACT_REQUEST';
export const UPDATE_EMERGENCY_CONTACT_FAILURE = 'UPDATE_EMERGENCY_CONTACT_FAILURE';

export const DELETE_EMERGENCY_CONTACT_SUCCESS = 'DELETE_EMERGENCY_CONTACT_SUCCESS';
export const DELETE_EMERGENCY_CONTACT_REQUEST = 'DELETE_EMERGENCY_CONTACT_REQUEST';
export const DELETE_EMERGENCY_CONTACT_FAILURE = 'DELETE_EMERGENCY_CONTACT_FAILURE';

export const updateEmergencyContactSuccess = createAction(UPDATE_EMERGENCY_CONTACT_SUCCESS)
export const updateEmergencyContactRequest = createAction(UPDATE_EMERGENCY_CONTACT_REQUEST)
export const updateEmergencyContactFailure = createAction(UPDATE_EMERGENCY_CONTACT_FAILURE)

export const getOneEmergencyContactSuccess = createAction(GET_ONE_EMERGENCY_CONTACT_SUCCESS)
export const getOneEmergencyContactRequest = createAction(GET_ONE_EMERGENCY_CONTACT_REQUEST)
export const getOneEmergencyContactFailure = createAction(GET_ONE_EMERGENCY_CONTACT_FAILURE)

export const deleteEmergencyContactSuccess = createAction(DELETE_EMERGENCY_CONTACT_SUCCESS)
export const deleteEmergencyContactRequest = createAction(DELETE_EMERGENCY_CONTACT_REQUEST)
export const deleteEmergencyContactFailure = createAction(DELETE_EMERGENCY_CONTACT_FAILURE)

export const getEmergencyTypesSuccess = createAction(GET_EMERGENCY_TYPES_SUCCESS)
export const getEmergencyTypesRequest = createAction(GET_EMERGENCY_TYPES_REQUEST)
export const getEmergencyTypesFailure = createAction(GET_EMERGENCY_TYPES_FAILURE)

export const getEmergencyContactSuccess = createAction(GET_EMERGENCY_CONTACT_SUCCESS)
export const getEmergencyContactRequest = createAction(GET_EMERGENCY_CONTACT_REQUEST)
export const getEmergencyContactFailure = createAction(GET_EMERGENCY_CONTACT_FAILURE)

export const setEmergencyContactSuccess = createAction(SET_EMERGENCY_CONTACT_SUCCESS)
export const setEmergencyContactRequest = createAction(SET_EMERGENCY_CONTACT_REQUEST)
export const setEmergencyContactFailure = createAction(SET_EMERGENCY_CONTACT_FAILURE)
