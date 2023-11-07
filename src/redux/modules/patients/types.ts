import {PatientT, AppointmentT} from '../../../types';
export interface PatientsActions<T> {
	type: string;
	payload: T;
}
export interface PatientsState {
	isLoading: boolean;
	isAppointmentLoading: boolean;
	appointmentCanceled: boolean;
	isModalOpen: boolean;
	appointments: AppointmentT[];
	cancelledAppointments: AppointmentT[];
    list: [];
	profile: Partial<PatientT>;
	currentAppointment?: AppointmentT;
    error: string;
}
