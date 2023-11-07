import React, {useState, useEffect} from 'react';
import { styled } from '@material-ui/core/styles';
import { ActionWithAnyProp } from 'types';
import Button from '@material-ui/core/Button';
import OtpInput from 'react-otp-input';
import { CreateButtonStyles  } from 'components/controls/buttons';
import SuccessIcon from '../../images/Icons/successIcon';
import FailedIcon from '../../images/Icons/failedIcon';
import { ButtonStyles } from './common';
import './modal.scss';

const SaveButton = styled(Button)(Object.assign(CreateButtonStyles, ButtonStyles, {width: '285px', height: '40px'}));
const Container = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	rowGap: '32px',
	justifyContent: 'space-between'
});

type VerifyCodeModalT = {
	closeModal?: () => void,
	phoneNumber: string,
	codeValidated: boolean,
	codeSended: boolean,
	validationError: boolean,
	validateCode: (data: number) => ActionWithAnyProp,
	sendVerificationCode: () => ActionWithAnyProp
}

export const VerifyCodeModal: React.FC<VerifyCodeModalT> = ({
	phoneNumber,
	validateCode,
	codeValidated,
	codeSended,
	validationError,
	sendVerificationCode,
	closeModal = () => {}
}) => {
	const [otp, setOtp] = useState('');
	const [secondsLeft, setSecondsLeft] = useState<number>(60);
	let interval: ReturnType<typeof setInterval>;
	let timeoutValidated: ReturnType<typeof setTimeout>;

	useEffect(() => {
		if (secondsLeft < 0) {
			clearInterval(interval);
		}
	}, [secondsLeft])

	useEffect(() => {
		if (codeSended) {
			setOtp('');
		}
	}, [codeSended]);

	useEffect(() => {
		if (codeValidated) {
			timeoutValidated = setTimeout(() => {
				//closeModal()
			}, 3000)
		}
		return () => {
			clearInterval(timeoutValidated);
		}
	}, [codeValidated])

	useEffect(() => {
		interval = setInterval(() => {
			setSecondsLeft(val => val - 1)
		}, 1000)
		return () => {
			clearInterval(interval);
		}
	}, []);

	useEffect(() => {
		if(otp.toString().length === 6) {
			validateCode(Number(otp))
		}
	}, [otp])

	return (
		<Container className='verify-form-layout'>
			<div>Confirmation code</div>
			<div>{`Enter the code that we sent you to your phone number ${phoneNumber}`}</div>
			<div>
				{
					codeValidated ? (
						<div className='success-message'>
							<div>Code validated!</div>
							<SuccessIcon />
						</div>
					) : (
						<OtpInput
							value={otp}
							onChange={setOtp}
							numInputs={6}
							renderSeparator={<span>-</span>}
							renderInput={(props) => <input {...props} />}
						/>
					)
				}
				{
					validationError && (
						<div className='error-message'>
							<div>Validation code error. Try again</div>
							<FailedIcon />
						</div>
					)
				}
			</div>
			<div>
				{
					secondsLeft < 0 ? (
						<div className='resend-code'>
							<SaveButton
								disableRipple={true}
								onClick={() => sendVerificationCode()}
							>
								Resend code
							</SaveButton>
						</div>
					) : (
						<div className='resend-message'>{`Resend the code (${secondsLeft} sec)`}</div>
					)
				}
			</div>
		</Container>
	);
}
