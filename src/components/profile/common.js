import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { TextFieldStyles } from '../controls/textfields';

export const ButtonStyles = {
	width: '113px',
	height: '34px',
	padding: '8px 16px 8px 16px',
	borderRadius: '8px',
};

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
