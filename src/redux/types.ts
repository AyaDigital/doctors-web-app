import {LayoutState} from './modules/layout/types';
import {AuthState} from './modules/auth/types';
import {PatientsState} from './modules/patients/types';
import {DoctorsState} from './modules/doctors/types';
import {ProfileState} from './modules/profile/types';
import {ScheduleState} from './modules/schedule/types';
import { EmergencyState } from './modules/emergency/types';
import {DictionariesState} from './modules/dictionaries/types';
import {AttachmentsState} from './modules/attachments/types';
import {KeycloakTokenParsed} from '../types';

export default interface AppState {
	layout: LayoutState;
    auth: AuthState<KeycloakTokenParsed>;
    patients: PatientsState;
    doctors: DoctorsState;
    profile: ProfileState;
    schedule: ScheduleState;
    emergency: EmergencyState;
    dictionaries: DictionariesState;
	attachments: AttachmentsState;
}
