import { createAction } from 'redux-actions'

export const GET_DOCTORS_LIST_SUCCESS = 'GET_DOCTORS_LIST_SUCCESS';
export const GET_DOCTORS_LIST_REQUEST = 'GET_DOCTORS_LIST_REQUEST';
export const GET_DOCTORS_LIST_FAILURE = 'GET_DOCTORS_LIST_FAILURE';

export const GET_DOCTORS_APPOINTMENTS_REQUEST = 'GET_DOCTORS_APPOINTMENTS_REQUEST';
export const GET_DOCTORS_APPOINTMENTS_SUCCESS = 'GET_DOCTORS_APPOINTMENTS_SUCCESS';
export const GET_DOCTORS_APPOINTMENTS_FAILURE = 'GET_DOCTORS_APPOINTMENTS_FAILURE';

export const GET_DOCTORS_SLOTS_REQUEST = 'GET_DOCTORS_SLOTS_REQUEST';
export const GET_DOCTORS_SLOTS_SUCCESS = 'GET_DOCTORS_SLOTS_SUCCESS';
export const GET_DOCTORS_SLOTS_FAILURE = 'GET_DOCTORS_SLOTS_FAILURE';

export const GET_APPOINTMENT_REQUEST = 'GET_APPOINTMENT_REQUEST';
export const GET_APPOINTMENT_SUCCESS = 'GET_APPOINTMENT_SUCCESS';
export const GET_APPOINTMENT_FAILURE = 'GET_APPOINTMENT_FAILURE';

export const GET_ONE_DOCTOR_SUCCESS = 'GET_ONE_DOCTOR_SUCCESS';
export const GET_ONE_DOCTOR_REQUEST = 'GET_ONE_DOCTOR_REQUEST';
export const GET_ONE_DOCTOR_FAILURE = 'GET_ONE_DOCTOR_FAILURE';

export const GET_DOCTORS_SLOTS_JWT_REQUEST = 'GET_DOCTORS_SLOTS_JWT_REQUEST';

export const CLEAR_SELECTED_APPOINTMENT = 'CLEAR_SELECTED_APPOINTMENT';

export const SET_MODAL_IS_OPEN = 'SET_MODAL_IS_OPEN';
export const CLEAR_DOCTOR_PROFILE = 'CLEAR_DOCTOR_PROFILE';

export const getDoctorsListSuccess = createAction(GET_DOCTORS_LIST_SUCCESS)
export const getDoctorsListRequest = createAction(GET_DOCTORS_LIST_REQUEST)
export const getDoctorsListFailure = createAction(GET_DOCTORS_LIST_FAILURE)

export const getAppointmentSuccess = createAction(GET_APPOINTMENT_SUCCESS)
export const getAppointmentRequest = createAction(GET_APPOINTMENT_REQUEST)
export const getAppointmentFailure = createAction(GET_APPOINTMENT_FAILURE)

export const getDoctorsAppointmentsSuccess = createAction(GET_DOCTORS_APPOINTMENTS_SUCCESS)
export const getDoctorsAppointmentsRequest = createAction(GET_DOCTORS_APPOINTMENTS_REQUEST)
export const getDoctorsAppointmentsFailure = createAction(GET_DOCTORS_APPOINTMENTS_FAILURE)

export const getOneDoctorSuccess = createAction(GET_ONE_DOCTOR_SUCCESS)
export const getOneDoctorRequest = createAction(GET_ONE_DOCTOR_REQUEST)
export const getOneDoctorFailure = createAction(GET_ONE_DOCTOR_FAILURE)

export const getDoctorSlotsJwtRequest = createAction(GET_DOCTORS_SLOTS_JWT_REQUEST);

export const getDoctorSlotsRequest = createAction(GET_DOCTORS_SLOTS_REQUEST);
export const getDoctorSlotsSuccess = createAction(GET_DOCTORS_SLOTS_SUCCESS);
export const getDoctorSlotsFailure = createAction(GET_DOCTORS_SLOTS_FAILURE);

export const clearDoctorProfile = createAction(CLEAR_DOCTOR_PROFILE)
export const clearSelectedAppointment = createAction(CLEAR_SELECTED_APPOINTMENT)

export const setModalIsOpen = createAction(SET_MODAL_IS_OPEN)
