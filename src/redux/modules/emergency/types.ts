import { EmergencyTypeDataT, EmergencyContactT, EmergencyContactItemT } from 'types';

export interface EmergencyActions<T> {
	type: string;
	payload: T;
}
export interface EmergencyState {
	isLoading: boolean;
    error: Error | string;
	contacts: EmergencyContactItemT[];
	currentContact: EmergencyContactItemT;
	enabled: boolean;
	types: EmergencyTypeDataT
}

export type EmergencyContactType = {
	name: string;
	phone: string;
}
