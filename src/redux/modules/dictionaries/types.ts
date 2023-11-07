import { InsuranceCompanyT, DictionaryT, SpecialityT, AppealT, LanguageT } from 'types';

export interface DictionariesActions<T = any> {
	type: string;
	payload: T;
}

export type SpecialitiesListT = {
    scrollToken: string
    sizeResult: number
    isLastPage: boolean
    totalResults: number
    data: SpecialityT[]
}

export type LanguagesListT = {
    scrollToken: string
    sizeResult: number
    isLastPage: boolean
    totalResults: number
    data: SpecialityT[]
}

export interface DictionariesState {
	isLoading: boolean,
	isLoadingSpecialities: boolean,
	isLoadingAppeals: boolean,
	appeals: AppealT[],
	insuranceCompanies: DictionaryT<InsuranceCompanyT>,
	languages: DictionaryT<LanguageT>,
	selectedCompany: null | InsuranceCompanyT,
	error: string,
	totalResults: number,
	scrollToken: string,
	specialities: SpecialitiesListT,
}
