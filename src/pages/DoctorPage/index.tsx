import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import upperfirst from 'lodash.upperfirst';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowLeftIcon from '../../images/Icons/arrowLeftIcon';
import Avatar from '../../images/noPhoto.png';
import AppStateType from '../../redux/types';
import Loader from '../../components/layout/Loader';
import { setModalIsOpen } from '../../redux/modules/patients/actions/patients';
import { getOneDoctorRequest, clearDoctorProfile, getDoctorSlotsRequest } from '../../redux/modules/doctors/actions/doctors';
import MapBlock from '../../components/map/map';
import { SelectedButtonStyles } from '../../components/controls/buttons'
import {StyledModal} from '../Patients/components';
import {DoctorT, SpecialityT, NewAppointmentT, SlotsRequestPayloadT, AppealT} from 'types';
import {getAppealsRequest} from 'redux/modules/dictionaries/actions/dictionaries';
import { createAppointmentRequest, updateAppointmentStatus, cancelAppointmentRequest, getCountSlotsRequest } from '../../redux/modules/schedule/actions/schedule';
import AddAppointment from 'components/appointment/editAppointment';
import AppointmentCreated from './components/appointmentCreated';
import './doctorPage.scss';
import { Dispatch } from '@reduxjs/toolkit';

const Container = styled('div')({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between'
});

const DoctorsButton = styled(Button)({
	border: 'none',
	fontFamily: 'Manrope',
	fontWeight: 500,
	height: '40px',
	width: '200px',
	fontSize: '15px',
	color: '#000000',
	backgroundColor: '#ffffff',
	padding: '5px 10px',
	focusVisible: 'false',
	'&:hover': {
		backgroundColor: '#ffffff',
	}
});
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type DoctorPageProps = {
	profile?: Partial<DoctorT>,
	isLoading?: boolean,
	isModalOpen?: boolean,
	appointmentCreated?: boolean,
	newAppointment?: Partial<NewAppointmentT>,
	appeals: AppealT[],
} & DispatchProps;

const NewAppointmentButton = styled(Button)(
	Object.assign(SelectedButtonStyles, {
		width: '182px',
		height: '40px'
	})
);

const DoctorPage: React.FC<DoctorPageProps> = ({
	profile,
	newAppointment,
	appeals,
	getDoctor,
	getAppeals,
	isLoading,
	clearProfile,
	createAppointment,
	setAppointmentCreated,
	appointmentCreated
}) => {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState<DoctorT['firstName']>('');
	const [lastName, setLastName] = useState<DoctorT['lastName']>('');
	const [appeal, setAppeal] = useState<string>('');
	const [photo, setPhoto] = useState<DoctorT['photo']>('');
	const [address, setAddress] = useState<DoctorT['address']>('');
	const [about, setAbout] = useState<DoctorT['bio']>('');
	const [location, setLocation] = useState<{lat: number, lng: number}>({lat: 0, lng: 0});
	const [specialities, setSpecialities] = useState<Partial<SpecialityT>[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isSuccessWindowOpen, setIsSuccessWindowOpen] = useState<boolean>(false);
	const [doctorId, setDoctorId] = useState<number>(0);

	const { state: id, pathname } = useLocation();
	const appealToDoctor = `${upperfirst(firstName)} ${upperfirst(lastName)}`;

	useEffect(() => {
		const currentId = id || pathname.split('/').pop();
		if (currentId) {
			setDoctorId(currentId);
		}
	}, [pathname, id])

	useEffect(() => {
		if (appointmentCreated) {
			setIsModalOpen(false);
			setIsSuccessWindowOpen(true);
			const timeout = setTimeout(() => {
				setAppointmentCreated(false);
				updateAppointmentStatus(false);
				setIsSuccessWindowOpen(false);
			}, 3000);

			return () => clearTimeout(timeout);
		}
	}, [appointmentCreated])

	useEffect(() => {
		if (getDoctor  && doctorId) {
			getAppeals();
			getDoctor(doctorId);
		}
	}, [doctorId, getDoctor]);

	useEffect(() => {
		if (profile) {
			const appealData = appeals.find(item => String(item.id) === String((profile as DoctorT)?.appeal));

			setFirstName((profile as DoctorT)?.firstName);
			setLastName((profile as DoctorT)?.lastName);
			setAppeal(appealData?.name || '');
			setPhoto((profile as DoctorT).photo);
            setAddress(profile.address);
            setAbout(profile.bio);
            setSpecialities((profile as DoctorT).specialities);
			setLocation({
				lat: (profile as DoctorT)?.location?.lat,
				lng: (profile as DoctorT)?.location?.long
			})
		}
	}, [profile])

	return (
		<>
			<Container className='one-doctor-page-layout'>
				<div className="mainBlock">
					<div>
						<DoctorsButton
							variant="contained"
							disableRipple={true}
							onClick={() => {
								clearProfile();
								navigate('/doctors');
							}}
						>
							<div className="button-label">
								<ArrowLeftIcon />
								<div>Back to doctors</div>
							</div>
						</DoctorsButton>
					</div>
						{
							isLoading || (profile === null) ? (
								<Loader height='600px' />
							) : (
									<>
										<div className='controls-block'>
											<div className='doctors-photo'>
												<img src={photo || Avatar} alt='' />
											</div>
											<div className='right-block'>
												<div className='appeal-doctor'>
													<div className='appeal'>{appeal}</div>
													<div className='full-name'>
														{appealToDoctor}
													</div>
												</div>
												<div>
													<div className=''>Therapist</div>
												</div>
												<div>
													<div className='doctors-address'>{address}</div>
												</div>
												<div className='controls'>
													<NewAppointmentButton
														disableRipple={true}
														onClick={() => setIsModalOpen(true)}
													>
														New Appointment
													</NewAppointmentButton>
												</div>
											</div>
										</div>
										<div className='info-block'>
											<div className='about'>
												About
											</div>
											<div className='about description'>
												{about}
											</div>
											<div className='education'>
												Education and training
											</div>
											<div className='education description'>
												{
													specialities?.map((item: Partial<SpecialityT>, index: number) => {
														return (
															<div key={index} className='speciality'>{item.name}</div>
														)
													})
												}
											</div>
											<div>

											</div>
										</div>
									</>
							)
						}
				</div>
				<div className='map-block'>
					<MapBlock
						center={location}
						zoom={8}
						marker={photo}
						style={{
							width: '100%',
							height: '856px',
							borderRadius: '16px',
							border: '1px' 
						}}
					/>
				</div>
			</Container>
			<StyledModal
				keepMounted
				disablePortal
				aria-labelledby="unstyled-modal-title"
				aria-describedby="unstyled-modal-description"
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			>
				<div>
					<AddAppointment
						closeModal={() => setIsModalOpen(false)}
						doctorId={doctorId}
						appointmentId={null}
						createAppointment={createAppointment}
						photo={photo}
						name={`${upperfirst(firstName)} ${upperfirst(lastName)}`}
					/>
				</div>
			</StyledModal>
			<StyledModal
				keepMounted
				disablePortal
				aria-labelledby="unstyled-modal-title"
				aria-describedby="unstyled-modal-description"
				open={isSuccessWindowOpen}
				onClose={() => setIsSuccessWindowOpen(false)}
			>
				<div>
					<AppointmentCreated
						closeModal={() => setIsSuccessWindowOpen(false)}
						newAppointment={newAppointment}
						photo={photo}
						name={`${upperfirst(firstName)} ${upperfirst(lastName)}`}
					/>
				</div>
			</StyledModal>
		</>
	);
};

const mapStateToProps = (state: AppStateType) => ({
	isAuth: state.auth.isAuth,
	profile: state.doctors.profile,
	isLoading: state.schedule.isLoading,
	appeals: state.dictionaries.appeals,
	appointmentCreated: state.schedule.appointmentCreated,
	newAppointment: state.schedule.newAppointment
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getDoctor: (data: number) => dispatch(getOneDoctorRequest(data)),
	getAppeals: () => dispatch(getAppealsRequest()),
	getSlots: (data: SlotsRequestPayloadT) => dispatch(getDoctorSlotsRequest(data)),
	getCountSlots: (data?: SlotsRequestPayloadT) => dispatch(getCountSlotsRequest(data)),
	clearProfile: () => dispatch(clearDoctorProfile()),
	openModal: (data: boolean) => dispatch(setModalIsOpen(data)),
	createAppointment: (data: number) => dispatch(createAppointmentRequest(data)),
	setAppointmentCreated: (data: boolean) => dispatch(updateAppointmentStatus(data)),
	cancelAppointment: (data: number) => dispatch(cancelAppointmentRequest(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(DoctorPage);
