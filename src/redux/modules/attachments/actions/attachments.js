import { createAction } from 'redux-actions'

export const SET_UPLOAD_ATTACHMENT_SUCCESS = 'SET_UPLOAD_ATTACHMENT_SUCCESS';
export const SET_UPLOAD_ATTACHMENT_REQUEST = 'SET_UPLOAD_ATTACHMENT_REQUEST';
export const SET_UPLOAD_ATTACHMENT_FAILURE = 'SET_UPLOAD_ATTACHMENT_FAILURE';

export const GET_ATTACHMENT_SUCCESS = 'GET_ATTACHMENT_SUCCESS';
export const GET_ATTACHMENT_REQUEST = 'GET_ATTACHMENT_REQUEST';
export const GET_ATTACHMENT_FAILURE = 'GET_ATTACHMENT_FAILURE';

export const setUploadAttachmentSuccess = createAction(SET_UPLOAD_ATTACHMENT_SUCCESS);
export const setUploadAttachmentRequest = createAction(SET_UPLOAD_ATTACHMENT_REQUEST);
export const setUploadAttachmentFailure = createAction(SET_UPLOAD_ATTACHMENT_FAILURE);

export const getAttachmentSuccess = createAction(GET_ATTACHMENT_SUCCESS);
export const getAttachmentRequest = createAction(GET_ATTACHMENT_REQUEST);
export const getAttachmentFailure = createAction(GET_ATTACHMENT_FAILURE);

