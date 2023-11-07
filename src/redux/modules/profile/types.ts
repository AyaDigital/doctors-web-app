import { BaseInfoT, FullProfileT, SpecialityT, MedicalDegreeT, CurrentInsuranceT, LanguageT } from '../../../types';

export type SpecialityDataT = SpecialityT[];

export interface ProfileActions<T> {
	type: string;
	payload: T;
}

export interface ProfileState {
	isLoading: boolean;
    phone: '',
    codeSended: boolean,
    codeValidated: boolean,
    profileUpdated: boolean,
    aboutUpdated: boolean,
    phoneVerified: boolean,
    phoneVerifyStatus: any,
    aboutText: string,
    educationText: string,
	educationTextUpdated: boolean,
    isLoadingCodeSending: boolean,
    isLoadingCodeValidation: boolean,
    isLoadingSetAddress: boolean,
    isLoadingSpecialities: boolean,
    isPhotoLoading: boolean,
    isAddressLoading: boolean,
    codeSendingError: boolean,
    address: '',
    baseInfo: BaseInfoT, 
    error: Error | string,
    avatarUrl: string;
    fullProfile: FullProfileT,
    selectedSpeciality: string,
    mySpecialities: any[],
    doctorsInsuranceCompanies: any[],
    medicalDegrees: MedicalDegreeT[],
    myMedicalDegrees: MedicalDegreeT[],
    currentInsurance: CurrentInsuranceT,
    insuranceUpdated: boolean,
    patientInsurancesList: any[],
    languages: LanguageT[],
    codeValidationError: boolean,
}
