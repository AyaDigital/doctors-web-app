import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
	label: {
		display: "block"
	},
	listbox: {
		width: 200,
		margin: 0,
		padding: 0,
		zIndex: 1,
		listStyle: "none",
		backgroundColor: theme.palette.background.paper,
		maxHeight: 200,
		'& li[data-focus="true"]': {
			backgroundColor: "#4a8df6",
			color: "white",
			cursor: "pointer"
		},
		'& > div > li:hover': {
			cursor: "pointer"
		},
		"& li:active": {
			backgroundColor: "#2977f5",
			color: "white",
			cursor: "pointer"
		},
		'& > input': {
			'aria-controls': 'use-autocomplete-demo-popup'
		}
	}
	}));

export const CommonCancelButton = {
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

export const CancelButtonStyles = {
	backgroundColor: '#FFFFFF',
	color: 'rgba(44, 121, 206, 1)',
	padding: '5px 10px',
	'&:hover': {
		backgroundColor: '#FFFFFF',
	}
}
export const SaveChangesButtonStyles = {
	backgroundColor: 'rgba(44, 121, 206, 1)',
	color: '#FFFFFF',
	borderColor: 'rgba(44, 121, 206, 1)',
	padding: '5px 10px',
	'&:hover': {
		backgroundColor: 'rgba(44, 121, 206, 1)',
	}
}

export const CommonStyles = {
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

export const StyledButton = styled(Button)({
	border: 'none',
	width: '24px',
	height: '24px',
	minWidth: '24px',
	padding: '0',
	'&:hover': {
		backgroundColor: '#ffffff',
	}
});
