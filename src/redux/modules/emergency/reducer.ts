import { EmergencyState, EmergencyActions, EmergencyContactType } from './types';
import {
	GET_EMERGENCY_CONTACT_SUCCESS,
	GET_EMERGENCY_CONTACT_REQUEST,
	GET_EMERGENCY_CONTACT_FAILURE,
	SET_EMERGENCY_CONTACT_SUCCESS,
	SET_EMERGENCY_CONTACT_REQUEST,
	SET_EMERGENCY_CONTACT_FAILURE,
	GET_EMERGENCY_TYPES_SUCCESS,
	GET_EMERGENCY_TYPES_REQUEST,
	GET_EMERGENCY_TYPES_FAILURE,
	GET_ONE_EMERGENCY_CONTACT_SUCCESS,
	GET_ONE_EMERGENCY_CONTACT_REQUEST,
	GET_ONE_EMERGENCY_CONTACT_FAILURE
} from './actions/emergency';

export const INITIAL_STATE: EmergencyState | null = {
	isLoading: false,
	contacts: [],
	currentContact: {
        id: undefined,
        fullName: "",
		phone: "",
        summary: "",
		type: {
            id: 0,
            name: ""
		}
	},
	error: '',
	types: {
		scrollToken: null,
		scrollTime: "",
		sizeResult: 0,
		isLastPage: true,
		totalResults: 0,
		data: [],
	},
	enabled: true,
};

const EmergencyReducer = (state = INITIAL_STATE, { type, payload }: EmergencyActions<EmergencyContactType>) => {
	switch (type) {
		case GET_ONE_EMERGENCY_CONTACT_SUCCESS:
			return {
				...state,
				isLoading: false,
				currentContact: payload
			}
		case GET_ONE_EMERGENCY_CONTACT_REQUEST:
			return {
				...state,
				isLoading: true,
			}
		case GET_ONE_EMERGENCY_CONTACT_FAILURE:
			return {
				...state,
				isLoading: false,
			}
		case GET_EMERGENCY_TYPES_REQUEST:
			return {
				...state,
				isLoading: true
			}
		case GET_EMERGENCY_TYPES_SUCCESS:
			return {
				...state,
				isLoading: false,
				types: payload
			}
		case GET_EMERGENCY_TYPES_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case GET_EMERGENCY_CONTACT_REQUEST:
			return {
				...state,
				isLoading: true
			}
		case GET_EMERGENCY_CONTACT_SUCCESS:
			return {
				...state,
				isLoading: false,
				contacts: payload
			}
		case GET_EMERGENCY_CONTACT_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case SET_EMERGENCY_CONTACT_REQUEST:
			return {
				...state,
				isLoading: true
			}
		case SET_EMERGENCY_CONTACT_SUCCESS:
			return {
				...state,
				isLoading: false
			}
		case SET_EMERGENCY_CONTACT_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		default:
			return state;
	}
}

export default EmergencyReducer;
