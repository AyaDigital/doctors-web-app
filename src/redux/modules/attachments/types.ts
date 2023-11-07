import { SelectedAttachmentT } from '../../../types';

export interface AttachmentsActions<T = any> {
	type: string;
	payload: T;
}

export interface AttachmentsState {
	isLoading: boolean,
	selectedAttachment: SelectedAttachmentT,
	error: string
}
