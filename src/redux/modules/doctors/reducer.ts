import { DoctorT } from '../../../types';
import { DoctorsActions, DoctorsState } from './types';

import {
	GET_DOCTORS_LIST_SUCCESS,
	GET_DOCTORS_LIST_REQUEST,
	GET_DOCTORS_LIST_FAILURE,
	GET_APPOINTMENT_FAILURE,
	GET_APPOINTMENT_SUCCESS,
	GET_APPOINTMENT_REQUEST,
	GET_DOCTORS_APPOINTMENTS_SUCCESS,
	GET_DOCTORS_APPOINTMENTS_REQUEST,
	GET_DOCTORS_APPOINTMENTS_FAILURE,
	GET_DOCTORS_SLOTS_JWT_REQUEST,
	GET_DOCTORS_SLOTS_REQUEST,
	GET_DOCTORS_SLOTS_SUCCESS,
	GET_DOCTORS_SLOTS_FAILURE,
	CLEAR_SELECTED_APPOINTMENT,
	GET_ONE_DOCTOR_SUCCESS,
    GET_ONE_DOCTOR_REQUEST,
    GET_ONE_DOCTOR_FAILURE,
	CLEAR_DOCTOR_PROFILE,
	SET_MODAL_IS_OPEN
} from './actions/doctors';

export const INITIAL_STATE: DoctorsState | null = {
	isLoading: false,
	list: [],
	appointments: [],
	selectedAppointment: null,
	profile: {},
	slots: [],
	error: '',
	totalResults: 0,
	scrollToken: '',
	isModalOpen: false
};

const AuthReducer = (state = INITIAL_STATE, { type, payload }: DoctorsActions) => {
	switch (type) {
		case GET_DOCTORS_LIST_REQUEST:
			return {
				...state,
				isLoading: true,
				error: ''
			}
		case GET_DOCTORS_LIST_SUCCESS:
			return {
					...state,
					list: payload,
					isLoading: false,
					error: ''
				};
		case GET_DOCTORS_LIST_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case GET_DOCTORS_APPOINTMENTS_REQUEST:
			return {
				...state,
				isLoading: true,
				error: ''
			}
		case GET_DOCTORS_APPOINTMENTS_SUCCESS:
			return {
					...state,
					appointments: payload.data,
					isLoading: false,
					error: ''
				};
		case GET_DOCTORS_APPOINTMENTS_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case GET_APPOINTMENT_REQUEST:
			return {
				...state,
				isLoading: true,
				error: ''
			}
		case GET_APPOINTMENT_SUCCESS:
			return {
					...state,
					selectedAppointment: payload.data,
					isLoading: false,
					error: ''
				};
		case GET_APPOINTMENT_FAILURE:
			return {
				...state,
				isLoading: false,
				selectedAppointment: {},
				error: payload
			}
		case CLEAR_SELECTED_APPOINTMENT:
			return {
				...state,
				selectedAppointment: {},
				isLoading: false,
				error: ''
			}
		case GET_ONE_DOCTOR_REQUEST:
			return {
				...state,
				isLoading: true,
				error: ''
			}
		case GET_ONE_DOCTOR_SUCCESS:
			return {
				...state,
				profile: payload,
				isLoading: false,
				error: ''
			}
		case GET_ONE_DOCTOR_FAILURE:
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
		case CLEAR_DOCTOR_PROFILE:
			return {
				...state,
				profile: null
			}
		case GET_DOCTORS_SLOTS_JWT_REQUEST:
		case GET_DOCTORS_SLOTS_REQUEST:
			return {
				...state,
				isLoading: true,
			}
		case GET_DOCTORS_SLOTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				slots: payload
			}
		case GET_DOCTORS_SLOTS_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		default:
			return state;
	}
};

export default AuthReducer;