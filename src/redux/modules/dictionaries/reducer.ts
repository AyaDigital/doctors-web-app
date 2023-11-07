import { DictionariesState, DictionariesActions, SpecialitiesListT, LanguagesListT } from './types';
import { InsuranceCompanyT, LanguageT } from 'types';
import {
	GET_INSURANCE_LIST_FAILURE,
    GET_INSURANCE_LIST_REQUEST,
    GET_INSURANCE_LIST_SUCCESS,
	GET_SPECIALITIES_REQUEST,
	GET_SPECIALITIES_SUCCESS,
	GET_SPECIALITIES_FAILURE,
	GET_APPEALS_REQUEST,
	GET_APPEALS_SUCCESS,
	GET_APPEALS_FAILURE,
	CLEAR_SCROLL_TOKEN,
	GET_LANGUAGES_REQUEST,
	GET_LANGUAGES_SUCCESS,
	GET_LANGUAGES_FAILURE
} from './actions/dictionaries';

export const INITIAL_STATE: DictionariesState | null = {
	isLoading: false,
	isLoadingSpecialities: false,
	isLoadingAppeals: false,
	appeals: [],
	insuranceCompanies: {
		scrollToken: "",
		sizeResult: 0,
		isLastPage: false,
		totalResults: 115,
		data: []	
	},
	specialities: {
		scrollToken: "",
		sizeResult: 0,
		isLastPage: false,
		totalResults: 115,
		data: []		
	},
	languages: {
		scrollToken: "",
		sizeResult: 0,
		isLastPage: false,
		totalResults: 115,
		data: []		
	},
	selectedCompany: null,
	error: '',
	totalResults: 0,
	scrollToken: ''
};

const DictionariesReducer = (state = INITIAL_STATE, { type, payload }: DictionariesActions) => {
	switch (type) {
		case GET_INSURANCE_LIST_REQUEST:
			return {
				...state,
				isLoading: true,
				error: ''
			}
        case GET_INSURANCE_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                insuranceCompanies: {
					...state.insuranceCompanies,
					...payload,
					scrollToken: (payload as DictionariesState).scrollToken,
					data: [...(state.insuranceCompanies.data as InsuranceCompanyT[]), ...(payload.data as InsuranceCompanyT[])]
				},
                error: ''
            }
        case GET_INSURANCE_LIST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
		case GET_LANGUAGES_REQUEST:
			return {
				...state,
				isLoading: true,
				error: ''
			}
		case GET_LANGUAGES_SUCCESS:
			return {
                ...state,
                isLoading: false,
                languages: {
					...state.insuranceCompanies,
					...payload,
					scrollToken: (payload as DictionariesState).scrollToken,
					data: (payload as LanguagesListT).scrollToken ?
						[...state.languages.data, ...(payload as LanguagesListT).data] :
						(payload as LanguagesListT).data
				},
                error: ''
			}
		case GET_LANGUAGES_FAILURE:
			return {
                ...state,
                isLoading: false,
                error: payload
			}
			case GET_SPECIALITIES_REQUEST:
				return {
					...state,
					isLoadingSpecialities: true,
					error: ''
				}
			case GET_SPECIALITIES_SUCCESS:
				return {
					...state,
					isLoadingSpecialities: false,
					specialities: {
						...state.specialities,
						...payload,
						scrollToken: (payload as SpecialitiesListT).scrollToken,
						data: (payload as SpecialitiesListT).scrollToken ?
							[...state.specialities.data, ...(payload as SpecialitiesListT).data] :
							(payload as SpecialitiesListT).data
					},
					error: ''
				}
			case GET_SPECIALITIES_FAILURE:
				return {
					...state,
					isLoadingSpecialities: false,
					error: payload
				}
			case CLEAR_SCROLL_TOKEN:
				return {
					...state,
					specialities: {
						...state.specialities,
						scrollToken: ''
					}
				}
			case GET_APPEALS_REQUEST:
				return {
					...state,
					isLoadingAppeals: true
				}
			case GET_APPEALS_SUCCESS:
				return {
					...state,
					appeals: payload,
					isLoadingAppeals: false
				}
			case GET_APPEALS_FAILURE:
				return {
					...state,
					isLoadingAppeals: false,
					error: payload
				}
		default:
			return state;
	}
};

export default DictionariesReducer;
