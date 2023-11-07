import { takeEvery, put, call, select } from 'redux-saga/effects';
import {
	getPatientsListRequest,
	getPatientsListSuccess,
	getPatientsListFailure,
	getOnePatientRequest,
	getOnePatientSuccess,
	getOnePatientFailure,
	getPatientAppointmentRequest,
	getPatientAppointmentSuccess,
	getPatientAppointmentFailure,
	getPatientAppointmentsByPeriodRequest,
	getPatientAppointmentsByPeriodSuccess,
	getPatientAppointmentsByPeriodFailure,
	cancelAppointmentRequest,
	cancelAppointmentSuccess,
	cancelAppointmentFailure,
	setNonAttendingPatientRequest,
	setNonAttendingPatientSuccess,
	setNonAttendingPatientFailure,
	getCancelledAppointmentsRequest,
	getCancelledAppointmentsSuccess,
	getCancelledAppointmentsFailure
} from './actions/patients';
import * as api from '../../../utils/api';

const patientsUrl = 'api/patients';
const appointmentUrl = 'api/appointments';
const cancelAppointmentUrl = 'api/appointments/cancel';
const nonAttendingUrl = 'api/non-attending-patients';
const cancelledAppointmentsUrl = 'api/appointments/appointment-status-cancelled';

function* getPatientsList() {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.getData, token, patientsUrl)

		if (data && data.length) {
			yield put(getPatientsListSuccess({ data }))
		} else {
			yield put(getPatientsListFailure())
		}
	} catch (error) {
		yield put(getPatientsListFailure(error))
		console.error('error', error);
	}
  }

function* getCancelled() {
	try {
		let token = yield select((state) => state.auth.token);
		// TODO remove hardcode
		const startDate = '2023-01-01';
		const endDate = '2100-01-01';
		const data = yield call(api.getData, token, `${cancelledAppointmentsUrl}?&start=${startDate}T00:00:00Z&end=${endDate}T23:00:00Z`);

		if (data && data.length) {
			yield put(getCancelledAppointmentsSuccess(data))
		} else {
			yield put(getCancelledAppointmentsFailure())
		}
	} catch (error) {
		yield put(getCancelledAppointmentsFailure(error));
	}
}

function* getOnePatient({ payload: id }) {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.getData, token, `${patientsUrl}/${id}`)

		if (data) {
			yield put(getOnePatientSuccess(data))
		} else {
			yield put(getOnePatientFailure('77675'))
		}
	} catch (error) {
		yield put(getOnePatientFailure(error))
		console.error('error', error);
	}
}

function* getOneAppointment({payload: id}) {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.getData, token, `${appointmentUrl}/${id}`);
		if (data) {
			yield put(getPatientAppointmentSuccess(data))
		} else {
			yield put(getPatientAppointmentFailure('No data'))
		}
	} catch (error) {
		yield put(getPatientAppointmentFailure(error))
		console.error('error', error);
	}
}

function* cancelAppointment({payload: id}) {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.putData, token, `${cancelAppointmentUrl}/${id}`);

		if (data) {
			yield put(cancelAppointmentSuccess(data))
			yield put(getCancelledAppointmentsRequest())
		} else {
			yield put(cancelAppointmentFailure())
		}
	} catch (error) {
		yield put(cancelAppointmentFailure(error?.response?.data?.message))
	}
}

function* getAppointments({payload}) {
	try {
		let token = yield select((state) => state.auth.token);
		// TODO remove hardcode
		const startDate = '2023-01-01';
		const endDate = '2100-01-01';
		const data = yield call(api.getData, token, `${appointmentUrl}?&start=${startDate}T00:00:00Z&end=${endDate}T23:00:00Z`);

		if (data) {
			yield put(getPatientAppointmentsByPeriodSuccess(data))
		} else {
			yield put(getPatientAppointmentsByPeriodFailure())
		}
	} catch (error) {
		yield put(getPatientAppointmentsByPeriodFailure(error))
	}
}

function* setNonAttending({payload}) {
	try {
		console.log(payload)
		let token = yield select((state) => state.auth.token);
		const postData = {
			"ids": [payload]
		};
		const data = yield call(api.postData, token, nonAttendingUrl, postData);

		if (data) {
			yield put(setNonAttendingPatientSuccess(data))
		} else {
			yield put(setNonAttendingPatientFailure())
		}
	} catch (error) {
		yield put(setNonAttendingPatientFailure(error))
	}
}

export default function* root() {
	yield takeEvery(getPatientAppointmentRequest, getOneAppointment)
	yield takeEvery(getPatientAppointmentsByPeriodRequest, getAppointments)
	yield takeEvery(getPatientsListRequest, getPatientsList);
	yield takeEvery(getOnePatientRequest, getOnePatient);
	yield takeEvery(cancelAppointmentRequest, cancelAppointment);
	yield takeEvery(setNonAttendingPatientRequest, setNonAttending);
	yield takeEvery(getCancelledAppointmentsRequest, getCancelled);
  }