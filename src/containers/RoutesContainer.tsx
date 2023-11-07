import React, { Suspense } from 'react';
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AppLayout from '../components/layout/AppLayout';
import Account from '../pages/Account';
import PatientAccount from 'pages/PatientAccount';
import PatientAccountEdit from 'pages/PatientAccountEdit';
import AccountEdit from '../pages/AccountEdit';
import DoctorsAppointment from '../pages/DoctorsAppointment';
import DoctorsForAppointment from '../pages/Doctors';
import AppointmentPage from '../pages/AppointmentPage';
import PatientAppointmentPage from '../pages/PatientAppointmentPage';
import PatientAppointments from '../pages/PatientAppointments';
import PatienEmergencyContact from '../pages/PatienEmergencyContact';
import Patients from 'pages/Patients';
import Loader from '../components/layout/Loader';
import PatientPage from 'pages/PatientPage';
import AboutPage from 'pages/AboutPage';
import DoctorPage from 'pages/DoctorPage'
import AppointmentsSettingsPage from 'pages/AppointmentsSettings';
import PageDoesNotExist from 'pages/NotExist';

type RoutesContainerType = {
  roles?: string[],
  isAuth?: boolean
}

/**
 * This is the main routes container. We add it inside the app's layout so that
 * it won't update each time we change routes.
 *
 */
const RoutesContainer: React.FC<RoutesContainerType> = ({ isAuth, roles }) => {
	const location = useLocation();
	const state = location.state;
	const { pathname = ''} = location;
	const isPatient = roles?.includes('ROLE_PATIENT') && !roles?.includes('ROLE_PRACTITIONER');

	return (
		<Suspense fallback={<></>}>
			{!isAuth ? (
				<Loader width={'100%'} />
			) : (
				<Routes location={state?.backgroundLocation || location}>
				<Route path="/" element={<AppLayout pathname={pathname} isAuth={isAuth} />}>
					<Route index element={isPatient ? <DoctorsForAppointment /> : <DoctorsAppointment />} />
					<Route
						path="account"
						element={isPatient ? <PatientAccount/> : <Account />}
					/>
					<Route
						path="account/about"
						element={<AboutPage />}
					/>
					<Route
						path="account/edit"
						element={isPatient ? <PatientAccountEdit /> : <AccountEdit />}
					/>
					<Route
						path="account/emergency"
						element={<PatienEmergencyContact />}
					/>
					<Route
						path="patients"
						element={isPatient ? <PageDoesNotExist /> : <Patients />}
					/>
					<Route
						path="patients/:id"
						element={<PatientPage />}
					/>
					<Route
						path="appointments/:id"
						element={<AppointmentPage />}
					/>
					<Route
						path="patient-appointments"
						element={<PatientAppointments />}
					/>
					<Route
						path="patient-appointments/:id"
						element={<PatientAppointmentPage />}
					/>
					<Route
						path="doctors/:id"
						element={<DoctorPage />}
					/>
					<Route
						path="doctors"
						element={<DoctorsForAppointment />}
					/>
					<Route
						path="appointments/settings"
						element={<AppointmentsSettingsPage />}
					/>
					<Route
						path="appointments"
						element={<DoctorsAppointment />}
					/>
				</Route>
			</Routes>
		)}
		</Suspense>
	);
};

export default RoutesContainer;
