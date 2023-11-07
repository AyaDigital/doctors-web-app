import React, {useRef, useEffect, useState} from 'react';
import { DispatchProp, connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import upperfirst from 'lodash.upperfirst';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Dispatch } from '@reduxjs/toolkit';
import AppStateType from '../../redux/types';
import { UploadFileT } from '../../types';
import Avatar from '../../images/avatar.png';
import EditIcon from '../../images/Icons/editIcon';
import LogoutIcon from '../../images/Icons/logoutIcon';
import UploadPhotoIcon from '../../images/Icons/uploadPhotoIcon';
import EmergencyContactIcon from '../../images/Icons/emergencyContactIcon';
import { useAppState } from '../../state';
import { uploadPhotoRequest, getProfileByTokenRequest } from '../../redux/modules/profile/actions/profile'; 
import {KeycloakTokenParsed, FullProfileT} from '../../types';
import './account.scss';

/**
 * Block for patient with information about himself and editing tools 
 */

const Container = styled('div')({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between'
});
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type PatientAccountProps = {
	isAuth: boolean,
	profile: KeycloakTokenParsed,
	fullProfile: FullProfileT
} & DispatchProps;

const StyledButton = styled(Button)({
	border: 'none',
	width: '24px',
	height: '24px',
	minWidth: '24px',
	padding: '0',
	'&:hover': {
		backgroundColor: '#ffffff',
	}
});

const PatientAccount: React.FC<PatientAccountProps> = ({ fullProfile, profile, uploadPhoto, getProfile }) => {
	const { signOut } = useAppState();
	const navigate = useNavigate();
	const [avatarUrl, setAvatarUrl] = useState<string>(fullProfile.avatarUrl!); 

	const { given_name, family_name } = profile;
	const hiddenFileInput = useRef<HTMLInputElement>(null);

	const handleFileUpload = () => {
		if (hiddenFileInput.current) {
			hiddenFileInput.current.click();
		}
	}

	useEffect(() => {
		setAvatarUrl(fullProfile.avatarUrl!);
	}, [fullProfile])

	useEffect(() => {
		getProfile();
	}, [])

	const handleClick = (event: any) => {
		uploadPhoto(event.target.files[0]);
	}

	return (
		<Container className='patient-account-layout'>
			<div>
				<div className='patient-photo'>
					<img width="148px" height="148px" src={avatarUrl} alt='' />
				</div>
				<div>{`${upperfirst(given_name)} ${upperfirst(family_name)}`}</div>
			</div>
			<div>
				<div className='edit'>
					<div className='file-upload'>
						<StyledButton
							onClick={handleFileUpload}
							disableRipple={true}
						>
							<UploadPhotoIcon />
						</StyledButton>
						<input
							ref={hiddenFileInput}
							type='file'
							onChange={handleClick}
						/>
					</div>
					<div>Change photo</div>
				</div>
				<div className='edit emergency-contact'>
					<div className='upper'>
						<div>
							<div className=''>
								<StyledButton
									disableRipple={true}
									onClick={() => {
										navigate('/account/emergency');
									}}
								>
									<EmergencyContactIcon />
								</StyledButton>
							</div>
							<div>Emergency Contact</div>
						</div>
						<div className='contact-status'>On</div>
					</div>
					<div className='hint'>
						You can add a person to contact in case of an emergency
					</div>
				</div>
				<div className='edit'>
					<div>
						<StyledButton
							variant="outlined"
							onClick={() => {
								navigate('/account/edit');
							}}
						>
								<EditIcon />
						</StyledButton>
					</div>
					<div>Edit account</div>
				</div>
				<div className='logout'>
					<div>
						<StyledButton onClick={signOut}>
							<LogoutIcon />
						</StyledButton>
					</div>
					<div>Logout</div>
				</div>
			</div>
		</Container>

	);
};

const mapStateToProps  = (state: AppStateType) => ({
	isAuth: state.auth.isAuth,
	profile: state.auth.profile,
	fullProfile: state.profile.fullProfile,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	uploadPhoto: (data: UploadFileT) => dispatch(uploadPhotoRequest(data)),
	getProfile: () => dispatch(getProfileByTokenRequest())
})
export default connect(mapStateToProps, mapDispatchToProps)(PatientAccount);