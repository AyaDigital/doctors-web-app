import { ScheduleState, ScheduleActions, SlotsCountItemT } from './types';
import {
	GET_COUNT_SLOTS_REQUEST,
	GET_COUNT_SLOTS_SUCCESS,
	GET_COUNT_SLOTS_FAILURE,
	SET_SCHEDULE_REQUEST,
	SET_SCHEDULE_SUCCESS,
	SET_SCHEDULE_FAILURE,
	CREATE_APPOINTMENT_REQUEST,
	CREATE_APPOINTMENT_SUCCESS,
	CREATE_APPOINTMENT_FAILURE,
	UPDATE_SCHEDULE_STATUS,
	GET_APPOINTMENTS_BY_PERIOD_REQUEST,
	GET_APPOINTMENTS_BY_PERIOD_SUCCESS,
	GET_APPOINTMENTS_BY_PERIOD_FAILURE,
	CANCEL_APPOINTMENT_REQUEST,
	CANCEL_APPOINTMENT_SUCCESS,
	CANCEL_APPOINTMENT_FAILURE,
	UPDATE_APPOINTMENT_REQUEST,
	UPDATE_APPOINTMENT_FAILURE,
	UPDATE_APPOINTMENT_SUCCESS,
	UPDATE_APPOINTMENT_STATUS,
	GET_MY_SLOTS_REQUEST,
	GET_MY_SLOTS_SUCCESS,
	GET_MY_SLOTS_FAILURE,
	CLEAR_CANCELED_STATUS,
	CLEAR_ERROR_STATUS,
	DELETE_SCHEDULE_REQUEST,
	DELETE_SCHEDULE_SUCCESS,
	DELETE_SCHEDULE_FAILURE,
	GET_CANCELLED_APPOINTMENTS_REQUEST,
	GET_CANCELLED_APPOINTMENTS_SUCCESS,
	GET_CANCELLED_APPOINTMENTS_FAILURE
} from './actions/schedule';

export const INITIAL_STATE: ScheduleState | null = {
	isLoading: false,
	isScheduleCreationLoading: false,
	scheduleCreated: false,
	appointmentCanceled: false,
	appointmentCreated: false,
	newAppointment: {},
	slotsNum: 0,
	slots: [],
	mySlots: [],
	appointments: [],
	cancelledAppointments: [],
	error: '',
	cancellError: ''
};

const ScheduleReducer = (state = INITIAL_STATE, { type, payload }: ScheduleActions<{data: any}>) => {
	switch (type) {
		case DELETE_SCHEDULE_REQUEST:
			return {
				...state,
				isLoading: true,
				error: ''
			}
		case DELETE_SCHEDULE_SUCCESS:
			return {
				...state,
				isLoading: false
			}
		case DELETE_SCHEDULE_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case UPDATE_APPOINTMENT_REQUEST:
			return {
				...state,
				error: '',
				isLoading: true
			}
		case UPDATE_APPOINTMENT_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case UPDATE_APPOINTMENT_SUCCESS:
			return {
				...state,
				appointmentCreated: payload
			}
		case GET_COUNT_SLOTS_REQUEST:
			return {
				...state,
				isLoading: true,
				slots: [],
				error: ''
			}
		case GET_COUNT_SLOTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				slots: payload,
				error: ''
			}
		case GET_COUNT_SLOTS_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case SET_SCHEDULE_REQUEST:
			return {
				...state,
				scheduleCreated: false,
				isScheduleCreationLoading: true,
				error: ''
			}
		case SET_SCHEDULE_SUCCESS:
			return {
				...state,
				isScheduleCreationLoading: false,
				scheduleCreated: true,
				error: ''
			}
		case SET_SCHEDULE_FAILURE:
			return {
				...state,
				isScheduleCreationLoading: false,
				error: payload
			}
		case UPDATE_SCHEDULE_STATUS:
			return {
				...state,
				scheduleCreated: payload
			}
		case CREATE_APPOINTMENT_REQUEST:
			return {
				...state,
				isLoading: true,
				error: ''
			}
		case CREATE_APPOINTMENT_SUCCESS:
			return {
				...state,
				isLoading: false,
				appointmentCreated: true,
				newAppointment: payload,
				error: ''
			}
		case CREATE_APPOINTMENT_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case GET_CANCELLED_APPOINTMENTS_REQUEST:
			return {
				...state,
				isLoading: true
			}
		case GET_CANCELLED_APPOINTMENTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				cancelledAppointments: payload
			}
		case GET_CANCELLED_APPOINTMENTS_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case GET_APPOINTMENTS_BY_PERIOD_REQUEST:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case GET_APPOINTMENTS_BY_PERIOD_SUCCESS:
			return {
				...state,
				isLoading: false,
				appointments: payload
			}
		case GET_APPOINTMENTS_BY_PERIOD_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case CANCEL_APPOINTMENT_REQUEST:
			return {
				...state,
				isLoading: true,
				cancellError: ''
			}
		case CANCEL_APPOINTMENT_SUCCESS:
			return {
				isLoading: false,
				appointmentCanceled: true
			}
		case CANCEL_APPOINTMENT_FAILURE:
			return {
				...state,
				isLoading: false,
				appointmentCanceled: false,
				cancellError: payload
			}
		case CLEAR_CANCELED_STATUS:
			return {
				appointmentCanceled: false
			}
		case CLEAR_ERROR_STATUS:
			return {
				...state,
				error: '',
				cancellError: ''
			}
		case UPDATE_APPOINTMENT_STATUS:
			return {
				...state,
				appointmentCreated: payload,
				isLoading: false
			}
		case GET_MY_SLOTS_REQUEST:
			return {
				...state,
				isLoading: true,
			}
		case GET_MY_SLOTS_SUCCESS:
			return {
				...state,
				isLoading: false,
				mySlots: payload
			}
		case GET_MY_SLOTS_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		default:
			return state;
	}
}

export default ScheduleReducer;