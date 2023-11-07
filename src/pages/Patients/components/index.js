
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

export const StyledButton = styled(Button)({
	border: 'none',
	borderRadius: '8px',
	fontFamily: 'Manrope',
	fontWeight: 500,
	height: '40px',
	width: '200px',
	fontSize: '15px',
	backgroundColor: 'rgba(44, 121, 206, 1)',
	color: '#FFFFFF',
	padding: '5px 10px',
	'&:hover': {
		backgroundColor: 'rgba(44, 121, 206, 1)',
	}
});

export const DoctorsButton = styled(Button)({
	border: 'none',
	fontFamily: 'Manrope',
	fontWeight: 500,
	height: '40px',
	width: '200px',
	fontSize: '15px',
	color: '#000000',
	backgroundColor: '#FFFFFF',
	padding: '5px 10px',
	focusVisible: 'false',
	'&:hover': {
		backgroundColor: '#FFFFFF',
	}
});

export const DetailsButton = styled(Button)({
	border: 'none',
	backgroundColor: '#FFFFFF',
	padding: '5px 10px',
	disableRipple: 'true',
	'&:hover': {
		backgroundColor: '#FFFFFF',
	}
});

export const StyledModal = styled(Modal)({
	position: 'fixed',
	width: '200px',
	height: '200px'
});

export const TextFieldStyles = {
	width: '556px',
	height: '30px',
	padding: 0,
	borderRadius: '8px',
	backgroundColor: '#FFFFFF !important',
	'& > label': {
		fontFamily: 'Manrope',
		fontSize: '12px',
		fontWeight: 400,
		color: 'rgba(60, 60, 67, 0.6)',
		transform: 'translate(14px, 9px) scale(1)'
	},
};

export const StyledInput = styled(TextField)(TextFieldStyles);
