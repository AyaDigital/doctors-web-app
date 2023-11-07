import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';
import styledSystem from 'styled-components';

export const TextFieldStyles = {
	width: '254px',
	height: '40px',
	padding: 0,
	borderRadius: '8px',
	border: '2px',
	backgroundColor: '#FFFFFF !important',
	'& > label': {
		fontFamily: 'Manrope',
		fontSize: '16px',
		fontWeight: 400,
		color: 'rgba(60, 60, 67, 0.6)',
		transform: 'translate(14px, 9px) scale(1)'
	},
	'& > label.Mui-focused, & > label.MuiFormLabel-filled': {
		fontSize: '12px',
		padding: '4px',
		transform: 'translate(14px, -13px)',
		backgroundColor: '#FFFFFF',
	},
	'&:has(div > input:focus) > label': {
		fontSize: '12px',
		padding: '4px',
		transform: 'translate(14px, -13px)',
		backgroundColor: '#FFFFFF',
	},
	'& > .MuiOutlinedInput-root.MuiInputBase-formControl': {
		height: '40px',
		borderRadius: '8px',
		backgroundColor: '#FFFFFF !important',
		'& > input': {
			backgroundColor: '#FFFFFF !important',
		}
	},
	'& > .MuiInputBase-root > .MuiSelect-select:focus': {
		backgroundColor: '#FFFFFF'
	}
}

export const StyledTextField = styled(TextField)(TextFieldStyles);

export const StyledAutocompleteRoot = styledSystem('div')(
	() => `
	font-family: Manrope;
	font-weight: 400;
	border-radius: 8px;
	color: rgba(0, 0, 0, 1);
	background-color: #FFFFFF !important;
	border: 1px solid rgba(198, 198, 200, 1);
	display: flex;
	gap: 5px;
	padding-right: 5px;
	overflow: hidden;
	width: 508px;
	height: 47px;
	
	&.focused {
	  border: 2px solid rgba(44, 121, 206, 1)
	}
  
	&:hover {
		border: 2px solid rgba(44, 121, 206, 1)
	}
  
	&:focus-visible {
		border: 2px solid rgba(44, 121, 206, 1)
	}
  `,
  );

export const StyledInput = styledSystem('input')({
	fontSize: '0.875rem',
	fontFamily: 'inherit',
	fontWeight: 400,
	lineHeight: '1.5',
	color: 'grey',
	border: 'none',
	padding: '12px 12px',
	outline: 0,
	flex: '1 0 auto'
});
