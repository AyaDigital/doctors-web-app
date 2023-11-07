import { takeEvery, put, call, select } from 'redux-saga/effects';
import moment from 'moment';
import { slots } from '../../../utils/constants';
import {
	getCountSlotsRequest,
    getCountSlotsSuccess,
    getCountSlotsFailure,
	setScheduleRequest,
	setScheduleSuccess,
	setScheduleFailure,
	createAppointmentRequest,
	createAppointmentSuccess,
	createAppointmentFailure,
	updateAppointmentRequest,
	updateAppointmentSuccess,
	updateAppointmentFailure,
	cancelAppointmentRequest,
	cancelAppointmentSuccess,
	cancelAppointmentFailure,
	getAppointmentsByPeriodRequest,
	getAppointmentsByPeriodSuccess,
	getAppointmentsByPeriodFailure,
	getMySlotsRequest,
	getMySlotsSuccess,
	getMySlotsFailure,
	deleteScheduleRequest,
	deleteScheduleFailure,
	deleteScheduleSuccess,
	getCancelledAppointmentsRequest,
	getCancelledAppointmentsSuccess,
	getCancelledAppointmentsFailure
} from './actions/schedule';
import { getDoctorSlotsJwtRequest } from 'redux/modules/doctors/actions/doctors';

import * as api from '../../../utils/api';

const getTimeZone = () => {
	const timezoneOffset = new Date().getTimezoneOffset()
	const offset = Math.abs(timezoneOffset)
	const offsetOperator = timezoneOffset < 0 ? '+' : '-'
	const offsetHours = Math.floor(offset / 60).toString().padStart(2, '0')
	const offsetMinutes = Math.floor(offset % 60).toString().padStart(2, '0')
  
	return `${offsetOperator}${offsetHours}:${offsetMinutes}`
  }

const countSlotsUrl = 'api/count-slots-practitioners';
const schedulesUrl = 'api/schedules';
const appointmentUrl = 'api/appointments';
const updateAppointmentUrl = 'api/appointments/reschedule';
const cancelAppointmentUrl = 'api/appointments/cancel';
const cuurrentSlotsUrl = 'api/slots/slots-appointments-practitioner';
const cancelledAppointmentsUrl = 'api/appointments/appointment-status-cancelled';

function* getCountSlots({ payload }) {
	try {
		let token = yield select((state) => state.auth.token);
		const  {
			selectedMonth, id
		} = payload;

		const startDate = selectedMonth.startOf('month').format('YYYY-MM-DD');
		const endDate = moment(startDate).add(1, 'month').format('YYYY-MM-DD');

		let url = `${countSlotsUrl}?fromDate=${startDate}&toDate=${endDate}&status=busy,free`;

		if (id) {
			url = `${countSlotsUrl}/${id}?fromDate=${startDate}&toDate=${endDate}&status=busy,free`;
		}

		const data = yield call(api.getData, token, url);

		if (data && data.length) {
			yield put(getCountSlotsSuccess(data))
		} else {
			yield put(getCountSlotsFailure())
		}
	} catch (error) {
		console.log('error', error);
        yield put(getCountSlotsFailure(error));
	}
}

function* setSchedule({payload}) {
	try {
		let token = yield select((state) => state.auth.token);
		const tz = getTimeZone();
		const postData = {
			date: payload.date,
			dayStart: payload.dayStart,
			dayEnd: payload.dayEnd,
			zoneOffset: tz,
			slotDuration: payload.slotDuration,
			active: true,
			slotType: payload.slotType,
			comment: 'test'
		};
		const data = yield call(api.postData, token, schedulesUrl, postData);
		console.log('data', data);
		if (data.message) {
			yield put(setScheduleFailure(data.message))
		} else {
			yield put(setScheduleSuccess())
		}
	} catch (error) {
		console.log('error', error)
		const errMsg = error?.response?.data?.message || error.message;
		yield put(setScheduleFailure(errMsg));
	}
}

function* createAppointment({payload}) {
	try {
		let token = yield select((state) => state.auth.token);
		const postData = {
			slotId: payload,
			comment: "create appointment"
		};
		const data = yield call(api.postData, token, appointmentUrl, postData);

		if (data) {
			yield put(createAppointmentSuccess(data))
		} else {
			yield put(createAppointmentFailure())
		}
	} catch (error) {
		const message = error.response?.data?.message || error.message;
		yield put(createAppointmentFailure(message))
	}
}
function* updateAppointment({payload}) {
	try {
		let token = yield select((state) => state.auth.token);
		const postData = {
			slotId: payload.slotId
		};
		const data = yield call(api.putData, token, `${updateAppointmentUrl}/${payload.appointmentId}`, postData);
		if (data) {
			yield put(updateAppointmentSuccess(data));
		}
	} catch (error) {
		const message = error.response?.data?.message || error.message;
		yield put(updateAppointmentFailure(message))
	}
}
function* cancelAppointment({payload}) {
	try {
		let token = yield select((state) => state.auth.token);
		const data = yield call(api.putData, token, `${cancelAppointmentUrl}/${payload}`);

		if (data) {
			yield put(cancelAppointmentSuccess(data))
		} else {
			yield put(cancelAppointmentFailure())
		}
	} catch (error) {
		const message = error.response?.data?.message || error.message;
		yield put(cancelAppointmentFailure(message))
	}
}

function* getAppointmentsByPeriod({payload}) {
	try {
		let token = yield select((state) => state.auth.token);
		const { startDate, endDate} = payload;
		const data = yield call(api.getData, token, `${appointmentUrl}?&start=${startDate}T00:00:00Z&end=${endDate}T23:00:00Z`);

		if (data) {
			yield put(getAppointmentsByPeriodSuccess(data))
		} else {
			yield put(getAppointmentsByPeriodFailure())
		}
	} catch (error) {
		yield put(getAppointmentsByPeriodFailure(error))
	}
}

function* getCancelledAppointments({payload}) {
	try {
		let token = yield select((state) => state.auth.token);
		const { startDate, endDate} = payload;
		const data = yield call(api.getData, token, `${cancelledAppointmentsUrl}?&start=${startDate}T00:00:00Z&end=${endDate}T23:00:00Z`);

		if (data) {
			yield put(getCancelledAppointmentsSuccess(data))
		} else {
			yield put(getCancelledAppointmentsFailure())
		}
	} catch (error) {
		yield put(getCancelledAppointmentsFailure(error))
	}
}

function* getMySlots({ payload }) {
	try {
		let token = yield select((state) => state.auth.token);

		const  {
			startDate, endDate
		} = payload;
		const fullUrl = `${cuurrentSlotsUrl}?start=${startDate}T00:00:00Z&end=${endDate}T23:00:00Z`;
		const data = yield call(api.getData, token, fullUrl)
		if (data) {
			yield put(getMySlotsSuccess(data))
		}
	} catch (error) {
		yield put(getMySlotsFailure(error))
		console.error('error', error);
	}
}

function* deleteSchedule({payload}) {
	try {
		let token = yield select((state) => state.auth.token);
		const {
			selectedDate,
			scheduleId
		} = payload;
		const fullUrl = `${schedulesUrl}/${scheduleId}`;
		const data = yield call(api.deleteData, token, fullUrl);

		const getCountSlotsData = {
			startDate: moment(selectedDate).startOf('month').format('YYYY-MM-DD'),
			endDate: moment(selectedDate).endOf('month').format('YYYY-MM-DD')
		}

		const getData = {
			startDate: moment(selectedDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
			endDate: moment(selectedDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
		}

		if (data) {
			yield put(deleteScheduleSuccess(data));
			yield put(getCountSlotsRequest(getCountSlotsData));
			yield put(getDoctorSlotsJwtRequest(getData));
		}
	} catch (error) {
		yield put(deleteScheduleFailure(error?.response?.data?.message))
		console.error('error', error);
	}
}

export default function* root() {
	yield takeEvery(getCountSlotsRequest, getCountSlots);
	yield takeEvery(setScheduleRequest, setSchedule);
	yield takeEvery(createAppointmentRequest, createAppointment);
	yield takeEvery(updateAppointmentRequest, updateAppointment);
	yield takeEvery(cancelAppointmentRequest, cancelAppointment);
	yield takeEvery(getAppointmentsByPeriodRequest, getAppointmentsByPeriod);
	yield takeEvery(getMySlotsRequest, getMySlots);
	yield takeEvery(deleteScheduleRequest, deleteSchedule);
	yield takeEvery(getCancelledAppointmentsRequest, getCancelledAppointments);
  }
  