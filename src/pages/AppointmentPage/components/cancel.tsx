import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FailedIcon from 'images/Icons/failedIcon';
import './modals.scss';

const NoButtonStyles = {
	backgroundColor: 'rgba(44, 121, 206, 1)',
	color: '#FFFFFF',
	padding: '5px 10px',
	'&:hover': {
		backgroundColor: 'rgba(44, 121, 206, 1)',
	}
}
const YesButtonStyles = {
	backgroundColor: '#FFFFFF',
	color: 'rgba(255, 84, 74, 1)',
	borderColor: 'rgba(255, 84, 74, 1)',
	padding: '5px 10px',
	'&:hover': {
		backgroundColor: '#FFFFFF',
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

export const NoButton = styled(Button)(Object.assign(NoButtonStyles, CommonStyles));
export const YesButton = styled(Button)(Object.assign(YesButtonStyles, CommonStyles));

const Container = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	rowGap: '32px',
	justifyContent: 'space-between'
});

type CancelAppointmentModalT = {
	closeModal?: () => void,
	cancelAppointment?: () => void,
	cancellError?: string
}

export const CancelAppointmentModal: React.FC<CancelAppointmentModalT> = ({
	closeModal = () => {},
	cancelAppointment,
	cancellError
}) => {
	return (
		<Container className='cancel-appointment-form-layout'>
			{
				cancellError && (
					<div className='cancell-appointment-error-message'>
						<div>{cancellError}</div>
						<div><FailedIcon /></div>
					</div>
				)
			}
			<div className='cancell-header'>Cancel appointment?</div>
			<div className='cancell-body'>The appointment will be canceled for you and the patient</div>
			<div className='cancell-controls'>
				<div>
					<YesButton disableRipple={true} onClick={cancelAppointment} >
						Yes
					</YesButton>
				</div>
				<div>
					<NoButton disableRipple={true} onClick={closeModal}>No</NoButton>
				</div>
			</div>
		</Container>
	);
}
