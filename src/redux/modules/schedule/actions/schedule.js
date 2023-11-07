import { createAction } from 'redux-actions'

export const GET_COUNT_SLOTS_REQUEST = 'GET_COUNT_SLOTS_REQUEST';
export const GET_COUNT_SLOTS_SUCCESS = 'GET_COUNT_SLOTS_SUCCESS';
export const GET_COUNT_SLOTS_FAILURE = 'GET_COUNT_SLOTS_FAILURE';

export const GET_MY_SLOTS_REQUEST = 'GET_MY_SLOTS_REQUEST';
export const GET_MY_SLOTS_SUCCESS = 'GET_MY_SLOTS_SUCCESS';
export const GET_MY_SLOTS_FAILURE = 'GET_MY_SLOTS_FAILURE';

export const SET_SCHEDULE_REQUEST = 'SET_SCHEDULE_REQUEST';
export const SET_SCHEDULE_SUCCESS = 'SET_SCHEDULE_SUCCESS';
export const SET_SCHEDULE_FAILURE = 'SET_SCHEDULE_FAILURE';

export const DELETE_SCHEDULE_REQUEST = 'DELETE_SCHEDULE_REQUEST';
export const DELETE_SCHEDULE_SUCCESS = 'DELETE_SCHEDULE_SUCCESS';
export const DELETE_SCHEDULE_FAILURE = 'DELETE_SCHEDULE_FAILURE';

export const CREATE_APPOINTMENT_REQUEST = 'CREATE_APPOINTMENT_REQUEST';
export const CREATE_APPOINTMENT_SUCCESS = 'CREATE_APPOINTMENT_SUCCESS';
export const CREATE_APPOINTMENT_FAILURE = 'CREATE_APPOINTMENT_FAILURE';

export const UPDATE_APPOINTMENT_REQUEST = 'UPDATE_APPOINTMENT_REQUEST';
export const UPDATE_APPOINTMENT_SUCCESS = 'UPDATE_APPOINTMENT_SUCCESS';
export const UPDATE_APPOINTMENT_FAILURE = 'UPDATE_APPOINTMENT_FAILURE';

export const CANCEL_APPOINTMENT_REQUEST = 'CANCEL_APPOINTMENT_REQUEST';
export const CANCEL_APPOINTMENT_SUCCESS = 'CANCEL_APPOINTMENT_SUCCESS';
export const CANCEL_APPOINTMENT_FAILURE = 'CANCEL_APPOINTMENT_FAILURE';

export const GET_APPOINTMENT_REQUEST = 'GET_APPOINTMENT_REQUEST';
export const GET_APPOINTMENT_SUCCESS = 'GET_APPOINTMENT_SUCCESS';
export const GET_APPOINTMENT_FAILURE = 'GET_APPOINTMENT_FAILURE';

export const GET_APPOINTMENTS_BY_PERIOD_REQUEST = 'GET_APPOINTMENTS_BY_PERIOD_REQUEST';
export const GET_APPOINTMENTS_BY_PERIOD_SUCCESS = 'GET_APPOINTMENTS_BY_PERIOD_SUCCESS';
export const GET_APPOINTMENTS_BY_PERIOD_FAILURE = 'GET_APPOINTMENTS_BY_PERIOD_FAILURE';

export const GET_CANCELLED_APPOINTMENTS_REQUEST = 'GET_CANCELED_APPOINTMENTS_REQUEST';
export const GET_CANCELLED_APPOINTMENTS_SUCCESS = 'GET_CANCELED_APPOINTMENTS_SUCCESS';
export const GET_CANCELLED_APPOINTMENTS_FAILURE = 'GET_CANCELED_APPOINTMENTS_FAILURE';

export const UPDATE_SCHEDULE_STATUS = 'UPDATE_SCHEDULE_STATUS';
export const UPDATE_APPOINTMENT_STATUS = 'UPDATE_APPOINTMENT_STATUS';
export const CLEAR_CANCELED_STATUS = 'CLEAR_CANCELED_STATUS';

export const CLEAR_ERROR_STATUS = 'CLEAR_ERROR_STATUS';

export const getCountSlotsRequest = createAction(GET_COUNT_SLOTS_REQUEST);
export const getCountSlotsSuccess = createAction(GET_COUNT_SLOTS_SUCCESS);
export const getCountSlotsFailure = createAction(GET_COUNT_SLOTS_FAILURE);

export const getCancelledAppointmentsRequest = createAction(GET_CANCELLED_APPOINTMENTS_REQUEST);
export const getCancelledAppointmentsSuccess = createAction(GET_CANCELLED_APPOINTMENTS_SUCCESS);
export const getCancelledAppointmentsFailure = createAction(GET_CANCELLED_APPOINTMENTS_FAILURE);

export const getMySlotsRequest = createAction(GET_MY_SLOTS_REQUEST);
export const getMySlotsSuccess = createAction(GET_MY_SLOTS_SUCCESS);
export const getMySlotsFailure = createAction(GET_MY_SLOTS_FAILURE);

export const setScheduleRequest = createAction(SET_SCHEDULE_REQUEST);
export const setScheduleSuccess = createAction(SET_SCHEDULE_SUCCESS);
export const setScheduleFailure = createAction(SET_SCHEDULE_FAILURE);

export const createAppointmentRequest = createAction(CREATE_APPOINTMENT_REQUEST);
export const createAppointmentSuccess = createAction(CREATE_APPOINTMENT_SUCCESS);
export const createAppointmentFailure = createAction(CREATE_APPOINTMENT_FAILURE);

export const updateScheduleStatus = createAction(UPDATE_SCHEDULE_STATUS);
export const updateAppointmentStatus = createAction(UPDATE_APPOINTMENT_STATUS);

export const updateAppointmentRequest = createAction(UPDATE_APPOINTMENT_REQUEST);
export const updateAppointmentSuccess = createAction(UPDATE_APPOINTMENT_SUCCESS);
export const updateAppointmentFailure = createAction(UPDATE_APPOINTMENT_FAILURE);

export const cancelAppointmentRequest = createAction(CANCEL_APPOINTMENT_REQUEST);
export const cancelAppointmentSuccess = createAction(CANCEL_APPOINTMENT_SUCCESS);
export const cancelAppointmentFailure = createAction(CANCEL_APPOINTMENT_FAILURE);

export const getAppointmentsByPeriodRequest = createAction(GET_APPOINTMENTS_BY_PERIOD_REQUEST);
export const getAppointmentsByPeriodSuccess = createAction(GET_APPOINTMENTS_BY_PERIOD_SUCCESS);
export const getAppointmentsByPeriodFailure = createAction(GET_APPOINTMENTS_BY_PERIOD_FAILURE);

export const deleteScheduleRequest = createAction(DELETE_SCHEDULE_REQUEST)
export const deleteScheduleSuccess = createAction(DELETE_SCHEDULE_SUCCESS)
export const deleteScheduleFailure = createAction(DELETE_SCHEDULE_FAILURE)

export const clearCanceledStatus = createAction(CLEAR_CANCELED_STATUS);
export const clearErrorStatus = createAction(CLEAR_ERROR_STATUS);
