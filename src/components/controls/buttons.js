import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export const SimpleButton = styled(Button)({
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
	},
	'&:active': {
		boxShadow: 'none',
	}
});

export const SmallButton = styled(Button)({
	height: '10px',
	width: '10px',
	minWidth: '10px',
    paddingRight: '10px',
    paddingLeft: '10px',
    border: 'none',
    minHeight: '10px'
});

export const SelectedButtonStyles = {
	backgroundColor: 'rgba(44, 121, 206, 1)',
	color: '#FFFFFF',
	border: '1px solid',
	borderColor: 'rgba(44, 121, 206, 1)',
	'&:hover': {
		backgroundColor: 'rgba(44, 121, 206, 1)',
	}
}
export const UnselectedButtonStyles = {
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

export const CreateButtonStyles = {
	backgroundColor: '#FFFFFF',
	color: 'rgba(44, 121, 206, 1)',
	border: '1px solid',
	borderRadius: '8px',
	borderColor: 'rgba(44, 121, 206, 1)',
	padding: '5px 10px',
	'&:hover': {
		backgroundColor: '#FFFFFF',
	}
}

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
