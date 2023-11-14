import React, {useEffect, useState} from 'react';
import { DispatchProp, connect, useSelector  } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import moment, { Moment } from 'moment';
import VideoIcon from 'images/Icons/videoIcon';
import ArrowLeftIcon from '../../images/Icons/arrowLeftIcon';
import ArrowUpRightIcon from '../../images/Icons/arrowUpRightIcon';
import RescheduleIcon from '../../images/Icons/rescheduleIcon';
import CancellationIcon from '../../images/Icons/cancellationIcon';
import Avatar from '../../images/appointmentAvatar.png';
import AppStateType from '../../redux/types';
import { AppointmentT, ParticipantT } from '../../types';
import Loader from '../../components/layout/Loader';
import {
	getPatientAppointmentRequest,
	clearSelectedAppointment,
	cancelAppointmentRequest,
	clearCancelledPatientAppointment,
	clearErrorRequest
} from '../../redux/modules/patients/actions/patients';
import { setModalWindowOpen } from '../../redux/modules/layout/actions/modalActions';
import { CancelAppointmentModal } from './components/cancel'
import EditConsultation from 'components/appointment/editAppointment';
import './patientAppointmetPage.scss';
import { Dispatch } from '@reduxjs/toolkit';
import {
	Container, StyledModal, DoctorsButton, CommonStyles
} from './components/common';

export const RescheduleButton = styled(Button)(Object.assign({color: 'rgba(0, 0, 0, 1)'}, CommonStyles, {width: '377px'}));
export const CancelButton = styled(Button)(Object.assign({color: 'rgba(255, 84, 74, 1)'}, CommonStyles, {width: '377px'}));
export const NavButton = styled(Button)(Object.assign({color: 'rgba(60, 60, 67, 0.6)'}, CommonStyles, {width: 'auto'}));

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type AppointmentProps = {
	selectedAppointment: AppointmentT | undefined,
	isLoading?: boolean,
	appointmentCanceled?: boolean,
	error: string,
} & DispatchProps;

const STATUS_SCHEDULED = 'scheduled';
const STATUS_CANCELLED = 'cancelled';

const PatientAppointmentPage: React.FC<AppointmentProps> = ({
	selectedAppointment: appointment, 
	appointmentCanceled,
	isLoading,
	getAppointmennt = () => {},
	clearApointment = () => {},
	cancelAppointment,
	clearCanceled = () => {},
	clearError
}) => {
	const [isCancelWindowOpen, setIsCancelWindowOpen] = useState<boolean>(false);
	const [isEditWindowOpen, setIsEditWindowOpen] = useState<boolean>(false);
	const [appointmentDate, setAppointmentDate] = useState<string>('');
	const [appointmentType, setAppointmentType] = useState<string>('');
	const [appointmentStatus, setAppointmentStatus] = useState<string>('');
	const [participant, setParticipant] = useState<ParticipantT>();
	const [appointmentId, setAppointmentId] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string | undefined>('');
	const [isPlannedAppointment, setIsPlannedAppointment] = useState(false);

	const error = useSelector((state: AppStateType) => state.patients.error);

	const navigate = useNavigate();
	const { state: id, pathname } = useLocation();

	const handleVideoCall = () => {
		window.open(`https://telehealth.aya-doc.com/room/${appointmentId}`, '_blank');
	}

	useEffect(() => {
		if (appointment) {
			const {
				startDate,
				type,
				participant,
				status,
			} = appointment;
			setAppointmentDate(startDate);
			setAppointmentType(type);
			setAppointmentStatus(status);
			setParticipant(participant);
			setIsPlannedAppointment(moment(startDate).isSameOrAfter(moment()))
		}
	}, [appointment]);

	useEffect(() => {
		setErrorMessage(error);
		if (error) {
			const timeout = setTimeout(() => {
				setIsCancelWindowOpen(false);
				clearError();
			}, 3000);
			return () => clearTimeout(timeout);
		}
	}, [error])

	useEffect(() => {
		const currentId = id || pathname.split('/').pop();
		if (currentId) {
			setAppointmentId(currentId);
		}
	}, [pathname, id])

	useEffect(() => {
		if (appointmentCanceled) {
			setIsCancelWindowOpen(false);
			clearCanceled();
			getAppointmennt(appointmentId);
		}
	}, [appointmentCanceled])

	useEffect(() => {
		if (getAppointmennt && appointmentId) {
			getAppointmennt(appointmentId);
		}
	}, [appointmentId, getAppointmennt])

	const handleCancelAppointment = () => {
		cancelAppointment(appointmentId)
	}

	const handleCloseModal = () => {
		setIsEditWindowOpen(false);
	}
	
	return (
		<Container className='patient-appointment-layout'>
			<div>
				<div className='nav-block'>
					<DoctorsButton
						variant="contained"
						disableRipple={true}
						onClick={() => {
							clearApointment();
							navigate('/patient-appointments');
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
							<div className='canceled'>Canseled</div>
						)
					}
				</div>
			</div>
			<div>
				{
					isLoading || (appointment === null) ? (
						<Loader height='600px' />
					) : (
							<>
								<div className='patient-block'>
									<div className='patient-header'>Doctor</div>
									<div className='patient-profile'>
										<div className='name-block'>
											<div className='image-block'>
												<div className='image'>
													<img width="64px" height="64px" src={participant?.photo} alt='' />
												</div>
											</div>
											<div className='full-name-block'>
												{`${participant?.firstname} ${participant?.lastname}`}
											</div>
											<div className='participant-navigation'>
												<NavButton
													variant="contained"
													disableRipple={true}
													onClick={() => {
														clearApointment();
														navigate(`/doctors/${participant?.id}`);
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
									(appointmentStatus === STATUS_SCHEDULED && isPlannedAppointment) && (
										<div className='controls-block'>
											<div>
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
				onClose={() => setIsCancelWindowOpen(false)}
			>
				<div>
					<CancelAppointmentModal
						closeModal={() => setIsCancelWindowOpen(false)}
						errorMessage={errorMessage}
						cancelAppointment={handleCancelAppointment}
					/>
				</div>
			</StyledModal>
			<StyledModal
				keepMounted
				disablePortal
				aria-labelledby="unstyled-modal-title"
				aria-describedby="unstyled-modal-description"
				open={isEditWindowOpen}
				onClose={handleCloseModal}
			>
				<div>
					<EditConsultation
						closeModal={handleCloseModal}
						doctorId={participant?.id}
						appointmentId={appointmentId}
						name={`${participant?.firstname} ${participant?.lastname}`}
						photo={participant?.photo || Avatar}
						// cancelAppointment={cancelAppointment}
					/>
				</div>
			</StyledModal>
		</Container>
	);
};

const mapStateToProps = (state: AppStateType) => ({
	isAuth: state.auth.isAuth,
	isAppointmentLoading: state.patients.isLoading,
	selectedAppointment: state.patients.currentAppointment,
	appointmentCanceled: state.patients.appointmentCanceled,
	error: state.patients.error
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getAppointmennt: (data: number) => dispatch(getPatientAppointmentRequest(data)),
	clearApointment: () => dispatch(clearSelectedAppointment()),
	setModalOpen: (data: boolean) => dispatch(setModalWindowOpen(data)),
	cancelAppointment: (data: number) => dispatch(cancelAppointmentRequest(data)),
	clearCanceled: () => dispatch(clearCancelledPatientAppointment()),
	clearError: () => dispatch(clearErrorRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(PatientAppointmentPage);
