import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SuccessIcon from 'images/Icons/successIcon';

import { NewAppointmentT } from 'types'
import './success.scss';

const CancelButtonStyles = {
	backgroundColor: '#FFFFFF',
	color: 'rgba(44, 121, 206, 1)',
	padding: '5px 10px',
	borderColor: 'rgba(44, 121, 206, 1)',
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

const CloseButton = styled(Button)(Object.assign(CancelButtonStyles, CommonStyles));

const Container = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	rowGap: '32px',
	justifyContent: 'space-between'
});

type ScheduleWindowT = {
	message?: string,
	newAppointment?: Partial<NewAppointmentT> | null,
	closeModal: () => void,
}

function SuccessWindow({
	message='',
	closeModal = () => {},
}: ScheduleWindowT) {
	return (

				<Container className='success-layout'>
					<div className='title'>
						<div className='success-message'>
							<div>Success!</div>
							<div><SuccessIcon /></div>
						</div>
					</div>
					<div className='success-base-block'>
						<div className='message'>
							{
								message || 'Your acoount has been successfully updated. You can see changes right now!'
							}
						</div>
					</div>
					<div className='save-changes-block'>
							<div>
								<CloseButton disableRipple={true}  onClick={closeModal}>
									Ok
								</CloseButton>
							</div>
						</div>
				</Container>
	);
}

export default SuccessWindow;
