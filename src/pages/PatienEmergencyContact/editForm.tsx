import React, {useState, useEffect} from 'react';
import InputMask from "react-input-mask";
import MenuItem from '@material-ui/core/MenuItem';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SuccessIcon from '../../images/Icons/successIcon';
import { EmergencyTypeDataT, EmergencyContactT, EmergencyContactItemT } from 'types';

import { TextFieldStyles } from '../../components/controls/textfields';
import './patientEmergencyContact.scss';
export const ButtonStyles = {
	width: '113px',
	height: '34px',
	padding: '8px 16px 8px 16px',
	borderRadius: '8px',
};

export const StyledTextField = styled(TextField)(Object.assign(TextFieldStyles, {width: '508px'}));
export const PhoneTextField = styled(TextField)(
	Object.assign(TextFieldStyles, {
		width: '508px',
		'& > .MuiOutlinedInput-root.MuiInputBase-formControl': {
			height: '40px',
			borderRadius: '8px',
			backgroundColor: '#FFFFFF !important',
			'& > input': {
				fontFamily: 'Manrope',
				fontSize: '16px',
				fontWeight: 400,
			}
		}
	})
);
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

const OutlineButton = styled(Button)(Object.assign(CancelButtonStyles, CommonStyles));
const SaveChangesButton = styled(Button)(Object.assign(SaveChangesButtonStyles, CommonStyles));
type EditContactFormProps = {
	types: EmergencyTypeDataT,
	isLoading: boolean;
	contactsLength: number;
	id?: number;
	currentContact?: EmergencyContactItemT;
	handleSetContact?: (data: EmergencyContactT) => void;
	handleUpdateContact?: (data: EmergencyContactT, id: number) => void;
	handleCloseModal?: () => void;
}

const EditForm: React.FC<EditContactFormProps> = ({
	types,
	id,
	currentContact,
	contactsLength,
	handleSetContact = () => {},
	handleCloseModal = () => {},
	handleUpdateContact = () => {}
}) => {
	const [contactName, setContactName] = useState('');
	const [isPhoneValid, setIsPhoneValid] = useState<boolean>(false);
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [currentType, setCurrentType] = useState<any>();

	useEffect(() => {
		if (id) {
			setContactName(currentContact?.fullName || '');
			setPhoneNumber(currentContact?.phone || '');
			setCurrentType(currentContact?.type.id);
		} else {
			setContactName('');
			setPhoneNumber('');
			setCurrentType(0);
		}
	}, [currentContact, id]);

	useEffect(() => {
		if (id === undefined) {
			setContactName('');
			setPhoneNumber('');
			setCurrentType(0);
		}
	}, [contactsLength]);

	const handleSaveButton = () => {
		const data = {
			"fullName":contactName,
			"phone":phoneNumber,
			"summary":"Test 1",
			"typeId": currentType
		}
		if (id) {
			handleUpdateContact(data, id);
		} else {
			handleSetContact(data);
		}
	}

	const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e?.target.value
		const regExp = new RegExp(/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/);
		setIsPhoneValid(regExp.test(value))
		setPhoneNumber(value);
	}

	return (
		<>
			<div className='edit-contact-form-layout'>
				<div className='edit-contact-form'>
					<div className='form-title'>{`${id ? 'Edit' : 'Add'} emergency contact`}</div>
					<div>
						<StyledTextField
							required
							id="outlined-required"
							value={contactName}
							focused={false}
							label="Contact full name"
							variant="outlined"
							onChange={(event: React.ChangeEvent<unknown>) => {
								setContactName((event.target as HTMLInputElement).value)
							}}
						/>
					</div>
					<div>
						<StyledTextField
							value={String(currentType)}
							select
							label="Contact type"
							variant="outlined"
							onChange={(event) => {
								setCurrentType(event.target.value);
							}}
						>
							{
								types?.data.map((item, index) => {
									return (
										<MenuItem
											key={index}
											//selected={Number(item.id) === 101}
											disableRipple={true} 
											value={item.id}
										>
											{item.name}
										</MenuItem>
									)
								})
							}
						</StyledTextField>
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
					<div className='save-changes-block'>
						<div>
							<OutlineButton disableRipple={true}  onClick={handleCloseModal}>
								Cancel
							</OutlineButton>
						</div>
						<div>
							<SaveChangesButton
								disableRipple={true}
								onClick={handleSaveButton}
							>
								Save
							</SaveChangesButton>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default EditForm;
