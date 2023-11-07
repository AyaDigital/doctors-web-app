import React from 'react';
import InputMask from "react-input-mask";
import { PhoneTextField } from './common';
import SuccessIcon from '../../images/Icons/successIcon';
import { maskedPhone } from '../../utils/constants' 

type PhoneBlockProps = {
	phoneNumber: string,
	currentPhoneNumber: string,
	handlePhoneNumber: (e: React.ChangeEvent<HTMLInputElement>) => void,
	isPhoneValid: boolean
}

const PhoneBlock: React.FC<PhoneBlockProps> = ({
	phoneNumber,
	currentPhoneNumber,
	handlePhoneNumber,
	isPhoneValid
}) => {

	return (
		<div>
			<div className='current-phone'>
					{currentPhoneNumber ? (
						<div className='phone-selected'>
							<div>
								{maskedPhone(currentPhoneNumber, '+#(###) ### - ### - #')}
							</div>
							<div>
								<SuccessIcon />
							</div>
						</div>
					) : (
						<div className='no-phone'>
							You haven't set a phone number yet
						</div>
					)}
			</div>
			<div className='phone-hint'>
				We will send an SMS with a code to verify your identity
			</div>
			<div>
			<InputMask
				mask="+1(999) 999 9999"
				value={phoneNumber}
				onChange={handlePhoneNumber}
			>
				<PhoneTextField
					required
					id="outlined-required"
					label="Phone"
					variant="outlined"
					InputProps={{
						endAdornment: (isPhoneValid ? <SuccessIcon /> : <></>)
					}}
					type="tel"
				/>
			</InputMask>
			</div>
		</div>
	)
};

export default PhoneBlock;