import { ProfileActions, ProfileState } from './types';
import {
	SET_CONTACT_PROFILE_REQUEST,
	SET_CONTACT_PROFILE_SUCCESS,
	SET_CONTACT_PROFILE_FAILURE,
	SEND_VERIFICATION_CODE_REQUEST,
	SEND_VERIFICATION_CODE_SUCCESS,
	SEND_VERIFICATION_CODE_FAILURE,
	VALIDATE_CODE_REQUEST,
	VALIDATE_CODE_SUCCESS,
	VALIDATE_CODE_FAILURE,
	EDIT_ADDRESS_PROFILE_REQUEST,
	EDIT_ADDRESS_PROFILE_SUCCESS,
	EDIT_ADDRESS_PROFILE_FAILURE,
	UPDATE_USER_PROFILE_REQUEST,
	UPDATE_USER_PROFILE_SUCCESS,
	UPDATE_USER_PROFILE_FAILURE,
	GET_PROFILE_BY_TOKEN_REQUEST,
    GET_PROFILE_BY_TOKEN_SUCCESS,
    GET_PROFILE_BY_TOKEN_FAILURE,
	UPDATE_ABOUT_TEXT_REQUEST,
	UPDATE_ABOUT_TEXT_SUCCESS,
	UPDATE_ABOUT_TEXT_FAILURE,
	GET_ABOUT_TEXT_REQUEST,
	GET_ABOUT_TEXT_FAILURE,
	GET_ABOUT_TEXT_SUCCESS,
	UPDATE_EDUCATION_TEXT_REQUEST,
	UPDATE_EDUCATION_TEXT_SUCCESS,
	UPDATE_EDUCATION_TEXT_FAILURE,
	GET_EDUCATION_TEXT_REQUEST,
	GET_EDUCATION_TEXT_FAILURE,
	GET_EDUCATION_TEXT_SUCCESS,
	SHOW_MY_SPECIALITIES_REQUEST,
	SHOW_MY_SPECIALITIES_SUCCESS,
	SHOW_MY_SPECIALITIES_FAILURE,
	ADD_SPECIALITIES_REQUEST,
	ADD_SPECIALITIES_SUCCESS,
	ADD_SPECIALITIES_FAILURE,
	REMOVE_SPECIALITY_REQUEST,
	REMOVE_SPECIALITY_SUCCESS,
	REMOVE_SPECIALITY_FAILURE,
	GET_MEDICAL_DEGREES_REQUEST,
	GET_MEDICAL_DEGREES_FAILURE,
	GET_MEDICAL_DEGREES_SUCCESS,
	GET_MY_MEDICAL_DEGREES_REQUEST,
	GET_MY_MEDICAL_DEGREES_SUCCESS,
	GET_MY_MEDICAL_DEGREES_FAILURE,
	REMOVE_MY_MEDICAL_DEGREES_REQUEST,
	REMOVE_MY_MEDICAL_DEGREES_FAILURE,
	REMOVE_MY_MEDICAL_DEGREES_SUCCESS,
	ADD_MY_MEDICAL_DEGREES_REQUEST,
	ADD_MY_MEDICAL_DEGREES_FAILURE,
	ADD_MY_MEDICAL_DEGREES_SUCCESS,
	GET_ADDRESS_PROFILE_REQUEST,
	GET_ADDRESS_PROFILE_SUCCESS,
	GET_ADDRESS_PROFILE_FAILURE,
	UPLOAD_PHOTO_REQUEST,
	UPLOAD_PHOTO_FAILURE,
	UPLOAD_PHOTO_SUCCESS,
	CLEAR_SUCCESS_MESSAGE,
	SET_INSURANCE_REQUEST,
	SET_INSURANCE_FAILURE,
	SET_INSURANCE_SUCCESS,
	SET_INSURANCE_UPDATED,
	SET_DOCTORS_INSURANCE_REQUEST,
	SET_DOCTORS_INSURANCE_SUCCESS,
	SET_DOCTORS_INSURANCE_FAILURE,
	GET_DOCTORS_INSURANCE_REQUEST,
	GET_DOCTORS_INSURANCE_SUCCESS,
	GET_DOCTORS_INSURANCE_FAILURE,
	DELETE_DOCTORS_INSURANCE_REQUEST,
	DELETE_DOCTORS_INSURANCE_SUCCESS,
	DELETE_DOCTORS_INSURANCE_FAILURE,
	GET_AVATAR_REQUEST,
	GET_AVATAR_SUCCESS,
	GET_AVATAR_FAILURE,
	GET_PATIENT_INSURANCES_REQUEST,
	GET_PATIENT_INSURANCES_SUCCESS,
	GET_PATIENT_INSURANCES_FAILURE,
	DELETE_PATIENT_INSURANCES_REQUEST,
	DELETE_PATIENT_INSURANCES_SUCCESS,
	DELETE_PATIENT_INSURANCES_FAILURE,
	UPDATE_DOCTORS_LANGUAGES_REQUEST,
	UPDATE_DOCTORS_LANGUAGES_SUCCESS,
	UPDATE_DOCTORS_LANGUAGES_FAILURE,
	GET_DOCTORS_LANGUAGES_REQUEST,
	GET_DOCTORS_LANGUAGES_SUCCESS,
	GET_DOCTORS_LANGUAGES_FAILURE,
	UPDATE_PATIENT_INSURANCES_REQUEST,
	UPDATE_PATIENT_INSURANCES_SUCCESS,
	UPDATE_PATIENT_INSURANCES_FAILURE
} from './actions/profile';

export const INITIAL_STATE: ProfileState | null = {
	isLoading: false,
	isLoadingCodeSending: false,
	isLoadingCodeValidation: false,
	isLoadingSetAddress: false,
	isLoadingSpecialities: false,
	isPhotoLoading: false,
	isAddressLoading: false,
    phone: '',
    codeSended: false,
	profileUpdated: false,
	aboutUpdated: false,
	codeValidated: false,
	codeValidationError: false,
    codeSendingError: false,
    phoneVerified: false,
	insuranceUpdated: false,
    phoneVerifyStatus: '',
	aboutText: '',
	educationText: '',
	educationTextUpdated: false,
    address: '',
	baseInfo: {},
	fullProfile: {},
	currentInsurance: {},
    error: '',
	avatarUrl: '',
	selectedSpeciality: '',
	mySpecialities: [],
	medicalDegrees: [],
	myMedicalDegrees: [],
	doctorsInsuranceCompanies: [],
	patientInsurancesList: [],
	languages: []
};

const AuthReducer = (state = INITIAL_STATE, { type, payload }: ProfileActions<{data: any}>) => {
	switch (type) {
		case UPDATE_PATIENT_INSURANCES_REQUEST:
			return {
				...state,
				isLoading: true
			}
		case UPDATE_PATIENT_INSURANCES_SUCCESS:
			return {
				...state,
				isLoading: false,
				insuranceUpdated: true
			}
		case UPDATE_PATIENT_INSURANCES_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case UPDATE_DOCTORS_LANGUAGES_REQUEST:
			return {
				...state,
				isLoading: true
			}
		case UPDATE_DOCTORS_LANGUAGES_SUCCESS:
			return {
				...state,
				isLoading: false
			}
		case UPDATE_DOCTORS_LANGUAGES_FAILURE:
			return {
				...state,
				error: payload
			}
		case GET_DOCTORS_LANGUAGES_REQUEST:
			return {
				...state,
				isLoading: true
			}
		case GET_DOCTORS_LANGUAGES_SUCCESS:
			return {
				...state,
				isLoading: false,
				languages: payload
			}
		case GET_DOCTORS_LANGUAGES_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case DELETE_PATIENT_INSURANCES_REQUEST:
			return {
				...state,
				isLoading: true
			}
		case DELETE_PATIENT_INSURANCES_SUCCESS:
			return {
				...state,
				isLoading: false
			}
		case DELETE_PATIENT_INSURANCES_FAILURE:
			return {
				...state,
				error: payload
			}
		case GET_PATIENT_INSURANCES_REQUEST:
			return {
				...state,
				isLoading: true
			}
		case GET_PATIENT_INSURANCES_SUCCESS:
			return {
				...state,
				isLoading: false,
				patientInsurancesList: payload
			}
		case GET_PATIENT_INSURANCES_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case GET_AVATAR_REQUEST:
			return {
				...state,
				isLoading: true
			}
		case GET_AVATAR_SUCCESS:
			return {
				...state,
				isLoading: false,
				avatarUrl: payload
			}
		case GET_AVATAR_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case SET_DOCTORS_INSURANCE_REQUEST:
			return {
				...state,
				isLoading: true
			}
		case SET_DOCTORS_INSURANCE_SUCCESS:
			return {
				...state,
				isLoading: false,
			}
		case SET_DOCTORS_INSURANCE_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case GET_DOCTORS_INSURANCE_REQUEST:
			return {
				...state,
				isLoading: true
			}
		case GET_DOCTORS_INSURANCE_SUCCESS:
			return {
				...state,
				isLoading: false,
				doctorsInsuranceCompanies: payload
			}
		case GET_DOCTORS_INSURANCE_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case DELETE_DOCTORS_INSURANCE_REQUEST:
			return {
				...state,
				isLoading: true
			}
		case DELETE_DOCTORS_INSURANCE_SUCCESS:
			return {
				...state,
				isLoading: false
			}
		case DELETE_DOCTORS_INSURANCE_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case SET_INSURANCE_REQUEST:
			return {
				...state,
				isLoading: true,
				insuranceUpdated: false
			}
		case SET_INSURANCE_SUCCESS:
			return {
				...state,
				isLoading: false,
				insuranceUpdated: true,
				currentInsurance: payload
			}
		case SET_INSURANCE_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case SET_INSURANCE_UPDATED:
			return {
				...state,
				insuranceUpdated: payload
			}
		case SET_CONTACT_PROFILE_REQUEST:
			return {
				...state,
				codeSended: false,
				isLoading: true,
				error: ''
			}
		case SET_CONTACT_PROFILE_SUCCESS:
			return {
					...state,
					phone: payload,
					isLoading: false,
					error: ''
				};
		case SET_CONTACT_PROFILE_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			};
		case SEND_VERIFICATION_CODE_REQUEST:
			return {
				...state,
				isLoadingCodeSending: true,
				codeSended: false,
				codeValidated: false,
				codeValidationError: false
			};
		case SEND_VERIFICATION_CODE_SUCCESS:
			return {
				...state,
				isLoadingCodeSending: false,
				codeSended: true,
			};
		case SEND_VERIFICATION_CODE_FAILURE:
			return {
				...state,
				isLoadingCodeSending: false,
				codeSended: false,
				codeSendingError: true
			};
		case VALIDATE_CODE_REQUEST:
			return {
				...state,
				isLoadingCodeValidation:  true,
				codeValidated: false,
				codeValidationError: false
			};
		case VALIDATE_CODE_SUCCESS:
			return {
				...state,
				isLoadingCodeValidation:  true,
				codeValidated: true,
				codeValidationError: false
			};
		case VALIDATE_CODE_FAILURE:
			return {
				...state,
				isLoadingCodeValidation:  true,
				codeValidated: false,
				codeValidationError: true
			};
		case EDIT_ADDRESS_PROFILE_REQUEST:
			return {
				...state,
				isLoadingSetAddress: true,
				error: ''
			};
		case EDIT_ADDRESS_PROFILE_SUCCESS:
			return {
				...state,
				isLoadingSetAddress: false,
				address: payload,
				error: ''
			};
		case EDIT_ADDRESS_PROFILE_FAILURE:
			return {
				...state,
				isLoadingSetAddress: false,
				error: ''
			};
		case UPDATE_USER_PROFILE_REQUEST:
			return {
				...state,
				profileUpdated: false,
				isLoading: true,
				error: ''
			};
		case UPDATE_USER_PROFILE_SUCCESS:
			return {
				...state,
				isLoading: false,
				profileUpdated: true,
				fullProfile: {
					...state.fullProfile,
					...payload
				},
				error: ''
			};
		case UPDATE_USER_PROFILE_FAILURE:
			return {
				...state,
				isLoading: false,
				profileUpdated: false,
				error: payload
			};
		case GET_PROFILE_BY_TOKEN_REQUEST:
			return {
				...state,
				codeSended: false,
				isLoading: true,
			}
		case GET_PROFILE_BY_TOKEN_SUCCESS:
			return {
				...state,
				isLoading: false,
				profileUpdated: false,
				fullProfile: {
					...state.fullProfile,
					...payload
				},
				error: ''
			}
		case GET_PROFILE_BY_TOKEN_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case UPDATE_ABOUT_TEXT_REQUEST:
			return {
				...state,
				isLoading: true,
			}
		case UPDATE_ABOUT_TEXT_SUCCESS:
			return {
				...state,
				isLoading: false,
				aboutUpdated: true,
				error: ''
			}
		case UPDATE_ABOUT_TEXT_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case GET_ABOUT_TEXT_REQUEST:
			return {
				...state,
				isLoading: true,
				aboutUpdated: false,
				error: ''
			}
		case GET_ABOUT_TEXT_SUCCESS:
			return {
				...state,
				isLoading: false,
				aboutText: payload,
				error: ''
			}
		case GET_ABOUT_TEXT_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case UPDATE_EDUCATION_TEXT_REQUEST:
			return {
				...state,
				isLoading: true,
			}
		case UPDATE_EDUCATION_TEXT_SUCCESS:
			return {
				...state,
				isLoading: false,
				educationTextUpdated: true,
				error: ''
			}
		case UPDATE_EDUCATION_TEXT_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case GET_EDUCATION_TEXT_REQUEST:
			return {
				...state,
				isLoading: true,
				educationTextUpdated: false,
				error: ''
			}
		case GET_EDUCATION_TEXT_SUCCESS:
			return {
				...state,
				isLoading: false,
				educationText: payload,
				error: ''
			}
		case GET_EDUCATION_TEXT_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case CLEAR_SUCCESS_MESSAGE:
			return {
				...state,
				educationTextUpdated: false,
				aboutUpdated: false
			}
		case SHOW_MY_SPECIALITIES_REQUEST:
			return {
				...state,
				isLoading: true
			}
		case SHOW_MY_SPECIALITIES_SUCCESS:
			return {
				...state,
				isLoading: false,
				mySpecialities: payload
			}
		case SHOW_MY_SPECIALITIES_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case ADD_SPECIALITIES_REQUEST:
			return {
				...state,
				isLoading: true,
				error: ''
			}
		case ADD_SPECIALITIES_SUCCESS:
			return {
				...state,
				isLoading: false,
				specialitiesListUpdated: true
			}
		case ADD_SPECIALITIES_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case REMOVE_SPECIALITY_REQUEST:
			return {
				...state,
				isLoading: true
			}
		case REMOVE_SPECIALITY_SUCCESS:
			return {
				...state,
				isLoading: false,
				specialityDeleted: true
			}
		case REMOVE_SPECIALITY_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case GET_MEDICAL_DEGREES_REQUEST:
			return {
				...state,
				//isLoading: true
			}
		case GET_MEDICAL_DEGREES_SUCCESS:
			return {
				...state,
				//isLoading: false,
				medicalDegrees: payload
			}
		case GET_MEDICAL_DEGREES_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case GET_MY_MEDICAL_DEGREES_REQUEST:
			return {
				...state,
				isLoading: true
			}
		case GET_MY_MEDICAL_DEGREES_SUCCESS:
			return {
				...state,
				isLoading: false,
				myMedicalDegrees: payload
			}
		case GET_MY_MEDICAL_DEGREES_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case REMOVE_MY_MEDICAL_DEGREES_REQUEST:
			return {
				...state,
				isLoading: true
			}
		case REMOVE_MY_MEDICAL_DEGREES_SUCCESS:
			return {
				...state,
				isLoading: false
			}
		case REMOVE_MY_MEDICAL_DEGREES_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case ADD_MY_MEDICAL_DEGREES_REQUEST:
			return {
				...state,
				isLoading: true
			}
		case ADD_MY_MEDICAL_DEGREES_SUCCESS:
			return {
				...state,
				isLoading: false
			}
		case ADD_MY_MEDICAL_DEGREES_FAILURE:
			return {
				...state,
				isLoading: false,
				error: payload
			}
		case UPLOAD_PHOTO_REQUEST:
			return {
				...state,
				isPhotoLoading: true,
			}
		case UPLOAD_PHOTO_FAILURE:
			return {
				...state,
				isPhotoLoading: false,
				error: payload
			}
		case UPLOAD_PHOTO_SUCCESS:
			return {
				...state,
				isPhotoLoading: false
			}
		case GET_ADDRESS_PROFILE_REQUEST:
			return {
				...state,
				isAddressLoading: true
			}
		case GET_ADDRESS_PROFILE_SUCCESS:
			return {
				...state,
				isAddressLoading: false,
				address: payload
			}
		case GET_ADDRESS_PROFILE_FAILURE:
			return {
				...state,
				isAddressLoading: false,
				error: payload
			}
		default:
			return state;
	}
};

export default AuthReducer;
