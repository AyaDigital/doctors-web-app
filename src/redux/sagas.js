import { all } from 'redux-saga/effects';
import authWatcher from './modules/auth/watcher';
import layoutWatcher from './modules/layout/watcher';
import patientsWatcher from './modules/patients/watcher';
import doctorsWatcher from './modules/doctors/watcher';
import scheduleWatcher from './modules/schedule/watcher';
import profileWatcher from './modules/profile/watcher';
import emergencyWatcher from './modules/emergency/watcher';
import dictionaryWatcher from './modules/dictionaries/watcher';
import attachmentsWatcher from './modules/attachments/watcher';

export default function* rootSaga() {
   yield all([
      authWatcher(),
      layoutWatcher(),
      patientsWatcher(),
      doctorsWatcher(),
      profileWatcher(),
      scheduleWatcher(),
      emergencyWatcher(),
      dictionaryWatcher(),
      attachmentsWatcher()
   ]);
}