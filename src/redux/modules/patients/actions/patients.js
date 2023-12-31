import { createAction } from 'redux-actions'

export const GET_PATIENTS_LIST_SUCCESS = 'GET_PATIENTS_LIST_SUCCESS';
export const GET_PATIENTS_LIST_REQUEST = 'GET_PATIENTS_LIST_REQUEST';
export const GET_PATIENTS_LIST_FAILURE = 'GET_PATIENTS_LIST_FAILURE';

export const GET_ONE_PATIENT_SUCCESS = 'GET_ONE_PATIENT_SUCCESS';
export const GET_ONE_PATIENT_REQUEST = 'GET_ONE_PATIENT_REQUEST';
export const GET_ONE_PATIENT_FAILURE = 'GET_ONE_PATIENT_FAILURE';

export const GET_PATIENT_APPOINTMENT_REQUEST = 'GET_PATIENT_APPOINTMENT_REQUEST';
export const GET_PATIENT_APPOINTMENT_SUCCESS = 'GET_PATIENT_APPOINTMENT_SUCCESS';
export const GET_PATIENT_APPOINTMENT_FAILURE = 'GET_PATIENT_APPOINTMENT_FAILURE';

export const GET_PATIENT_APPOINTMENTS_BY_PERIOD_REQUEST = 'GET_PATIENT_APPOINTMENTS_BY_PERIOD_REQUEST';
export const GET_PATIENT_APPOINTMENTS_BY_PERIOD_SUCCESS = 'GET_PATIENT_APPOINTMENTS_BY_PERIOD_SUCCESS';
export const GET_PATIENT_APPOINTMENTS_BY_PERIOD_FAILURE = 'GET_PATIENT_APPOINTMENTS_BY_PERIOD_FAILURE';

export const SET_MODAL_IS_OPEN = 'SET_MODAL_IS_OPEN';
export const CLEAR_ERROR_REQUEST = 'CLEAR_ERROR_REQUEST';

export const CLEAR_PATIENT_PROFILE = 'CLEAR_PATIENT_PROFILE';
export const CLEAR_SEELECTED_PATIENT_APPOINTMENT = 'CLEAR_SEELECTED_PATIENT_APPOINTMENT';
export const CLEAR_CANCELLED_PATIENT_APPOINTMENT = 'CLEAR_CANCELLED_PATIENT_APPOINTMENT';

export const CANCEL_PATIENT_APPOINTMENT_REQUEST = 'CANCEL_PATIENT_APPOINTMENT_REQUEST';
export const CANCEL_PATIENT_APPOINTMENT_SUCCESS = 'CANCEL_PATIENT_APPOINTMENT_SUCCESS';
export const CANCEL_PATIENT_APPOINTMENT_FAILURE = 'CANCEL_PATIENT_APPOINTMENT_FAILURE';

export const SET_NON_ATTENDING_PATIENT_REQUEST = 'SET_NON_ATTENDING_PATIENT_REQUEST';
export const SET_NON_ATTENDING_PATIENT_SUCCESS = 'SET_NON_ATTENDING_PATIENT_SUCCESS';
export const SET_NON_ATTENDING_PATIENT_FAILURE = 'SET_NON_ATTENDING_PATIENT_FAILURE';

export const GET_CANCELLED_APPOINTMENTS_REQUEST = 'GET_CANCELLED_APPOINTMENTS_REQUEST';
export const GET_CANCELLED_APPOINTMENTS_SUCCESS = 'GET_CANCELLED_APPOINTMENTS_SUCCESS';
export const GET_CANCELLED_APPOINTMENTS_FAILURE = 'GET_CANCELLED_APPOINTMENTS_FAILURE';

export const getCancelledAppointmentsRequest = createAction(GET_CANCELLED_APPOINTMENTS_REQUEST)
export const getCancelledAppointmentsSuccess = createAction(GET_CANCELLED_APPOINTMENTS_SUCCESS)
export const getCancelledAppointmentsFailure = createAction(GET_CANCELLED_APPOINTMENTS_FAILURE)

export const getPatientsListSuccess = createAction(GET_PATIENTS_LIST_SUCCESS)
export const getPatientsListRequest = createAction(GET_PATIENTS_LIST_REQUEST)
export const getPatientsListFailure = createAction(GET_PATIENTS_LIST_FAILURE)

export const getPatientAppointmentRequest = createAction(GET_PATIENT_APPOINTMENT_REQUEST);
export const getPatientAppointmentSuccess = createAction(GET_PATIENT_APPOINTMENT_SUCCESS);
export const getPatientAppointmentFailure = createAction(GET_PATIENT_APPOINTMENT_FAILURE);

export const getPatientAppointmentsByPeriodRequest = createAction(GET_PATIENT_APPOINTMENTS_BY_PERIOD_REQUEST);
export const getPatientAppointmentsByPeriodSuccess = createAction(GET_PATIENT_APPOINTMENTS_BY_PERIOD_SUCCESS);
export const getPatientAppointmentsByPeriodFailure = createAction(GET_PATIENT_APPOINTMENTS_BY_PERIOD_FAILURE);

export const getOnePatientSuccess = createAction(GET_ONE_PATIENT_SUCCESS)
export const getOnePatientRequest = createAction(GET_ONE_PATIENT_REQUEST)
export const getOnePatientFailure = createAction(GET_ONE_PATIENT_FAILURE)

export const cancelAppointmentRequest = createAction(CANCEL_PATIENT_APPOINTMENT_REQUEST);
export const cancelAppointmentSuccess = createAction(CANCEL_PATIENT_APPOINTMENT_SUCCESS);
export const cancelAppointmentFailure = createAction(CANCEL_PATIENT_APPOINTMENT_FAILURE);

export const setNonAttendingPatientRequest = createAction(SET_NON_ATTENDING_PATIENT_REQUEST);
export const setNonAttendingPatientSuccess = createAction(SET_NON_ATTENDING_PATIENT_SUCCESS);
export const setNonAttendingPatientFailure = createAction(SET_NON_ATTENDING_PATIENT_FAILURE);

export const clearPatientProfile = createAction(CLEAR_PATIENT_PROFILE)
export const clearSelectedAppointment = createAction(CLEAR_SEELECTED_PATIENT_APPOINTMENT)
export const clearCancelledPatientAppointment = createAction(CLEAR_CANCELLED_PATIENT_APPOINTMENT);

export const setModalIsOpen = createAction(SET_MODAL_IS_OPEN)
export const clearErrorRequest = createAction(CLEAR_ERROR_REQUEST)
