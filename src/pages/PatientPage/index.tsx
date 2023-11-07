import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import upperfirst from 'lodash.upperfirst';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowLeftIcon from '../../images/Icons/arrowLeftIcon';
import Avatar from '../../images/noPhoto.png';
import AppStateType from '../../redux/types';
import Loader from '../../components/layout/Loader';
import { getOnePatientRequest, clearPatientProfile, setModalIsOpen } from '../../redux/modules/patients/actions/patients';
import AddUserForm from '../../components/patient/AddUserBlock/AddUserForm';
import {StyledModal} from '../Patients/components';
import {PatientT, AppealT} from 'types';
import {getAppealsRequest} from 'redux/modules/dictionaries/actions/dictionaries';
import './patientPage.scss';
import { Dispatch } from '@reduxjs/toolkit';

/**
 * Block with information about Patient, which see a doctor
 */

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
	},
	'&:active': {
		border: 'none',
		backgroundColor: '#ffffff',
		boxShadow: 'none'
	}
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type PatientsProps = {
	profile?: PatientT,
	isLoading?: boolean,
	isModalOpen?: boolean,
	appeals: AppealT[]
} & DispatchProps;

const Patients: React.FC<PatientsProps> = ({
	openModal, profile, getPatient, getAppeals, isLoading, clearProfile, isModalOpen = false, appeals
}) => {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState<PatientT['firstName']>('');
	const [lastName, setLastName] = useState<PatientT['lastName']>('');
	const [appeal, setAppeal] = useState<PatientT['appeal']>('');
	const [phone, setPhone] = useState<PatientT['phone']>('');
	const [photo, setPhoto] = useState<PatientT['photo']>('');
	const [birthdate, setBirthdate] = useState<PatientT['birthdate']>('');

	const { state: id, pathname } = useLocation();
	const appealToPatient = `${upperfirst(firstName)} ${upperfirst(lastName)}`;
	const patientId = id || pathname.split('/').pop();

	useEffect(() => {
		if (getPatient) {
			getAppeals();
			getPatient(patientId);
		}
	}, [patientId, getPatient])

	useEffect(() => {
		if (profile) {
			const appealData = appeals.find(item => String(item.id) === String((profile as PatientT)?.appeal));
			setFirstName(profile?.firstName);
			setLastName(profile?.lastName);
			setPhone(profile?.phone);
			setAppeal(appealData?.name || '');
			setBirthdate(profile?.birthdate);
			setPhoto(profile.photo);
		}
	}, [profile])

	return (
		<Container className='patient-page-layout'>
			<div className="mainBlock">
				<div>
					<DoctorsButton
						variant="contained"
						disableRipple={true}
						onClick={() => {
							clearProfile();
							navigate('/patients');
						}}
					>
						<div className="button-label">
							<ArrowLeftIcon />
							<div>Back to Patients</div>
						</div>
					</DoctorsButton>
				</div>
					{
						isLoading || (profile === null) ? (
							<Loader height='600px' />
						) : (
								<>
									<div className='controls-block'>
										<div className='patient-photo'>
											<img width="148px" height="148px" src={photo || Avatar} alt='' />
										</div>
										<div className='right-block'>
											<div>
												<div className='appeal-patient'>
													<div className='appeal'>{appeal}</div>
													<div className='full-name'>
														{appealToPatient}
													</div>
												</div>
												<div className='phone'>{phone}</div>
											</div>
											<div>
												<div className='role'>Patient</div>
											</div>
										</div>
									</div>
									<div className='info-block'>
										<div>
											<div>
												Date of Birth
											</div>
											<div>
												{moment(birthdate, "YYYY/MM/DD").format("DD/MM/YYYY")}
											</div>
										</div>
										<div>
											<div>
												Sex
											</div>
											<div>
												Female
											</div>
										</div>
										<div>
											<div>
												SSN
											</div>
											<div>
												492-99-1001
											</div>
										</div>
										<div>
											<div>
												Emergency Contact
											</div>
											<div>
												<div>
													<span>Contact Name:</span> Dave
												</div>
												<div>
													<span>Contact Phone:</span> +1 (229) 555-0111
												</div>
											</div>
										</div>
										<div>
											<div>
												Address
											</div>
											<div>
												<div>
													<span>Home address:</span> 1627 N Winchell St, Portland, OR 97217, USA
												</div>
												<div>
													<span>Billing address:</span> 1627 N Winchell St, Portland, OR 97217, USA
												</div>
											</div>
										</div>
										<div>
											<div>
												Insurance
											</div>
											<div>
												<div>
													<span>Name:</span> PPO
												</div>
												<div>
													<span>Member ID:</span> 123 454 213
												</div>
												<div>
													<span>Group ID:</span> 1232-12313-EHN
												</div>
												<div>
													<span>PCP Phone Number:</span> +1 (229) 555-0109
												</div>
											</div>
										</div>
									</div>
								</>
						)
					}
			</div>
			<StyledModal
				keepMounted
				disablePortal
				aria-labelledby="unstyled-modal-title"
				aria-describedby="unstyled-modal-description"
				open={isModalOpen}
				onClose={() => openModal(false)}
			>
				<div>
					<AddUserForm />
				</div>
			</StyledModal>
		</Container>
	);
};

const mapStateToProps = (state: AppStateType) => ({
	isAuth: state.auth.isAuth,
	profile: state.patients.profile,
	isLoading: state.patients.isLoading,
	appeals: state.dictionaries.appeals,
	isModalOpen: state.patients.isModalOpen
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getPatient: (data: number) => dispatch(getOnePatientRequest(data)),
	getAppeals: () => dispatch(getAppealsRequest()),
	clearProfile: () => dispatch(clearPatientProfile()),
	openModal: (data: boolean) => dispatch(setModalIsOpen(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
