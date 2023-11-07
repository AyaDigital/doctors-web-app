import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
	errorMessage?: string,
	closeModal?: () => void,
	cancelAppointment?: () => void
}

export const CancelAppointmentModal: React.FC<CancelAppointmentModalT> = ({
	closeModal = () => {},
	errorMessage,
	cancelAppointment
}) => {
	return (
		<Container className='cancel-form-layout'>
			<div>Cancel appointment?</div>
			<div>The appointment will be canceled for you and the patient</div>
			<div className='error-block'>
				{errorMessage}
			</div>
			<div className='controls-block'>
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
