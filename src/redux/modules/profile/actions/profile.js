import { createAction } from 'redux-actions'

export const SET_CONTACT_PROFILE_REQUEST = 'SET_CONTACT_PROFILE_REQUEST';
export const SET_CONTACT_PROFILE_SUCCESS = 'SET_CONTACT_PROFILE_SUCCESS';
export const SET_CONTACT_PROFILE_FAILURE = 'SET_CONTACT_PROFILE_FAILURE';

export const SEND_VERIFICATION_CODE_REQUEST = 'SEND_VERIFICATION_CODE_REQUEST';
export const SEND_VERIFICATION_CODE_SUCCESS = 'SEND_VERIFICATION_CODE_SUCCESS';
export const SEND_VERIFICATION_CODE_FAILURE = 'SEND_VERIFICATION_CODE_FAILURE';

export const VALIDATE_CODE_REQUEST = 'VALIDATE_CODE_REQUEST';
export const VALIDATE_CODE_SUCCESS = 'VALIDATE_CODE_SUCCESS';
export const VALIDATE_CODE_FAILURE = 'VALIDATE_CODE_FAILURE';

export const EDIT_ADDRESS_PROFILE_REQUEST = 'EDIT_ADDRESS_PROFILE_REQUEST';
export const EDIT_ADDRESS_PROFILE_SUCCESS = 'EDIT_ADDRESS_PROFILE_SUCCESS';
export const EDIT_ADDRESS_PROFILE_FAILURE = 'EDIT_ADDRESS_PROFILE_FAILURE';

export const GET_PROFILE_BY_TOKEN_REQUEST = 'GET_PROFILE_BY_TOKEN_REQUEST';
export const GET_PROFILE_BY_TOKEN_SUCCESS = 'GET_PROFILE_BY_TOKEN_SUCCESS';
export const GET_PROFILE_BY_TOKEN_FAILURE = 'GET_PROFILE_BY_TOKEN_FAILURE';

export const UPDATE_USER_PROFILE_REQUEST = 'UPDATE_USER_PROFILE_REQUEST';
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS';
export const UPDATE_USER_PROFILE_FAILURE = 'UPDATE_USER_PROFILE_FAILURE';

export const UPDATE_ABOUT_TEXT_REQUEST = 'UPDATE_ABOUT_TEXT_REQUEST';
export const UPDATE_ABOUT_TEXT_SUCCESS = 'UPDATE_ABOUT_TEXT_SUCCESS';
export const UPDATE_ABOUT_TEXT_FAILURE = 'UPDATE_ABOUT_TEXT_FAILURE';

export const GET_ABOUT_TEXT_REQUEST = 'GET_ABOUT_TEXT_REQUEST';
export const GET_ABOUT_TEXT_SUCCESS = 'GET_ABOUT_TEXT_SUCCESS';
export const GET_ABOUT_TEXT_FAILURE = 'GET_ABOUT_TEXT_FAILURE';

export const UPDATE_EDUCATION_TEXT_REQUEST = 'UPDATE_EDUCATION_TEXT_REQUEST';
export const UPDATE_EDUCATION_TEXT_SUCCESS = 'UPDATE_EDUCATION_TEXT_SUCCESS';
export const UPDATE_EDUCATION_TEXT_FAILURE = 'UPDATE_EDUCATION_TEXT_FAILURE';

export const GET_EDUCATION_TEXT_REQUEST = 'GET_EDUCATION_TEXT_REQUEST';
export const GET_EDUCATION_TEXT_SUCCESS = 'GET_EDUCATION_TEXT_SUCCESS';
export const GET_EDUCATION_TEXT_FAILURE = 'GET_EDUCATION_TEXT_FAILURE';

export const ADD_SPECIALITIES_REQUEST = 'ADD_SPECIALITIES_REQUEST';
export const ADD_SPECIALITIES_SUCCESS = 'ADD_SPECIALITIES_SUCCESS';
export const ADD_SPECIALITIES_FAILURE = 'ADD_SPECIALITIES_FAILURE';

export const SHOW_MY_SPECIALITIES_REQUEST = 'SHOW_MY_SPECIALITIES_REQUEST';
export const SHOW_MY_SPECIALITIES_SUCCESS = 'SHOW_MY_SPECIALITIES_SUCCESS';
export const SHOW_MY_SPECIALITIES_FAILURE = 'SHOW_MY_SPECIALITIES_FAILURE';

export const REMOVE_SPECIALITY_REQUEST = 'REMOVE_SPECIALITY_REQUEST';
export const REMOVE_SPECIALITY_SUCCESS = 'REMOVE_SPECIALITY_SUCCESS';
export const REMOVE_SPECIALITY_FAILURE = 'REMOVE_SPECIALITY_FAILURE';

export const GET_MEDICAL_DEGREES_REQUEST = 'GET_MEDICAL_DEGREES_REQUEST';
export const GET_MEDICAL_DEGREES_SUCCESS = 'GET_MEDICAL_DEGREES_SUCCESS';
export const GET_MEDICAL_DEGREES_FAILURE = 'GET_MEDICAL_DEGREES_FAILURE';

export const GET_MY_MEDICAL_DEGREES_REQUEST = 'GET_MY_MEDICAL_DEGREES_REQUEST';
export const GET_MY_MEDICAL_DEGREES_SUCCESS = 'GET_MY_MEDICAL_DEGREES_SUCCESS';
export const GET_MY_MEDICAL_DEGREES_FAILURE = 'GET_MY_MEDICAL_DEGREES_FAILURE';

export const REMOVE_MY_MEDICAL_DEGREES_REQUEST = 'REMOVE_MY_MEDICAL_DEGREES_REQUEST';
export const REMOVE_MY_MEDICAL_DEGREES_FAILURE = 'REMOVE_MY_MEDICAL_DEGREES_FAILURE';
export const REMOVE_MY_MEDICAL_DEGREES_SUCCESS = 'REMOVE_MY_MEDICAL_DEGREES_SUCCESS';

export const ADD_MY_MEDICAL_DEGREES_REQUEST = 'ADD_MY_MEDICAL_DEGREES_REQUEST';
export const ADD_MY_MEDICAL_DEGREES_FAILURE = 'ADD_MY_MEDICAL_DEGREES_FAILURE';
export const ADD_MY_MEDICAL_DEGREES_SUCCESS = 'ADD_MY_MEDICAL_DEGREES_SUCCESS';

export const UPLOAD_PHOTO_REQUEST = 'UPLOAD_PHOTO_REQUEST';
export const UPLOAD_PHOTO_FAILURE = 'UPLOAD_PHOTO_FAILURE';
export const UPLOAD_PHOTO_SUCCESS = 'UPLOAD_PHOTO_SUCCESS';

export const GET_ADDRESS_PROFILE_REQUEST = 'GET_ADDRESS_PROFILE_REQUEST';
export const GET_ADDRESS_PROFILE_FAILURE = 'GET_ADDRESS_PROFILE_FAILURE';
export const GET_ADDRESS_PROFILE_SUCCESS = 'GET_ADDRESS_PROFILE_SUCCESS';

export const SET_INSURANCE_REQUEST = 'SET_INSURANCE_REQUEST';
export const SET_INSURANCE_FAILURE = 'SET_INSURANCE_FAILURE';
export const SET_INSURANCE_SUCCESS = 'SET_INSURANCE_SUCCESS';

export const SET_INSURANCE_UPDATED = 'SET_INSURANCE_UPDATED';

export const CLEAR_SUCCESS_MESSAGE = 'CLEAR_SUCCESS_MESSAGE';

export const GET_AVATAR_REQUEST = 'GET_AVATAR_REQUEST';
export const GET_AVATAR_SUCCESS = 'GET_AVATAR_SUCCESS';
export const GET_AVATAR_FAILURE = 'GET_AVATAR_FAILURE';

export const setInsuranceUpdated = createAction(SET_INSURANCE_UPDATED);

export const SET_DOCTORS_INSURANCE_REQUEST = 'SET_DOCTORS_INSURANCE_REQUEST';
export const SET_DOCTORS_INSURANCE_SUCCESS = 'SET_DOCTORS_INSURANCE_SUCCESS';
export const SET_DOCTORS_INSURANCE_FAILURE = 'SET_DOCTORS_INSURANCE_FAILURE';

export const GET_DOCTORS_INSURANCE_REQUEST = 'GET_DOCTORS_INSURANCE_REQUEST';
export const GET_DOCTORS_INSURANCE_SUCCESS = 'GET_DOCTORS_INSURANCE_SUCCESS';
export const GET_DOCTORS_INSURANCE_FAILURE = 'GET_DOCTORS_INSURANCE_FAILURE';

export const DELETE_DOCTORS_INSURANCE_REQUEST = 'DELETE_DOCTORS_INSURANCE_REQUEST';
export const DELETE_DOCTORS_INSURANCE_SUCCESS = 'DELETE_DOCTORS_INSURANCE_SUCCESS';
export const DELETE_DOCTORS_INSURANCE_FAILURE = 'DELETE_DOCTORS_INSURANCE_FAILURE';

export const GET_PATIENT_INSURANCES_REQUEST = 'GET_PATIENT_INSURANCES_REQUEST';
export const GET_PATIENT_INSURANCES_SUCCESS = 'GET_PATIENT_INSURANCES_SUCCESS';
export const GET_PATIENT_INSURANCES_FAILURE = 'GET_PATIENT_INSURANCES_FAILURE';

export const DELETE_PATIENT_INSURANCES_REQUEST = 'DELETE_PATIENT_INSURANCES_REQUEST';
export const DELETE_PATIENT_INSURANCES_SUCCESS = 'DELETE_PATIENT_INSURANCES_SUCCESS';
export const DELETE_PATIENT_INSURANCES_FAILURE = 'DELETE_PATIENT_INSURANCES_FAILURE';


export const UPDATE_DOCTORS_LANGUAGES_REQUEST = 'UPDATE_DOCTORS_LANGUAGES_REQUEST';
export const UPDATE_DOCTORS_LANGUAGES_SUCCESS = 'UPDATE_DOCTORS_LANGUAGES_SUCCESS';
export const UPDATE_DOCTORS_LANGUAGES_FAILURE = 'UPDATE_DOCTORS_LANGUAGES_FAILURE';

export const GET_DOCTORS_LANGUAGES_REQUEST = 'GET_DOCTORS_LANGUAGES_REQUEST';
export const GET_DOCTORS_LANGUAGES_SUCCESS = 'GET_DOCTORS_LANGUAGES_SUCCESS';
export const GET_DOCTORS_LANGUAGES_FAILURE = 'GET_DOCTORS_LANGUAGES_FAILURE';

export const updateDoctorslanguagesRequest = createAction(UPDATE_DOCTORS_LANGUAGES_REQUEST);
export const updateDoctorslanguagesSuccess = createAction(UPDATE_DOCTORS_LANGUAGES_SUCCESS);
export const updateDoctorslanguagesFailure = createAction(UPDATE_DOCTORS_LANGUAGES_FAILURE);

export const getDoctorslanguagesRequest = createAction(GET_DOCTORS_LANGUAGES_REQUEST);
export const getDoctorslanguagesSuccess = createAction(GET_DOCTORS_LANGUAGES_SUCCESS);
export const getDoctorslanguagesFailure = createAction(GET_DOCTORS_LANGUAGES_FAILURE);

export const UPDATE_PATIENT_INSURANCES_REQUEST = 'UPDATE_PATIENT_INSURANCES_REQUEST';
export const UPDATE_PATIENT_INSURANCES_SUCCESS = 'UPDATE_PATIENT_INSURANCES_SUCCESS';
export const UPDATE_PATIENT_INSURANCES_FAILURE = 'UPDATE_PATIENT_INSURANCES_FAILURE';

export const updatePatientInsuranceRequest = createAction('UPDATE_PATIENT_INSURANCES_REQUEST');
export const updatePatientInsuranceSuccess = createAction('UPDATE_PATIENT_INSURANCES_SUCCESS');
export const updatePatientInsuranceFailure = createAction('UPDATE_PATIENT_INSURANCES_FAILURE');

export const deleteDoctorsInsuranceRequest = createAction(DELETE_DOCTORS_INSURANCE_REQUEST);
export const deleteDoctorsInsuranceSuccess = createAction(DELETE_DOCTORS_INSURANCE_SUCCESS);
export const deleteDoctorsInsuranceFailure = createAction(DELETE_DOCTORS_INSURANCE_FAILURE);

export const setDoctorInsuranceRequest = createAction(SET_DOCTORS_INSURANCE_REQUEST);
export const setDoctorInsuranceSuccess = createAction(SET_DOCTORS_INSURANCE_SUCCESS);
export const setDoctorInsuranceFailure = createAction(SET_DOCTORS_INSURANCE_FAILURE);

export const getDoctorInsuranceRequest = createAction(GET_DOCTORS_INSURANCE_REQUEST);
export const getDoctorInsuranceSuccess = createAction(GET_DOCTORS_INSURANCE_SUCCESS);
export const getDoctorInsuranceFailure = createAction(GET_DOCTORS_INSURANCE_FAILURE);

export const setInsuranceRequest = createAction(SET_INSURANCE_REQUEST);
export const setInsuranceFailure = createAction(SET_INSURANCE_FAILURE);
export const setInsuranceSuccess = createAction(SET_INSURANCE_SUCCESS);

export const setContactProfileRequest = createAction(SET_CONTACT_PROFILE_REQUEST);
export const setContactProfileSuccess = createAction(SET_CONTACT_PROFILE_SUCCESS);
export const setContactProfileFailure = createAction(SET_CONTACT_PROFILE_FAILURE);

export const getAddressProfileRequest = createAction(GET_ADDRESS_PROFILE_REQUEST);
export const getAddressProfileSuccess = createAction(GET_ADDRESS_PROFILE_SUCCESS);
export const getAddressProfileFailure = createAction(GET_ADDRESS_PROFILE_FAILURE);

export const validateCodeRequest = createAction(VALIDATE_CODE_REQUEST);
export const validateCodeSuccess = createAction(VALIDATE_CODE_SUCCESS);
export const validateCodeFailure = createAction(VALIDATE_CODE_FAILURE);

export const sendVerificationCodeRequest = createAction(SEND_VERIFICATION_CODE_REQUEST);
export const sendVerificationCodeSuccess = createAction(SEND_VERIFICATION_CODE_SUCCESS);
export const sendVerificationCodeFailure = createAction(SEND_VERIFICATION_CODE_FAILURE);

export const editAddressProfileRequest = createAction(EDIT_ADDRESS_PROFILE_REQUEST)
export const editAddressProfileFailure = createAction(EDIT_ADDRESS_PROFILE_FAILURE)
export const editAddressProfileSuccess = createAction(EDIT_ADDRESS_PROFILE_SUCCESS)

export const updateUserProfileRequest = createAction(UPDATE_USER_PROFILE_REQUEST)
export const updateUserProfileFailure = createAction(UPDATE_USER_PROFILE_FAILURE)
export const updateUserProfileSuccess = createAction(UPDATE_USER_PROFILE_SUCCESS)

export const getProfileByTokenRequest = createAction(GET_PROFILE_BY_TOKEN_REQUEST);
export const getProfileByTokenSuccess = createAction(GET_PROFILE_BY_TOKEN_SUCCESS);
export const getProfileByTokenFailure = createAction(GET_PROFILE_BY_TOKEN_FAILURE);

export const updateAboutTextRequest = createAction(UPDATE_ABOUT_TEXT_REQUEST);
export const updateAboutTextSuccess = createAction(UPDATE_ABOUT_TEXT_SUCCESS);
export const updateAboutTextFailure = createAction(UPDATE_ABOUT_TEXT_FAILURE);

export const getAboutTextRequest = createAction(GET_ABOUT_TEXT_REQUEST);
export const getAboutTextSuccess = createAction(GET_ABOUT_TEXT_SUCCESS);
export const getAboutTextFailure = createAction(GET_ABOUT_TEXT_FAILURE);

export const updateEducationTextRequest = createAction(UPDATE_EDUCATION_TEXT_REQUEST);
export const updateEducationTextSuccess = createAction(UPDATE_EDUCATION_TEXT_SUCCESS);
export const updateEducationTextFailure = createAction(UPDATE_EDUCATION_TEXT_FAILURE);

export const getEducationTextRequest = createAction(GET_EDUCATION_TEXT_REQUEST);
export const getEducationTextSuccess = createAction(GET_EDUCATION_TEXT_SUCCESS);
export const getEducationTextFailure = createAction(GET_EDUCATION_TEXT_FAILURE);

export const clearSuceessMessage = createAction(CLEAR_SUCCESS_MESSAGE);

export const addSpecialitiesRequest = createAction(ADD_SPECIALITIES_REQUEST);
export const addSpecialitiesSuccess = createAction(ADD_SPECIALITIES_SUCCESS);
export const addSpecialitiesFailure = createAction(ADD_SPECIALITIES_FAILURE);

export const showMySpecialitiesRequest = createAction(SHOW_MY_SPECIALITIES_REQUEST);
export const showMySpecialitiesSuccess = createAction(SHOW_MY_SPECIALITIES_SUCCESS);
export const showMySpecialitiesFailure = createAction(SHOW_MY_SPECIALITIES_FAILURE);

export const removeSpecialityRequest = createAction(REMOVE_SPECIALITY_REQUEST);
export const removeSpecialitySuccess = createAction(REMOVE_SPECIALITY_SUCCESS);
export const removeSpecialityFailure = createAction(REMOVE_SPECIALITY_FAILURE);

export const getMedicalDegreesRequest = createAction(GET_MEDICAL_DEGREES_REQUEST);
export const getMedicalDegreesSuccess = createAction(GET_MEDICAL_DEGREES_SUCCESS);
export const getMedicalDegreesFailure = createAction(GET_MEDICAL_DEGREES_FAILURE);

export const getMyMedicalDegreesRequest = createAction(GET_MY_MEDICAL_DEGREES_REQUEST);
export const getMyMedicalDegreesSuccess = createAction(GET_MY_MEDICAL_DEGREES_SUCCESS);
export const getMyMedicalDegreesFailure = createAction(GET_MY_MEDICAL_DEGREES_FAILURE);

export const removeMyMedicalDegreesRequest = createAction(REMOVE_MY_MEDICAL_DEGREES_REQUEST);
export const removeMyMedicalDegreesSuccess = createAction(REMOVE_MY_MEDICAL_DEGREES_SUCCESS);
export const removeMyMedicalDegreesFailure = createAction(REMOVE_MY_MEDICAL_DEGREES_FAILURE);

export const addMyMedicalDegreesRequest = createAction(ADD_MY_MEDICAL_DEGREES_REQUEST);
export const addMyMedicalDegreesFailure = createAction(ADD_MY_MEDICAL_DEGREES_FAILURE);
export const addMyMedicalDegreesSuccess = createAction(ADD_MY_MEDICAL_DEGREES_SUCCESS);

export const uploadPhotoRequest = createAction(UPLOAD_PHOTO_REQUEST);
export const uploadPhotoFailure = createAction(UPLOAD_PHOTO_FAILURE);
export const uploadPhotoSuccess = createAction(UPLOAD_PHOTO_SUCCESS);

export const getAvatarRequest = createAction(GET_AVATAR_REQUEST);
export const getAvatarFailure = createAction(GET_AVATAR_FAILURE);
export const getAvatarSuccess = createAction(GET_AVATAR_SUCCESS);

export const getPatientInsurancesRequest = createAction(GET_PATIENT_INSURANCES_REQUEST);
export const getPatientInsurancesSuccess = createAction(GET_PATIENT_INSURANCES_SUCCESS);
export const getPatientInsurancesFailure = createAction(GET_PATIENT_INSURANCES_FAILURE);

export const deletePatientInsurancesRequest = createAction(DELETE_PATIENT_INSURANCES_REQUEST);
export const deletePatientInsurancesSuccess = createAction(DELETE_PATIENT_INSURANCES_SUCCESS);
export const deletePatientInsurancesFailure = createAction(DELETE_PATIENT_INSURANCES_FAILURE);
