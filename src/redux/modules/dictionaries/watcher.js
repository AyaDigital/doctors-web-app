import { takeEvery, put, call, select } from 'redux-saga/effects';

import {
	getInsuranceListRequest,
    getInsuranceListSuccess,
    getInsuranceListFailure,
	getSpecialitiesRequest,
	getSpecialitiesSuccess,
	getSpecialitiesFailure,
	getAppealsRequest,
	getAppealsFailure,
	getAppealsSuccess,
	getLanguagesRequest,
	getLanguagesSuccess,
	getLanguagesFailure
} from './actions/dictionaries';
import * as api from '../../../utils/api';

const insurancesUrl = 'search-app/insurances';
const specialitiesUrl = 'search-app/specialities';
const appealsUrl = 'api/appeals';
const languagesUrl = 'search-app/languages';

function* getSpecialities({payload}) {
	try {
		let token = yield select((state) => state.auth.token);
		let scrollToken = yield select((state) => state.dictionaries.specialities.scrollToken);
		let parameters = '';

		if (scrollToken && payload) {
			parameters = `?scrollId=${scrollToken}&search=${payload}`;
		}
		if (!scrollToken && payload) {
			parameters = `?search=${payload}`;
		}
		if (scrollToken && !payload) {
			parameters = `?scrollId=${scrollToken}`;
		}
		let url = `${specialitiesUrl}${parameters}`;

		const data = yield call(api.getData, token, url);
		if (data) {
			yield put(getSpecialitiesSuccess(data));
		}
	} catch (error) {
		console.error('error', error);
		yield put(getSpecialitiesFailure(error))
	}
}

function* getInsuranceList({ payload }) {
	try {
		let token = yield select((state) => state.auth.token);
        let scrollToken = yield select((state) => state.dictionaries.insuranceCompanies?.scrollToken);
		let parameters = '';

		if (scrollToken && payload) {
			parameters = `?scrollId=${scrollToken}&search=${payload}`;
		}
		if (!scrollToken && payload) {
			parameters = `?search=${payload}`;
		}
		if (scrollToken && !payload) {
			parameters = `?scrollId=${scrollToken}`;
		}
		let url = `${insurancesUrl}${parameters}`;

		const data = yield call(api.getData, token, url)

		yield put(getInsuranceListSuccess(data))
	} catch (error) {
		yield put(getInsuranceListFailure(error))
		console.error('error', error);
	}
}

function* getAppeals() {
	try {
		let token = yield select((state) => state.auth.token);

		const data = yield call(api.getData, token, appealsUrl);

		yield put(getAppealsSuccess(data))
	} catch (error) {
		yield put(getAppealsFailure(error));
	}
}

function* getLanguages({payload}) {
	try {
		let token = yield select((state) => state.auth.token);
        let scrollToken = yield select((state) => state.dictionaries.languages?.scrollToken);
		let parameters = '';

		if (scrollToken && payload) {
			parameters = `?scrollId=${scrollToken}&search=${payload}`;
		}
		if (!scrollToken && payload) {
			parameters = `?search=${payload}`;
		}
		if (scrollToken && !payload) {
			parameters = `?scrollId=${scrollToken}`;
		}
		let url = `${languagesUrl}${parameters}`;

		const data = yield call(api.getData, token, url);

		yield put(getLanguagesSuccess(data))
	} catch (error) {
		yield put(getLanguagesFailure(error));
	}
}

export default function* root() {
	yield takeEvery(getInsuranceListRequest, getInsuranceList);
	yield takeEvery(getSpecialitiesRequest, getSpecialities);
	yield takeEvery(getAppealsRequest, getAppeals);
	yield takeEvery(getLanguagesRequest, getLanguages);
  }
