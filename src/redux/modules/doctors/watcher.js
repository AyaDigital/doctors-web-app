import { takeEvery, put, call, select } from 'redux-saga/effects';
import { currentSlots, oneAppointment } from '../../../utils/constants';
import {
	getDoctorsListRequest,
	getDoctorsListSuccess,
	getDoctorsListFailure,
	getOneDoctorRequest,
	getOneDoctorSuccess,
	getOneDoctorFailure,
	getDoctorsAppointmentsSuccess,
	getDoctorsAppointmentsRequest,
	getDoctorsAppointmentsFailure,
	getAppointmentSuccess,
	getAppointmentRequest,
	getAppointmentFailure,
	getDoctorSlotsRequest,
	getDoctorSlotsSuccess,
	getDoctorSlotsFailure,
	getDoctorSlotsJwtRequest
} from './actions/doctors';
import * as api from '../../../utils/api';

const doctorsUrl = 'api/practitioners';
const appointmentsUrl = 'api/appointments';
const slotsUrl = 'api/slots/slots-appointments';
const slotsUrlJwt = 'api/slots/slots-appointments-practitioner-jwt';

function* getAppointmentsList({ payload }) {
	try {
		let token = yield select((state) => state.auth.token);

		const  {
			startDate, endDate
		} = payload;
		const data = yield call(api.getData, token, `${appointmentsUrl}?start=${startDate}T00:00:00.305Z&end=${endDate}T23:00:00.305Z`)

		yield put(getDoctorsAppointmentsSuccess({ data }))
	} catch (error) {
		yield put(getDoctorsAppointmentsFailure(error))
		console.error('error', error);
	}
}

function* getAppointment({ payload }) {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.getData, token, `${appointmentsUrl}/${payload}`)
		if (data) {
			yield put(getAppointmentSuccess({ data }))
		} else {
			yield put(getAppointmentFailure())
		}
	} catch (error) {
		yield put(getDoctorsListFailure(error))
		console.error('error', error);
	}
}
  
function* getDoctorsList() {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.getData, token, doctorsUrl)

		if (data && data.length) {
			yield put(getDoctorsListSuccess(data))
		} else {
			yield put(getDoctorsListFailure())
		}
	} catch (error) {
		// yield put(getDoctorsListFailure(error))
		console.error('error', error);
	}
  }

function* getOneDoctor({ payload: id }) {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.getData, token, `${doctorsUrl}/${id}`)

		if (data) {
			yield put(getOneDoctorSuccess(data))
		} else {
			yield put(getOneDoctorFailure('77675'))
		}
	} catch (error) {
		yield put(getOneDoctorFailure(error))
		console.error('error', error);
	}
}

function* getDoctorSlots({ payload }) {
	try {
		let token = yield select((state) => state.auth.token);

		const  {
			id, startDate, endDate
		} = payload;
		const fullUrl = `${slotsUrl}?practitionerId=${id}&start=${startDate}T00:00:00Z&end=${endDate}T23:00:00Z`;
		const data = yield call(api.getData, token, fullUrl)
		if (data) {
			yield put(getDoctorSlotsSuccess(data))
		}
	} catch (error) {
		yield put(getDoctorSlotsFailure(error))
		console.error('error', error);
	}
}

function* getDoctorSlotsJwt({ payload }) {
	try {
		let token = yield select((state) => state.auth.token);

		const  {
			startDate, endDate
		} = payload;
		const fullUrl = `${slotsUrlJwt}?start=${startDate}T00:00:00Z&end=${endDate}T23:00:00Z`;
		const data = yield call(api.getData, token, fullUrl)
		if (data) {
			yield put(getDoctorSlotsSuccess(data))
		}
	} catch (error) {
		yield put(getDoctorSlotsFailure(error))
		console.error('error', error);
	}
}

export default function* root() {
	yield takeEvery(getDoctorsAppointmentsRequest, getAppointmentsList);
	yield takeEvery(getAppointmentRequest, getAppointment);
	yield takeEvery(getDoctorsListRequest, getDoctorsList);
	yield takeEvery(getOneDoctorRequest, getOneDoctor);
	yield takeEvery(getDoctorSlotsRequest, getDoctorSlots);
	yield takeEvery(getDoctorSlotsJwtRequest, getDoctorSlotsJwt)
  }