import { DoctorT, SlotItemT, AppointmentT } from '../../../types';

export interface DoctorsActions<T = any> {
	type: string;
	payload: T;
}
export interface DoctorsState {
	isLoading: boolean;
	isModalOpen: boolean;
    list: DoctorT[];
	appointments: [];
	selectedAppointment: AppointmentT | null,
	slots: SlotItemT[],
	profile: Partial<DoctorT>;
	totalResults: number;
	scrollToken: string;
    error: string;
}
export type DoctorsTypes = any;
