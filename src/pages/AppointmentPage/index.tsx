import React, {useEffect, useState, useMemo} from 'react';
import { DispatchProp, connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import ArrowLeftIcon from '../../images/Icons/arrowLeftIcon';
import ArrowUpRightIcon from '../../images/Icons/arrowUpRightIcon';
import RescheduleIcon from '../../images/Icons/rescheduleIcon';
import CancellationIcon from '../../images/Icons/cancellationIcon';
import NonAttendingIcon from '../../images/Icons/nonAttendingIcon';
import VideoIcon from '../../images/Icons/videoIcon';
import Avatar from '../../images/appointmentAvatar.png';
import AppStateType from '../../redux/types';
import { AppointmentT, ParticipantT, AppointmentSettingsT } from '../../types';
import Loader from '../../components/layout/Loader';
import { getAppointmentRequest, clearSelectedAppointment } from 'redux/modules/doctors/actions/doctors';
import { setNonAttendingPatientRequest } from 'redux/modules/patients/actions/patients';
import {
	cancelAppointmentRequest, clearCanceledStatus, clearErrorStatus, getAppointmentsGlobalSettingsRequest
} from 'redux/modules/schedule/actions/schedule';
import { getProfileByTokenRequest } from 'redux/modules/profile/actions/profile';
import { setModalWindowOpen } from '../../redux/modules/layout/actions/modalActions';
import { CancelAppointmentModal } from './components/cancel'
import EditConsultation from 'components/appointment/editAppointment';
import './appointmentPage.scss';
import { Dispatch } from '@reduxjs/toolkit';
import {
	Container, StyledModal, DoctorsButton, CommonStyles
} from './components/common';

export const RescheduleButton = styled(Button)(Object.assign({color: 'rgba(0, 0, 0, 1)'}, CommonStyles, {width: '377px'}));
export const CancelButton = styled(Button)(Object.assign({color: 'rgba(255, 84, 74, 1)'}, CommonStyles, {width: '377px'}));
export const NavButton = styled(Button)(Object.assign({color: 'rgba(60, 60, 67, 0.6)'}, CommonStyles, {width: 'auto'}));

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type AppointmentProps = {
	doctorId?: number,
	isSettingsLoading: boolean,
	selectedAppointment: AppointmentT | null,
	settings: AppointmentSettingsT,
	isLoading?: boolean,
	appointmentCanceled?: boolean,
	error: string,
	cancellError: string,
} & DispatchProps;

const Patients: React.FC<AppointmentProps> = ({
	selectedAppointment: profile,
	doctorId,
	cancellError,
	isSettingsLoading,
	isLoading, getAppointmennt = () => {},
	clearApointment = () => {},
	getAppointmentsGlobalSettings = () => {},
	cancelAppointment,
	getProfile,
	clearCanceled = () => {},
	setNonAttendingPatient = () => {},
	clearError = () => {},
	settings,
	appointmentCanceled
}) => {
	const [isCancelWindowOpen, setIsCancelWindowOpen] = useState<boolean>(false);
	const [isEditWindowOpen, setIsEditWindowOpen] = useState<boolean>(false);
	const [appointmentDate, setAppointmentDate] = useState<string>('');
	const [appointmentType, setAppointmentType] = useState<string>('');
	const [participant, setParticipant] = useState<ParticipantT>();
	const [appointmentId, setAppointmentId] = useState<number>(0);
	const [appointmentStatus, setAppointmentStatus] = useState<string>('');
	const [availabilityMessage, setAvailabilityMessage] = useState<string>('');
	const [isVideoCallAvailable, setIsVideoCallAvailable] = useState<boolean>(false);

	const navigate = useNavigate();
	const { state: id, pathname } = useLocation();

	useEffect(() => {
		if (profile) {
			const {
				startDate,
				type,
				participant,
				status
			} = profile;
			setAppointmentDate(startDate);
			setAppointmentType(type);
			setAppointmentStatus(status);
			setParticipant(participant);
		}
	}, [profile]);

	useEffect(() => {
		if (appointmentCanceled) {
			setIsCancelWindowOpen(false)
			clearApointment();
			navigate('/appointments');
			getAppointmennt(appointmentId);
			clearCanceled()
		}
	}, [appointmentCanceled])

	useEffect(() => {
		if (cancellError) {
			const timeout = setTimeout(() => {
				clearError();
				setIsCancelWindowOpen(false);
			}, 3000);
			return () => clearTimeout(timeout);
		}
	}, [cancellError]);

	useEffect(() => {
		const currentId = id || pathname.split('/').pop();
		if (currentId) {
			setAppointmentId(currentId);
		}
	}, [pathname, id])

	useEffect(() => {
		if (!settings?.globalTimeoutAppointment) {
			setIsVideoCallAvailable(true)
		} else if (appointmentDate && settings?.globalTimeoutAppointment) {
			const appointmentDatePoint = moment(appointmentDate);
			const afterTimeout = settings.afterTimeout;
			const beforeTimeout = settings.beforeTimeout;
			let message = '';
			const interval = setInterval(() => {
				const now = moment();
				const diff = appointmentDatePoint.diff(now, 'minutes');
				const callUnavailable =  (diff < 0) && ((diff * -1) > afterTimeout) || diff > beforeTimeout;

				if (callUnavailable) {
					setIsVideoCallAvailable(false);
					if((diff < 0) && ((diff * -1) > afterTimeout)) {
						message =
							`The call is available ${afterTimeout} minutes after the start of the meeting. (${handleMinutes(diff * -1)} passed)`;
						clearInterval(interval)
					} else {
						if (diff > beforeTimeout) {
							message =
								`The call will be available ${beforeTimeout} minutes before the start of the meeting. (${handleMinutes(diff)} left)`;
						}
					}
					setAvailabilityMessage(message);
				} else {
					if (!isVideoCallAvailable) {
						setAvailabilityMessage('');
						setIsVideoCallAvailable(true);
					}
				}
				return () =>  clearInterval(interval);
			}, 1000)
		}
	}, [settings, appointmentDate])

	const handleMinutes = (totalMinutes: number) => {
		const minutes = totalMinutes % 60;
		const hours = Math.floor(totalMinutes / 60);
		if (hours > 0) {
			return `${hours}h${minutes > 0 ? ` ${minutes} m` : ''}`;
		} else {
			return `${totalMinutes} m`;
		}
		
	}

	const handleVideoCall = () => {
		window.open(`https://telehealth.aya-doc.com/room/${appointmentId}`, '_blank');
	}

	useEffect(() => {
		if (getAppointmennt && appointmentId) {
			getAppointmennt(appointmentId);
			getProfile();
			getAppointmentsGlobalSettings();
		}
	}, [appointmentId, getAppointmennt])

	const handleCancelAppointment = () => {
		cancelAppointment(appointmentId)
	}

	const handleNonAttending = () => {
		if (appointmentId) {
			setNonAttendingPatient(appointmentId);
		}
	}

	const handleCloseEditModal = () => {
		clearError();
		setIsEditWindowOpen(false);
		getAppointmennt(appointmentId);
	}

	return (
		<Container className='appointment-layout'>
			<div>
				<div className='nav-block'>
					<DoctorsButton
						variant="contained"
						disableRipple={true}
						onClick={() => {
							clearApointment();
							navigate('/appointments');
						}}
					>
						<div className="button-label">
							<ArrowLeftIcon />
							<div>Back to appointments</div>
						</div>
					</DoctorsButton>
				</div>
				<div>
					<div className='role'>Appointment</div>
					{
						appointmentStatus === 'cancelled' && (
							<div className='canceled'>Cancelled</div>
						)
					}
				</div>
			</div>
			<div>
				{
					isSettingsLoading || isLoading || (profile === null) ? (
						<Loader height='600px' />
					) : (
							<>
								<div className='patient-block'>
									<div className='patient-header'>Patient</div>
									<div className='patient-profile'>
										<div className='patient-photo'>
											<img width="74px" height="74px" src={participant?.photo} alt='' />
											<div className='full-name-block'>
												{`${participant?.firstname} ${participant?.lastname}`}
											</div>
											<div className='participant-navigation'>
												<NavButton
													variant="contained"
													disableRipple={true}
													onClick={() => {
														clearApointment();
														navigate(`/patients/${participant?.id}`);
													}}
												>
													<div className="button-label">
														<div>Go to profile</div>
														<ArrowUpRightIcon />
													</div>
												</NavButton>
											</div>
										</div>
									</div>
									<div className='appointment-info'>
										<div>
											Appointment info
										</div>
										<div>
											<div>
												<div>Date</div>
												<div>{moment(appointmentDate).format('LL')}</div>
											</div>
											<div>
												<div>Time</div>
												<div>{moment(appointmentDate).format('LT')}</div>
											</div>
											<div>
												<div>Appointment type</div>
												<div>{appointmentType}</div>
											</div>
										</div>
									</div>
								</div>
								{
									appointmentStatus !== 'cancelled' && (
										<div className='controls-block'>
											{
												appointmentType === 'ONLINE' ? (
													isVideoCallAvailable ? (
														<div className='button-block'>
															<RescheduleButton
																variant="contained"
																disableRipple={true}
																onClick={() => handleVideoCall()}
															>
																<div className="controls-button-label">
																	<VideoIcon />
																	<div>Video call</div>
																</div>
															</RescheduleButton>
														</div>
													) : (
														<div className='availability-block'>
															<div>{availabilityMessage}</div>
														</div>
													)
												) : null
											}
											<div>
												<RescheduleButton
													variant="contained"
													disableRipple={true}
													onClick={() => handleNonAttending()}
												>
													<div className="controls-button-label">
														<NonAttendingIcon />
														<div>Patient didn't come</div>
													</div>
												</RescheduleButton>
											</div>
											<div>
												<RescheduleButton
													variant="contained"
													disableRipple={true}
													onClick={() => setIsEditWindowOpen(true)}
												>
													<div className="controls-button-label">
														<RescheduleIcon />
														<div>Reschedule appointment</div>
													</div>
												</RescheduleButton>
											</div>
											<div>
												<CancelButton
														variant="contained"
														disableRipple={true}
														onClick={() => setIsCancelWindowOpen(true)}
													>
														<div className="controls-button-label">
															<CancellationIcon />
															<div>Cancel appointment</div>
														</div>
												</CancelButton>
											</div>
										</div>
									)
								}
							</>
					)
				}
			</div>
			<StyledModal
				keepMounted
				disablePortal
				aria-labelledby="unstyled-modal-title"
				aria-describedby="unstyled-modal-description"
				open={isCancelWindowOpen}
				onClose={() => {
					clearError();
					setIsCancelWindowOpen(false);
				}}
			>
				<>
					<CancelAppointmentModal
						cancellError={cancellError}
						closeModal={() => {
							clearError();
							setIsCancelWindowOpen(false);
						}}
						cancelAppointment={handleCancelAppointment}
					/>
				</>
			</StyledModal>
			<StyledModal
				keepMounted
				disablePortal
				aria-labelledby="unstyled-modal-title"
				aria-describedby="unstyled-modal-description"
				open={isEditWindowOpen}
				onClose={handleCloseEditModal}
			>
				<>
					<EditConsultation
						closeModal={handleCloseEditModal}
						doctorId={doctorId}
						appointmentId={appointmentId}
						name={`${participant?.firstname} ${participant?.lastname}`}
						photo={participant?.photo || Avatar}
						isDoctor
					/>
				</>
			</StyledModal>
		</Container>
	);
};

const mapStateToProps = (state: AppStateType) => ({
	doctorId: state.profile.fullProfile.id,
	isLoading: state.doctors.isLoading,
	selectedAppointment: state.doctors.selectedAppointment,
	appointmentCanceled: state.schedule.appointmentCanceled,
	error: state.schedule.error,
	cancellError: state.schedule.cancellError,
	settings: state.schedule.settings,
	isSettingsLoading: state.schedule.isSettingsLoading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getProfile: () => dispatch(getProfileByTokenRequest()),
	getAppointmennt: (data: number) => dispatch(getAppointmentRequest(data)),
	getAppointmentsGlobalSettings: () => dispatch(getAppointmentsGlobalSettingsRequest()),
	clearApointment: () => dispatch(clearSelectedAppointment()),
	setModalOpen: (data: boolean) => dispatch(setModalWindowOpen(data)),
	cancelAppointment: (data: number) => dispatch(cancelAppointmentRequest(data)),
	clearCanceled: () => dispatch(clearCanceledStatus()),
	setNonAttendingPatient: (data: number) => dispatch(setNonAttendingPatientRequest(data)),
	clearError: () => dispatch(clearErrorStatus())
})

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
