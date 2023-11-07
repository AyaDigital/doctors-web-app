import React, {useRef, useState} from 'react';
import { connect } from 'react-redux';
import { styled } from '@material-ui/core/styles';

import ActiveIcon from '../../../images/Icons/activeIcon';
import UploadFileIcon from 'images/Icons/uploadFileIcon';

import { setModalIsOpen } from '../../../redux/modules/patients/actions/patients';
import {
	FileUploadButton,
	CloseButton, 
	CreateButton,
	RoleSimpleStyledButton,
	RoleSelectedStyledButton,
	GenderSimpleStyledButton,
	GenderSelectedStyledButton,
	StyledTextField
} from './components/index';

import './addUserBlock.scss';
import { Dispatch } from '@reduxjs/toolkit';

const Container = styled('div')({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between'
});

type PatientsProps = {
	openModal: (arg: boolean) => void,
}

type rolesType = 'Patient' | 'Practitioner' | 'User' | 'Admin';
type genderType = 'Male' | 'Female' | 'Other' | 'Unknown';

const roles: rolesType[] = ['Patient', 'Practitioner', 'User', 'Admin'];
const genders: genderType[] = ['Male', 'Female', 'Other', 'Unknown'];

const AddUserForm: React.FC<PatientsProps> = () => {
	const [selectedList, setSelectedList] = useState<rolesType[]>([]);
	const [selectedGender, setSelectedGender] = useState<genderType | null>();

	const hiddenFileInput = useRef<HTMLInputElement>(null);

	const handleFileUpload = () => {
		if (hiddenFileInput.current) {
			hiddenFileInput.current.click();
		}
	}

	const deleteItem = (role: rolesType) => {
		delete selectedList[selectedList.indexOf(role)]
		setSelectedList([...selectedList])
	}

	const setItem = (role: rolesType) => {
		setSelectedList([...selectedList, role]);
	};

	return (
		<Container className='form-layout'>
			<div>
				Add new user
			</div>
			<div className='middle-block'>
				<div>
					<div>Role</div>
					<div>
						{
							roles.map((item, index) => {
								const isItemSelected = !!selectedList.includes(item);
								return (
									isItemSelected ? (
										<RoleSelectedStyledButton
											key={index}
											disableRipple={true}
											variant="contained"
											onClick={() => deleteItem(item)}
										>
											<div className="button-label">
												<div>{item}</div>
												<ActiveIcon />
											</div>
										</RoleSelectedStyledButton>
									) : (
										<RoleSimpleStyledButton
											key={index}
											disableRipple={true}
											onClick={() => setItem(item)}
										>
											<div className="button-label">
												<div>{item}</div>
											</div>
										</RoleSimpleStyledButton>
									)
								)
							})
						}
					</div>
				</div>
				<div>
					<div>
						Avatar
					</div>
					<div>
						<FileUploadButton
							onClick={handleFileUpload}
							disableRipple={true}
						>
							<UploadFileIcon />
						</FileUploadButton>
						<input ref={hiddenFileInput} type='file' />
					</div>
				</div>
				<div>
					<div>
						Profile
					</div>
					<div>
						<div>
							<StyledTextField
								required
								id="outlined-required"
								label="First Name"
								variant="outlined"
							/>
						</div>
						<div>
							<StyledTextField
								required
								id="outlined-required"
								label="Last Name"
								variant="outlined"
							/>
						</div>
						<div>
							<StyledTextField
								id="outlined-required"
								label="Middle Name (optional)"
								variant="outlined"
							/>
						</div>
						<div>
							<StyledTextField
								required
								id="outlined-required"
								label="Date of Birth"
								variant="outlined"
							/>
						</div>
						<div className='gender-select'>
							<div>Sex</div>
							<div>
								{
									genders.map((item, index) => {
										const isItemSelected = selectedGender === item;
										return (
											isItemSelected ? (
												<GenderSelectedStyledButton
													key={index}
													disableRipple={true}
													variant="contained"
													onClick={() => setSelectedGender(null)}
												>
													<div className="button-label">
														<div>{item}</div>
														<ActiveIcon />
													</div>
												</GenderSelectedStyledButton>
											) : (
												<GenderSimpleStyledButton
													key={index}
													disableRipple={true}
													onClick={() => setSelectedGender(item)}
												>
													<div className="button-label">
														<div>{item}</div>
													</div>
												</GenderSimpleStyledButton>
											)
										)
									})
								}
							</div>
						</div>
						<div>
							<StyledTextField
								required
								id="outlined-required"
								label="Middle Name (optional)"
								variant="outlined"
							/>
						</div>
						<div>
							<StyledTextField
								required
								id="outlined-required"
								label="Middle Name (optional)"
								variant="outlined"
							/>
						</div>
					</div>

				</div>
			</div>
			<div className='buttons-block'>
				<CloseButton>Close</CloseButton>
				<CreateButton>Add User</CreateButton>
			</div>
		</Container>
	);
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	// getList: () => dispatch(getPatientsListRequest()),
	openModal: (data: boolean) => dispatch(setModalIsOpen(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddUserForm);
