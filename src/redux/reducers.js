import { combineReducers } from 'redux';
import layoutReducer from './modules/layout/reducer';
import authReducer from './modules/auth/reducer';
import patientsReducer from './modules/patients/reducer';
import doctorsReducer from './modules/doctors/reducer';
import scheduleReducer from './modules/schedule/reducer';
import profileReducer from './modules/profile/reducer';
import emergencyReducer from './modules/emergency/reducer';
import dictionaryReducer from './modules/dictionaries/reducer';
import attachmentsReducer from './modules/attachments/reducer';

const RootReducer =
	combineReducers({
		auth: authReducer,
		layout: layoutReducer,
		patients: patientsReducer,
		doctors: doctorsReducer,
		profile: profileReducer,
		schedule: scheduleReducer,
		emergency: emergencyReducer,
		dictionaries: dictionaryReducer,
		attachments: attachmentsReducer
	});

export default RootReducer;
