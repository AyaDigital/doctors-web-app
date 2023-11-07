import { PatientsActions, PatientsState } from './types';
import {PatientT} from '../../../types';
import {
	GET_PATIENTS_LIST_SUCCESS,
	GET_PATIENTS_LIST_REQUEST,
	GET_PATIENTS_LIST_FAILURE,
	CLEAR_SEELECTED_PATIENT_APPOINTMENT,
	GET_ONE_PATIENT_SUCCESS,
    GET_ONE_PATIENT_REQUEST,
    GET_ONE_PATIENT_FAILURE,
	CLEAR_PATIENT_PROFILE,
	GET_PATIENT_APPOINTMENT_REQUEST,
	GET_PATIENT_APPOINTMENT_SUCCESS,
	GET_PATIENT_APPOINTMENT_FAILURE,
	CANCEL_PATIENT_APPOINTMENT_REQUEST,
	CANCEL_PATIENT_APPOINTMENT_SUCCESS,
	CANCEL_PATIENT_APPOINTMENT_FAILURE,
	CLEAR_CANCELLED_PATIENT_APPOINTMENT,
	GET_PATIENT_APPOINTMENTS_BY_PERIOD_REQUEST,
	GET_PATIENT_APPOINTMENTS_BY_PERIOD_SUCCESS,
	GET_PATIENT_APPOINTMENTS_BY_PERIOD_FAILURE,
	SET_NON_ATTENDING_PATIENT_REQUEST,
	SET_NON_ATTENDING_PATIENT_SUCCESS,
	SET_NON_ATTENDING_PATIENT_FAILURE,
	SET_MODAL_IS_OPEN,
	CLEAR_ERROR_REQUEST,
	GET_CANCELLED_APPOINTMENTS_REQUEST,
	GET_CANCELLED_APPOINTMENTS_SUCCESS,
	GET_CANCELLED_APPOINTMENTS_FAILURE
} from './actions/patients';

export const INITIAL_STATE: PatientsState | null = {
	isLoading: false,
	isAppointmentLoading: false,
	appointmentCanceled: false,
	list: [],
	profile: {},
	error: '',
	currentAppointment: undefined,
	isModalOpen: false,
	appointments: [],
	cancelledAppointments: []
};

const PatientReducer = (state = INITIAL_STATE, { type, payload }: PatientsActions<{data: PatientT[]}>) => {
	switch (type) {
		case GET_CANCELLED_APPOINTMENTS_REQUEST:
			return {
				...state,
				isLoading: true,
				error: ''
			}
		case GET_CANCELLED_APPOINTMENTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				cancelledAppointments: payload,
				error: ''
			}
		case GET_CANCELLED_APPOINTMENTS_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case GET_PATIENTS_LIST_REQUEST:
			return {
				...state,
				isLoading: true,
				error: ''
			}
		case GET_PATIENTS_LIST_SUCCESS:
			return {
					...state,
					list: payload.data,
					isLoading: false,
					error: ''
				};
		case GET_PATIENTS_LIST_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case GET_ONE_PATIENT_REQUEST:
			return {
				...state,
				isLoading: true,
				error: ''
			}
		case GET_ONE_PATIENT_SUCCESS:
			return {
				...state,
				profile: payload,
				isLoading: false,
				error: ''
			}
		case GET_ONE_PATIENT_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case SET_MODAL_IS_OPEN:
			return {
				...state,
				isModalOpen: payload
			}
		case CLEAR_PATIENT_PROFILE:
			return {
				...state,
				profile: null
			}
		case GET_PATIENT_APPOINTMENT_REQUEST:
			return {
				...state,
				isAppointmentLoading: true
			}
		case GET_PATIENT_APPOINTMENT_SUCCESS:
			return {
				...state,
				currentAppointment: payload,
				isAppointmentLoading: false
			}
		case GET_PATIENT_APPOINTMENT_FAILURE:
			return {
				...state,
				isAppointmentLoading: false,
				error: payload
			}
		case GET_PATIENT_APPOINTMENTS_BY_PERIOD_REQUEST:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case GET_PATIENT_APPOINTMENTS_BY_PERIOD_SUCCESS:
			return {
				...state,
				isLoading: false,
				appointments: payload
			}
		case GET_PATIENT_APPOINTMENTS_BY_PERIOD_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case CLEAR_SEELECTED_PATIENT_APPOINTMENT:
			return {
				...state,
				currentAppointment: null,
			}
		case CANCEL_PATIENT_APPOINTMENT_REQUEST:
			return {
				...state,
				isAppointmentLoading: true,
			}
		case CANCEL_PATIENT_APPOINTMENT_SUCCESS:
			return {
				...state,
				isAppointmentLoading: false,
				appointmentCanceled: true
			}
		case CANCEL_PATIENT_APPOINTMENT_FAILURE:
			return {
				...state,
				isAppointmentLoading: false,
				error: payload
			}
		case CLEAR_CANCELLED_PATIENT_APPOINTMENT:
			return {
				...state,
				appointmentCanceled: false
			}
		case SET_NON_ATTENDING_PATIENT_REQUEST:
			return {
				...state,
				isLoading: true
			}
		case SET_NON_ATTENDING_PATIENT_SUCCESS:
			return {
				...state,
				isLoading: false
			}
		case SET_NON_ATTENDING_PATIENT_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case CLEAR_ERROR_REQUEST:
			return {
				...state,
				error: ''
			}
		default:
			return state;
	}
};

export default PatientReducer;