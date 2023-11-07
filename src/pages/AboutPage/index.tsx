import React, {useState, useEffect} from 'react';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppStateType from '../../redux/types';
import ArrowLeftIcon from '../../images/Icons/arrowLeftIcon';
import SuccessIcon from '../../images/Icons/successIcon';
import SuccessMessage from 'components/messages/successMessage';
import { TextFieldStyles } from '../../components/controls/textfields';
import { SimpleButton, CreateButtonStyles } from 'components/controls/buttons';
import {
	updateAboutTextRequest,
	getAboutTextRequest,
	updateEducationTextRequest,
	getEducationTextRequest,
	clearSuceessMessage
} from '../../redux/modules/profile/actions/profile'; 

import {KeycloakTokenParsed} from '../../types';
import './about.scss';
import { Dispatch } from '@reduxjs/toolkit';

export const StyledModal = styled(Modal)({
	position: 'fixed',
	width: '200px',
	height: '200px'
});

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type AboutPageProps = {
	isAuth: boolean,
	profile: KeycloakTokenParsed,
	aboutUpdated: boolean,
	aboutTextProp: string,
	educationInfo: string,
	educationUpdated: boolean
} & DispatchProps;

const ButtonStyles = {
	width: '113px',
	height: '34px',
	padding: '8px 16px 8px 16px',
	borderRadius: '8px',
};

const TextFieldFont = {
	fontFamily: 'Manrope',
	fontSize: '16px',
	fontWeight: 400,
};

const AboutTextFieldStyle = {
	width: '508px',
	height: '496px',
	'& > .MuiOutlinedInput-root.MuiInputBase-formControl': {
		height: '496px',
		paddingTop: '20px',
		'& > input': TextFieldFont,
		'& > textarea': {
			height: '496px !important'
		}
	}
};
const EdiucationTextFieldStyle = {
	width: '508px',
	'& > .MuiOutlinedInput-root.MuiInputBase-formControl': {
		height: '100px',
		'& > input': TextFieldFont,
		'& > textarea': {
			height: '86px !important'
		}
	}
};

const AboutTextField = styled(TextField)(
	Object.assign({}, TextFieldStyles, AboutTextFieldStyle, {height: '508px'})
);
const EducationTextField = styled(TextField)(
	Object.assign({}, TextFieldStyles, EdiucationTextFieldStyle, {height: '100px'})
);

export const SaveButton = styled(Button)(Object.assign(CreateButtonStyles, ButtonStyles, {width: '85px', height: '40px'}));

const AboutPage: React.FC<AboutPageProps> = ({
	setAbout,
	getAbout,
	setEducation,
	getEducation,
	clearSuceessMessageFunc,
	aboutUpdated,
	aboutTextProp,
	educationInfo,
	educationUpdated
}) => {
	const [aboutText, setAboutText] = useState<string>('');
	const [educationText, setEducationText] = useState<string>('');
	const [toShowSuccessMessage, setToShowSuccessMessage] = useState<boolean>(false);

	const navigate = useNavigate();

	const handleSaveAbout = () => {
		setAbout(aboutText);
		setEducation(educationText);
	} 

	useEffect(() => {
		setAboutText(aboutTextProp);
		setEducationText(educationInfo);
	}, [aboutTextProp, educationInfo])

	useEffect(() => {
		getAbout();
		getEducation();
	}, [])

	useEffect(() => {
		if (aboutUpdated || educationUpdated) {
			setToShowSuccessMessage(true);
			const timeout = setTimeout(() => {
				setToShowSuccessMessage(false)
				clearSuceessMessageFunc();
			}, 3000);

			return () => clearTimeout(timeout);
		}
	}, [aboutUpdated, educationUpdated])

	return (
		<Container className='about-layout'>
			<div className='nav-block'>
				<SimpleButton
					variant="contained"
					disableRipple={true}
					onClick={() => {
						navigate('/account');
					}}
				>
					<div className="button-label">
						<ArrowLeftIcon />
						<div>Back to account</div>
					</div>
				</SimpleButton>
			</div>
			<div className='about-block'>
				<div>About</div>
				<div>
					<AboutTextField
						required
						multiline
						value={aboutText}
						focused={!!aboutText}
						minRows={10}
						maxRows={10}
						id="outlined-required"
						label="About"
						variant="outlined"
						onChange={(event: React.ChangeEvent<unknown>) => {
							setAboutText((event.target as HTMLInputElement).value)
						}}
					/>
				</div>
				<div>
					<EducationTextField
						required
						multiline
						minRows={10}
						maxRows={10}
						value={educationText}
						focused={!!educationText}
						id="outlined-required"
						label="Education and training"
						variant="outlined"
						onChange={(event: React.ChangeEvent<unknown>) => {
							setEducationText((event.target as HTMLInputElement).value)
						}}
					/>
				</div>
				<div>
					<SaveButton
						disableRipple={true}
						onClick={handleSaveAbout}
					>
						Save
					</SaveButton>
				</div>
				{
					toShowSuccessMessage && (
						<div className='success-message'>
							<div>Data successfully updated!</div>
							<div><SuccessIcon /></div>
						</div>
					)
				}
			</div>
			<StyledModal
				keepMounted
				disablePortal
				aria-labelledby="unstyled-modal-title"
				aria-describedby="unstyled-modal-description"
				open={toShowSuccessMessage}
				onClose={() => setToShowSuccessMessage(false)}
			>
				<SuccessMessage
					closeModal={() => setToShowSuccessMessage(false)}
				/>
			</StyledModal>
		</Container>
	);
};

const mapStateToProps  = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  profile: state.auth.profile,
  aboutUpdated: state.profile.aboutUpdated,
  aboutTextProp: state.profile.aboutText,
  educationInfo: state.profile.educationText,
  educationUpdated: state.profile.educationTextUpdated
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setAbout: (data: string) => dispatch(updateAboutTextRequest(data)),
	getAbout: () => dispatch(getAboutTextRequest()),
	setEducation: (data: string) => dispatch(updateEducationTextRequest(data)),
	getEducation: () => dispatch(getEducationTextRequest()),
	clearSuceessMessageFunc: () => dispatch(clearSuceessMessage())
})

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);