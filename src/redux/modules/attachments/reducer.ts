import { AttachmentsActions, AttachmentsState } from './types';
import { InsuranceCompanyT, DictionaryT } from '../../../types';
import {
	SET_UPLOAD_ATTACHMENT_SUCCESS,
	SET_UPLOAD_ATTACHMENT_REQUEST,
	SET_UPLOAD_ATTACHMENT_FAILURE,
	GET_ATTACHMENT_SUCCESS,
	GET_ATTACHMENT_REQUEST,
	GET_ATTACHMENT_FAILURE
} from './actions/attachments';

export const INITIAL_STATE: AttachmentsState | null = {
	isLoading: false,
	selectedAttachment: {
		id: 0,
		urlPath: ''
	},
	error: ''
};

const AttachmentsReducer = (state = INITIAL_STATE, { type, payload }: AttachmentsActions) => {
	switch (type) {
		case SET_UPLOAD_ATTACHMENT_REQUEST:
			return {
				...state,
				isLoading: true,
				error: ''
			}
        case SET_UPLOAD_ATTACHMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                selectedAttachment: payload,
                error: ''
            }
        case SET_UPLOAD_ATTACHMENT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
		default:
			return state;
	}
};

export default AttachmentsReducer;
