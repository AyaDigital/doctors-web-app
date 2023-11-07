import Modal from '@material-ui/core/Modal';
import { styled } from '@material-ui/core/styles';
import styledSystem from 'styled-components';
import TextField from '@material-ui/core/TextField';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextFieldStyles } from 'components/controls/textfields';
import { MenuItem } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

export const StyledModal = styled(Modal)({
	position: 'fixed',
	width: '200px',
	height: '200px'
});

export const ButtonStyles = {
	width: '113px',
	height: '34px',
	padding: '8px 16px 8px 16px',
	borderRadius: '8px',
};

export const Option = MenuItem;
export const StyledTextField = styled(TextField)(Object.assign({}, {...TextFieldStyles}, {height: '40px', width: '508px'}));
export const StyledSelectField = styled(TextField)(Object.assign({}, {...TextFieldStyles}, {
	width: '125px',
}));

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

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
});

const AutocompleteStyles = {
	'& > .MuiTextField-root': Object.assign({}, {...TextFieldStyles}, {
		height: '40px',
		'& > div': {
			padding: '0px',
			paddingLeft: '16px',
			paddingRight: '16px'
		}
	})
}

export const StyledAutoComplete = styled(Autocomplete)(Object.assign(AutocompleteStyles, {width: '508px'}));
export const StyledDivAutoComplete = styled('div')(Object.assign(AutocompleteStyles, {width: '508px'}));

export const StyledAutocompleteRoot = styledSystem('div')(
	({ theme }) => `
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
