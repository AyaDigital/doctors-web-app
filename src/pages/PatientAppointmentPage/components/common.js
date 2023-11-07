import Modal from '@material-ui/core/Modal';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { StyledTextField as CommonTextField, TextFieldStyles as CommonTextFieldStyles } from '../../../components/controls/textfields';

export const Container = styled('div')({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between'
});

export const StyledModal = styled(Modal)({
	position: 'fixed',
	width: '200px',
	height: '200px'
});

export const DoctorsButton = styled(Button)({
	border: 'none',
	fontFamily: 'Manrope',
	fontWeight: 500,
	height: '40px',
	width: '200px',
	fontSize: '15px',
	color: '#000000',
	backgroundColor: '#ffffff',
	padding: '5px 0px',
	focusVisible: 'false',
	'&>span': {
		justifyContent: 'flex-start'
	},
	'&:hover': {
		backgroundColor: '#ffffff',
	}
});

export const CommonStyles = {
	width: '377px',
	height: '24px',
	fontSize: '20px',
	borderRadius: '8px',
	border: 'none',
	padding: 0,
	fontFamily: 'Manrope',
	fontWeight: 500,
	backgroundColor: '#FFFFFF',
	'&:hover': {
		backgroundColor: '#FFFFFF',
	},
	'&>span': {
		justifyContent: 'flex-start'
	},
};

export const StyledTextField = CommonTextField;
export const TextFieldStyles = CommonTextFieldStyles;
