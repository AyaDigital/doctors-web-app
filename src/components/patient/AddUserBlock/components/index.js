import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import { StyledTextField as CommonTextField } from '../../../controls/textfields';

const CloseButtonStyles = {
	backgroundColor: 'rgba(44, 121, 206, 1)',
	color: '#FFFFFF',
	padding: '5px 10px',
	'&:hover': {
		backgroundColor: 'rgba(44, 121, 206, 1)',
	}
}
const CreateButtonStyles = {
	backgroundColor: '#FFFFFF',
	color: 'rgba(44, 121, 206, 1)',
	borderColor: 'rgba(44, 121, 206, 1)',
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

const RoleButtonStyles = {
	width: '133px',
	height: '34px',
	padding: '8px 16px 8px 16px',
	borderRadius: '8px',
};

const RoleActiveButtonStyles = {
	backgroundColor: 'rgba(44, 121, 206, 1)',
	color: '#FFFFFF',
	border: '1px solid',
	borderColor: 'rgba(44, 121, 206, 1)',
	'&:hover': {
		backgroundColor: 'rgba(44, 121, 206, 1)',
	}
}
const RoleSimpleButtonStyles = {
	fontSize: '14px',
	fontWeight: 400,
	borderColor: 'rgba(198, 198, 200, 1)',
	backgroundColor: '#FFFFFF',
	border: '1px solid',
	color: 'rgba(0, 0, 0, 1)',
	'&:hover': {
		backgroundColor: '#FFFFFF',
	}
}

const UploadFileStyles = {
	padding: 0,
}

export const FileUploadButton = styled(Button)(UploadFileStyles);

export const CloseButton = styled(Button)(Object.assign(CloseButtonStyles, CommonStyles));
export const CreateButton = styled(Button)(Object.assign(CreateButtonStyles, CommonStyles));

export const RoleSimpleStyledButton = styled(Button)(Object.assign(RoleSimpleButtonStyles, RoleButtonStyles));
export const RoleSelectedStyledButton = styled(Button)(Object.assign(RoleActiveButtonStyles, RoleButtonStyles));

export const GenderSimpleStyledButton = styled(Button)(Object.assign(RoleSimpleButtonStyles, RoleButtonStyles, { width: '125px'}));
export const GenderSelectedStyledButton = styled(Button)(Object.assign(RoleActiveButtonStyles, RoleButtonStyles, { width: '125px'}));

export const StyledTextField = CommonTextField;
