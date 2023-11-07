import omitBy from 'lodash/omitBy';
import FormData from 'form-data';
import { takeEvery, put, call, select } from 'redux-saga/effects';
import {
	setContactProfileRequest,
	setContactProfileSuccess,
	setContactProfileFailure,
	sendVerificationCodeRequest,
	sendVerificationCodeSuccess,
	sendVerificationCodeFailure,
	validateCodeRequest,
	validateCodeSuccess,
	validateCodeFailure,
	editAddressProfileRequest,
	editAddressProfileSuccess,
	editAddressProfileFailure,
	updateUserProfileFailure,
	updateUserProfileSuccess,
	updateUserProfileRequest,
	getProfileByTokenRequest,
	getProfileByTokenSuccess,
	getProfileByTokenFailure,
	updateAboutTextRequest,
	updateAboutTextSuccess,
	updateAboutTextFailure,
	getAboutTextRequest,
	getAboutTextSuccess,
	getAboutTextFailure,
	updateEducationTextRequest,
	updateEducationTextSuccess,
	updateEducationTextFailure,
	getEducationTextRequest,
	getEducationTextSuccess,
	getEducationTextFailure,
	addSpecialitiesRequest,
	addSpecialitiesSuccess,
	addSpecialitiesFailure,
	showMySpecialitiesRequest,
	showMySpecialitiesSuccess,
	showMySpecialitiesFailure,
	removeSpecialityRequest,
	removeSpecialitySuccess,
	removeSpecialityFailure,
	getMedicalDegreesRequest,
	getMedicalDegreesSuccess,
	getMedicalDegreesFailure,
	getMyMedicalDegreesRequest,
	getMyMedicalDegreesSuccess,
	getMyMedicalDegreesFailure,
	removeMyMedicalDegreesRequest,
	removeMyMedicalDegreesSuccess,
	removeMyMedicalDegreesFailure,
	addMyMedicalDegreesRequest,
	addMyMedicalDegreesFailure,
	addMyMedicalDegreesSuccess,
	getAddressProfileRequest,
	getAddressProfileSuccess,
	getAddressProfileFailure,
	uploadPhotoRequest,
	uploadPhotoFailure,
	uploadPhotoSuccess,
	setInsuranceRequest,
	setInsuranceFailure,
	setInsuranceSuccess,
	setDoctorInsuranceRequest,
	setDoctorInsuranceSuccess,
	setDoctorInsuranceFailure,
	getDoctorInsuranceRequest,
	getDoctorInsuranceSuccess,
	getDoctorInsuranceFailure,
	deleteDoctorsInsuranceRequest,
	deleteDoctorsInsuranceSuccess,
	deleteDoctorsInsuranceFailure,
	getAvatarRequest,
	getAvatarSuccess,
	getAvatarFailure,
	getPatientInsurancesRequest,
	getPatientInsurancesSuccess,
	getPatientInsurancesFailure,
	deletePatientInsurancesRequest,
	deletePatientInsurancesSuccess,
	deletePatientInsurancesFailure,
	updateDoctorslanguagesRequest,
	updateDoctorslanguagesSuccess,
	updateDoctorslanguagesFailure,
	getDoctorslanguagesRequest,
	getDoctorslanguagesSuccess,
	getDoctorslanguagesFailure,
	updatePatientInsuranceRequest,
	updatePatientInsuranceSuccess,
	updatePatientInsuranceFailure
} from './actions/profile';
import * as api from '../../../utils/api';

const phoneUrl = 'api/profile/phone';
const verifyUrlTemp = 'api/profile/phone-send-verify-code';
const verifyUrl = 'api/profile/phone-send-verify-code-sms';

const verifyCodeUrl = 'api/profile/phone-verify';
const addressUrl = 'api/settings/address';
const profileUrl = 'api/profile';
const aboutUrl = 'api/profile/about-info';
const educationUrl = 'api/education-train';
const addSpecialitiesUrl = 'api/settings/add-specialities';
const showMySpecialitiesUrl = 'api/settings/show-my-specialities';
const removeSpecialityUrl = 'api/settings/destroy-specialities';
const medicalDegreesUrl = 'api/settings/medical-degrees';
const myMedicalDegreesUrl = 'api/settings/medical-degrees/list-profile';
const getAvatarUrl = 'api/profile/avatar';
const uploadFileUrl = 'api/profile/avatar/upload';
const insurancesUrl = 'api/profile/insurances';
const insuranceSettingsUrl = 'api/settings/insurances';
const doctorsProfileInsurancesUrl = 'api/settings/insurances/profile-insurances';
const refreshLanguagesUrl = 'api/settings/languages/refresh';
const getLanguagesUrl = 'api/settings/languages';
const refreshSpecialitiesURL = 'api/settings/refresh';

function* setContact({ payload }) {
	try {
		const dataToSend = {
			"phone": payload.phone
		}
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.patchData, token, phoneUrl, dataToSend)

		if (data) {
			yield put(setContactProfileSuccess({ data: data.phone }))
			if (!data.verified) {
				yield put(sendVerificationCodeRequest());
			}
		} else {
			yield put(setContactProfileFailure())
		}
	} catch (error) {
		yield put(setContactProfileFailure(error))
		// yield put(getPatientsListFailure(error))
		console.error('error', error);
	}
}

function* sendVerificationCode() {
	try {
		let token = yield select((state) => state.auth.token);
		// DELETE THIS CHECK WHEN REAL PHONE NUMBERS WILL BECOME AVAILABLE
		let id = yield select((state) => state.profile.fullProfile.id);
		let url;
		if (id === 1308 || id === 1316) {
			url = verifyUrlTemp;
		} else {
			url = verifyUrl;
		}
		const data = yield call(api.postData, token, url);

		if (data) {
			yield put(sendVerificationCodeSuccess())
		} else {
			yield put(sendVerificationCodeFailure())
		}
	} catch (error) {
		yield put(sendVerificationCodeFailure(error))
		console.error('error', error);
	}
}

function* validateCode({ payload }) {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.postData, token, `${verifyCodeUrl}?code=${payload}`);
		console.log('data', data)
		if (data) {
			yield put(validateCodeSuccess());
		} else {
			yield put(validateCodeFailure());
		}
	} catch (error) {
		yield put(validateCodeFailure(error));
	}
}

function* editAddress({payload}) {
	try {
		let token = yield select((state) => state.auth.token);
		const postData = {
			"address_line": payload
		};
		const data = yield call(api.putData, token, addressUrl, postData);
		if (data) {
			yield put(editAddressProfileSuccess(data.address_line));
		}
	} catch (error) {
		yield put(editAddressProfileFailure(error.message));
	}
}

function* getAddress() {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.getData, token, addressUrl);
		console.log('data', data);
		if (data) {
			yield put(getAddressProfileSuccess(data.address_line));
		}
	} catch (error) {
		yield put(getAddressProfileFailure(error.message));
	}
}

function* updateProfile({payload}) {
	try {
		let token = yield select((state) => state.auth.token);
		const postData = omitBy(
			payload,
			(item) => typeof item === 'undefined' || item === 'Invalid date' || !item
		)
		const data = yield call(api.patchData, token, profileUrl, postData);

		if (data) {
			yield put(updateUserProfileSuccess(data));
		}
	} catch (error) {
		console.log(error)
		yield put(updateUserProfileFailure(error.message));
	}
}

function* getProfile() {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.getData, token, profileUrl);

		if (data) {
			yield put(getProfileByTokenSuccess(data));
		}
	} catch (error) {
		yield put(getProfileByTokenFailure(error.message));
	}
}

function* updateAbout({ payload }) {
	try {
		let token = yield select((state) => state.auth.token);
		const postData ={
			aboutText: payload
		}
		const data = yield call(api.patchData, token, aboutUrl, postData);

		if (data) {
			yield put(updateAboutTextSuccess(data));
		}
	} catch (error) {
		yield put(updateAboutTextFailure(error));
	}
}

function* getAboutText() {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.getData, token, aboutUrl);

		if (data) {
			yield put(getAboutTextSuccess(data.aboutText));
		}
	} catch (error) {
		yield put(getAboutTextFailure(error));
	}
}

function* updateEducation({ payload }) {
	try {
		let token = yield select((state) => state.auth.token);
		const postData ={
			"description": payload
		}
		const data = yield call(api.patchData, token, educationUrl, postData);

		if (data) {
			yield put(updateEducationTextSuccess(data));
		}
	} catch (error) {
		yield put(updateEducationTextFailure(error));
	}
}

function* getEducationText() {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.getData, token, educationUrl);

		if (data) {
			yield put(getEducationTextSuccess(data.description));
		}
	} catch (error) {
		yield put(getEducationTextFailure(error));
	}
}

function* addSpecialities({payload}) {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.putData, token, refreshSpecialitiesURL, payload);
		yield put(addSpecialitiesSuccess());
		yield put(showMySpecialitiesRequest())
	} catch (error) {
		yield put(addSpecialitiesFailure(error))
	}
}

function* getMySpecialities() {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.getData, token, showMySpecialitiesUrl);

		yield put(showMySpecialitiesSuccess(data));
	} catch (error) {
		console.log('error', error)
		yield put(showMySpecialitiesFailure(error))
	}
}

function* removeSpeciality({payload}) {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.putData, token, refreshSpecialitiesURL, payload);
		yield put(removeSpecialitySuccess(data));
		yield put(showMySpecialitiesRequest());
	} catch (error) {
		yield put(removeSpecialityFailure(error))
	}
}

function* getMedicalDegrees() {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.getData, token, medicalDegreesUrl);
		yield put(getMedicalDegreesSuccess(data));
	} catch (error) {
		yield put(getMedicalDegreesFailure(error))
	}
}

function* getMyMedicalDegrees() {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.getData, token, myMedicalDegreesUrl);
		yield put(getMyMedicalDegreesSuccess(data));
	} catch (error) {
		yield put(getMyMedicalDegreesFailure(error))
	}
}

function* removeMyDegree({payload}) {
	try {
		let token = yield select((state) => state.auth.token);
		let deleteData = {
			"ids" : payload
		}
		const data = yield call(api.deleteData, token, medicalDegreesUrl, deleteData);
		yield put(removeMyMedicalDegreesSuccess(data));
		yield put(getMyMedicalDegreesRequest());
	} catch (error) {
		yield put(removeMyMedicalDegreesFailure(error));
	}
}

function* addMyDegree({payload}) {
	try {
		let token = yield select((state) => state.auth.token);
		let postData = {
			"ids" : payload
		}
		const data = yield call(api.postData, token, medicalDegreesUrl, postData);
		yield put(addMyMedicalDegreesSuccess(data));
		yield put(getMyMedicalDegreesRequest());
	} catch (error) {
		yield put(addMyMedicalDegreesFailure(error));
	}
}

function* uploadPhoto({payload}) {
	try {
		let token = yield select((state) => state.auth.token);
		const formData = new FormData();
		formData.append('file', payload);
		let postData = formData;
		let params = {
			"processData": false,
			"mimeType": "multipart/form-data",
		};
		let headers = {
			'Content-Type': 'multipart/form-data'
		}
		const data = yield call(api.postData, token, uploadFileUrl, postData, params, headers);
		yield put(uploadPhotoSuccess(data));
		yield put(getProfileByTokenRequest());
		yield put(getAvatarRequest());

	} catch (error) {
		yield put(uploadPhotoFailure(error));
	}
}
// Adding insurance info for patient
function* setInsurance({payload}) {
	try {
		let token = yield select((state) => state.auth.token);
		const postData = {
			number: payload.number,
			organizationId: payload.organizationId,
			attachmentId: payload.attachmentId
		}
		const data = yield call(api.postData, token, insurancesUrl, postData);
		yield put(setInsuranceSuccess(data));
		yield put(getPatientInsurancesRequest());
	} catch (error) {
		yield put(setInsuranceFailure(error));
	}
}

// Get insurance info for patient
function* getInsurance() {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.getData, token, insurancesUrl);
		yield put(getPatientInsurancesSuccess(data));
	} catch (error) {
		yield put(getPatientInsurancesFailure(error));
	}
}

// Delete insurance info for patient
function* deleteInsurance({payload}) {
	try {
		let token = yield select((state) => state.auth.token);
		yield call(api.deleteData, token, `${insurancesUrl}/${payload}`);
		yield put(deletePatientInsurancesSuccess());
		yield put(getPatientInsurancesRequest());
	} catch (error) {
		yield put(deletePatientInsurancesFailure(error));
	}
}

// Delete insurance info for patient
function* updateInsurance({payload}) {
	try {
		let token = yield select((state) => state.auth.token);
		let {id, ...patchData} = payload;
		yield call(api.patchData, token, `${insurancesUrl}/${id}`, patchData);
		yield put(updatePatientInsuranceSuccess());
		yield put(getPatientInsurancesRequest());
	} catch (error) {
		yield put(updatePatientInsuranceFailure(error));
	}
}

function* setInsuranceForDoctor({ payload }) {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.postData, token, insuranceSettingsUrl, payload);
		yield put(setDoctorInsuranceSuccess(data));
		yield put(getDoctorInsuranceRequest());
	} catch (error) {
		yield put(setDoctorInsuranceFailure(error));
	}
}

function* getDoctorsInsurance() {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.getData, token, doctorsProfileInsurancesUrl);
		yield put(getDoctorInsuranceSuccess(data));
	} catch (error) {
		yield put(getDoctorInsuranceFailure(error));
	}
}

function* deleteDoctorsInsurance({ payload }) {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.deleteData, token, insuranceSettingsUrl, payload);
		yield put(deleteDoctorsInsuranceSuccess(data));
		yield put(getDoctorInsuranceRequest());
	} catch (error) {
		yield put(deleteDoctorsInsuranceFailure(error));
	}
}

function* getAvatar() {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.getData, token, getAvatarUrl);
		yield put(getAvatarSuccess(data?.fullUrl));
	} catch (error) {
		yield put(getAvatarFailure(error));
	}
}

// Adding languages info for doctor
function* setDoctorsLanguages({payload}) {
	try {
		let token = yield select((state) => state.auth.token);

		yield call(api.putData, token, refreshLanguagesUrl, payload);
		yield put(updateDoctorslanguagesSuccess());
		yield put(getDoctorslanguagesRequest());
	} catch (error) {
		yield put(updateDoctorslanguagesFailure(error));
	}
}

function* getDoctorsLanguages() {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.getData, token, getLanguagesUrl);
		yield put(getDoctorslanguagesSuccess(data));
	} catch (error) {
		yield put(getDoctorslanguagesFailure(error));
	}
}

export default function* root() {
	yield takeEvery(setContactProfileRequest, setContact);
	yield takeEvery(sendVerificationCodeRequest, sendVerificationCode);
	yield takeEvery(validateCodeRequest, validateCode);
	yield takeEvery(editAddressProfileRequest, editAddress);
	yield takeEvery(updateUserProfileRequest, updateProfile);
	yield takeEvery(getProfileByTokenRequest, getProfile);
	yield takeEvery(updateAboutTextRequest, updateAbout);
	yield takeEvery(getAboutTextRequest, getAboutText);
	yield takeEvery(addSpecialitiesRequest, addSpecialities);
	yield takeEvery(showMySpecialitiesRequest, getMySpecialities);
	yield takeEvery(removeSpecialityRequest, removeSpeciality);
	yield takeEvery(getMedicalDegreesRequest, getMedicalDegrees);
	yield takeEvery(getMyMedicalDegreesRequest, getMyMedicalDegrees);
	yield takeEvery(removeMyMedicalDegreesRequest, removeMyDegree);
	yield takeEvery(addMyMedicalDegreesRequest, addMyDegree);
	yield takeEvery(updateEducationTextRequest, updateEducation);
	yield takeEvery(getEducationTextRequest, getEducationText);
	yield takeEvery(uploadPhotoRequest, uploadPhoto);
	yield takeEvery(getAddressProfileRequest, getAddress);
	yield takeEvery(setInsuranceRequest, setInsurance);
	yield takeEvery(setDoctorInsuranceRequest, setInsuranceForDoctor);
	yield takeEvery(getDoctorInsuranceRequest, getDoctorsInsurance);
	yield takeEvery(deleteDoctorsInsuranceRequest, deleteDoctorsInsurance);
	yield takeEvery(getAvatarRequest, getAvatar);
	yield takeEvery(getPatientInsurancesRequest, getInsurance);
	yield takeEvery(deletePatientInsurancesRequest, deleteInsurance);
	yield takeEvery(updatePatientInsuranceRequest, updateInsurance);
	yield takeEvery(updateDoctorslanguagesRequest, setDoctorsLanguages)
	yield takeEvery(getDoctorslanguagesRequest, getDoctorsLanguages)
}
