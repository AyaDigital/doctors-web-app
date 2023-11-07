import { type } from 'os';
import {
    SlotsCountItemT as SlotTtype,
    NewAppointmentT as NewAppointmentCreatedT,
    SlotItemT
} from '../../../types';
export interface ScheduleActions<T> {
	type: string;
	payload: T;
}
export type SlotsCountItemT = SlotTtype;

export type ScheduleState = {
    slotsNum: number,
    isLoading: boolean,
    appointmentCanceled: boolean,
    isScheduleCreationLoading: boolean,
    appointments: any[],
    cancelledAppointments: any[],
    error: string,
    cancellError: string,
    scheduleCreated: boolean,
    appointmentCreated: boolean,
    newAppointment: Partial<NewAppointmentCreatedT>,
    slots: SlotsCountItemT[],
    mySlots: SlotItemT[]
}
