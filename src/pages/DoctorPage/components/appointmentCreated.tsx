import moment from 'moment';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';

import { NewAppointmentT } from 'types'
import './modals.scss';

const CancelButtonStyles = {
	backgroundColor: '#FFFFFF',
	color: 'rgba(44, 121, 206, 1)',
	padding: '5px 10px',
	'&:hover': {
		backgroundColor: '#FFFFFF',
	}
}
const SaveChangesButtonStyles = {
	backgroundColor: 'rgba(44, 121, 206, 1)',
	color: '#FFFFFF',
	borderColor: 'rgba(44, 121, 206, 1)',
	padding: '5px 10px',
	'&:hover': {
		backgroundColor: 'rgba(44, 121, 206, 1)',
	}
}

const CommonStyles = {
	width: '270px',
	height: '40px',
	padding: '12px 24px 12px 24px',
	borderRadius: '8px',
	border: '1px solid',
	fontFamily: 'Manrope',
	fontSize: '16px',
	fontWeight: 500,
	lineHeight: '20px'
}

const CancelEditionButton = styled(Button)(Object.assign(CancelButtonStyles, CommonStyles));
const SaveChangesButton = styled(Button)(Object.assign(SaveChangesButtonStyles, CommonStyles));

const Container = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	rowGap: '32px',
	justifyContent: 'space-between'
});

type ScheduleWindowT = {
	photo?: string,
	name?: string,
	newAppointment?: Partial<NewAppointmentT> | null,
	closeModal: () => void,
}

function AppointmentCreated({
	photo='',
	name='',
	newAppointment = {},
	closeModal = () => {},
}: ScheduleWindowT) {
	const navigate = useNavigate();

	return (

				<Container className='add-appointment-form-layout success'>
					<div className='title'>
						New appointment
					</div>
					<div className='add-appointment-base-block'>
						<div className='specialist'>
							<div>Specialist</div>
							<div>
								<div className='doctors-photo'>
									<img src={photo} alt='' />
								</div>
								<div className='right-block'>
									<div>
										<div className=''>Therapist</div>
									</div>
									<div>
										<div className='full-name'>{name}</div>
									</div>
								</div>
							</div>
						</div>
						<div className='new-appointment-block'>
							<div>Appointement info</div>
							<div className='info-block'>
								<div>
									<div className='title-block'>Date</div>
									<div>{moment(newAppointment?.startDate).format('DD.MM, YYYY')}</div>
								</div>
								<div>
									<div className='title-block'>Time</div>
									<div>
										{moment(newAppointment?.startDate).format('hh:mm')}
									</div>
								</div>
								<div>
									<div className='title-block'>Appointment type</div>
									<div>{newAppointment?.appType}</div>
								</div>
							</div>
						</div>
					</div>
					<div className='save-changes-block'>
							<div>
								<CancelEditionButton disableRipple={true}  onClick={closeModal}>
									Cancel
								</CancelEditionButton>
							</div>
							<div>
								<SaveChangesButton
									disableRipple={true}
									onClick={() => {
										navigate('/patient-appointments');
									}}
								>
									To my appointments
								</SaveChangesButton>
							</div>
						</div>
				</Container>
	);
}

export default AppointmentCreated;
