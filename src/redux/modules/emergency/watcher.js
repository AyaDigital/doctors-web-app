import { takeEvery, put, call, select } from 'redux-saga/effects';
import {
	getEmergencyContactSuccess,
    getEmergencyContactRequest,
    getEmergencyContactFailure,
    setEmergencyContactSuccess,
    setEmergencyContactRequest,
    setEmergencyContactFailure,
	getEmergencyTypesSuccess,
	getEmergencyTypesRequest,
	getEmergencyTypesFailure,
	updateEmergencyContactSuccess,
	updateEmergencyContactRequest,
	updateEmergencyContactFailure,
	deleteEmergencyContactSuccess,
	deleteEmergencyContactRequest,
	deleteEmergencyContactFailure,
	getOneEmergencyContactSuccess,
	getOneEmergencyContactRequest,
	getOneEmergencyContactFailure
} from './actions/emergency';
import * as api from '../../../utils/api';

const emergencyUrl = 'api/profile/emergency/v2';
const emergencyTypesUrl = 'search-app/api/emergency-types';

function* getOneContact({ payload }) {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.getData, token, `${emergencyUrl}/${payload}`)

		if (data) {
			yield put(getOneEmergencyContactSuccess(data))
		} else {
			yield put(getOneEmergencyContactFailure())
		}
	} catch (error) {
		yield put(getOneEmergencyContactFailure(error));
	}
}

function* getContact() {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.getData, token, emergencyUrl)

		if (data) {
			yield put(getEmergencyContactSuccess(data))
		} else {
			yield put(getEmergencyContactFailure())
		}
	} catch (error) {
		yield put(getEmergencyContactFailure(error));
	}
  }

function* getEmergencyTypes() {
	try {
		let token = yield select((state) => state.auth.token);

		const data = yield call(api.getData, token, emergencyTypesUrl);

		if (data) {
			yield put(getEmergencyTypesSuccess(data))
		} else {
			yield put(getEmergencyTypesFailure('error'))
		}
	} catch (error) {
		yield put(getEmergencyTypesFailure(error))
		console.error('error', error);
	}
}

function* updateEmergencyContact({payload: {data: putData, id}}) {
	try {
		let token = yield select((state) => state.auth.token);

		const data = yield call(api.putData, token, `${emergencyUrl}/${id}`, putData);

		if (data) {
			yield put(updateEmergencyContactSuccess(data));
			yield put(getEmergencyContactRequest());
		} else {
			yield put(updateEmergencyContactFailure('error'))
		}
	} catch (error) {
		yield put(updateEmergencyContactFailure(error))
		console.error('error', error);
	}
}

function* deleteEmergencyContact({ payload }) {
	try {
		let token = yield select((state) => state.auth.token);
		yield call(api.deleteData, token, `${emergencyUrl}/${payload}`);

		yield put(deleteEmergencyContactSuccess());
		yield put(getEmergencyContactRequest());
	} catch (error) {
		yield put(deleteEmergencyContactFailure(error))
		console.error('error', error);
	}
}

function* setContact({ payload }) {
	try {
		let token = yield select((state) => state.auth.token);
        const { fullName, phone, summary, typeId } = payload;
        const postData = {
			fullName,
			phone,
			summary,
			typeId
        }
		const data = yield call(api.postData, token, emergencyUrl, postData);

		if (data) {
			yield put(setEmergencyContactSuccess(data));
			yield put(getEmergencyContactRequest());
		} else {
			yield put(setEmergencyContactFailure('error'));
		}
	} catch (error) {
		yield put(setEmergencyContactFailure(error))
		console.error('error', error);
	}
}

export default function* root() {
	yield takeEvery(getEmergencyContactRequest, getContact);
	yield takeEvery(getOneEmergencyContactRequest, getOneContact);
	yield takeEvery(setEmergencyContactRequest, setContact);
	yield takeEvery(getEmergencyTypesRequest, getEmergencyTypes);
	yield takeEvery(updateEmergencyContactRequest, updateEmergencyContact);
	yield takeEvery(deleteEmergencyContactRequest, deleteEmergencyContact);
  }