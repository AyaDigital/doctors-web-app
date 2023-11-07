import { takeEvery, put, call, select } from 'redux-saga/effects';

import {
	setUploadAttachmentSuccess,
	setUploadAttachmentRequest,
	setUploadAttachmentFailure,
	getAttachmentSuccess,
	getAttachmentRequest,
	getAttachmentFailure
} from './actions/attachments';
import * as api from '../../../utils/api';

const attachmentUrl = 'api/attachment';

function* setAttachment({ payload }) {
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
		const data = yield call(api.postData, token, attachmentUrl, postData, params, headers)

		yield put(setUploadAttachmentSuccess(data))
	} catch (error) {
		yield put(setUploadAttachmentFailure(error))
		console.error('error', error);
	}
}

export default function* root() {
	yield takeEvery(setUploadAttachmentRequest, setAttachment);
}
