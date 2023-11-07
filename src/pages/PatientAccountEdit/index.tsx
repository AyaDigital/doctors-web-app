import React, {useState, useEffect} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { connect } from 'react-redux';
import InputMask from "react-input-mask";
import moment from 'moment';
import capitalize from 'lodash/capitalize';
import { useNavigate } from 'react-router-dom';
import upperfirst from 'lodash.upperfirst';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppStateType from 'redux/types';
import SuccessIcon from 'images/Icons/successIcon';
import CloseIcon from 'images/Icons/closeIcon';
import Map from 'components/map/map';
import useGeoLocation from 'hooks/useGeoLocation/useGeoLocation';
import ArrowLeftIcon from 'images/Icons/arrowLeftIcon';
import ActiveIcon from 'images/Icons/activeIcon';
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import {
	KeycloakTokenParsed, BaseInfoT, GenderT, FullProfileT, DictionaryT, InsuranceCompanyT, CurrentInsuranceT, AppealT, LatLngT
} from 'types';
import {
	setContactProfileRequest,
	sendVerificationCodeRequest,
	validateCodeRequest,
	editAddressProfileRequest,
	updateUserProfileRequest,
	getProfileByTokenRequest,
	getAddressProfileRequest,
	getPatientInsurancesRequest,
	deletePatientInsurancesRequest
} from 'redux/modules/profile/actions/profile';

import {
	getInsuranceListRequest,
	getAppealsRequest
} from '../../redux/modules/dictionaries/actions/dictionaries'
import { SimpleButton, SelectedButtonStyles, UnselectedButtonStyles, CreateButtonStyles  } from 'components/controls/buttons';
import {
	StyledModal, ButtonStyles, Container, StyledTextField as TextInput, StyledAutoComplete, StyledSelectField
} from './components/common';
import SuccessMessage from 'components/messages/successMessage';
import { VerifyCodeModal } from 'components/profile/verifyCode';
import './accountEdit.scss';
import { Dispatch } from '@reduxjs/toolkit';
import PhoneBlock from 'components/profile/phoneBlock';
import InsuranceBlock from './components/insuranceBlock';

type contactPayloadT = {
	phone?: string
}
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type PatientAccountEditProps = {
	isLoading: boolean,
	profile: KeycloakTokenParsed,
	address: string,
	appeals: AppealT[],
	fullProfile: FullProfileT,
	codeSended: boolean,
	codeValidated: boolean,
	profileUpdated: boolean,
	validationError: boolean,
	currentInsurance: CurrentInsuranceT[],
	companies: DictionaryT<InsuranceCompanyT>
} & DispatchProps;

const SaveButton = styled(Button)(Object.assign(CreateButtonStyles, ButtonStyles, {width: '85px', height: '40px'}));
const SaveButtonUnactive = styled(Button)(Object.assign(
	{}, {...CreateButtonStyles}, {...ButtonStyles}, {
		width: '85px',
		height: '40px',
		borderColor: 'grey',
		color: 'grey'
	}
));
const StyledTextField = Object.assign(TextInput, {height: '40px'});

const GenderSimpleStyledButton = styled(Button)(
	Object.assign({}, UnselectedButtonStyles, ButtonStyles, {width: '114px'})
);
const GenderSelectedStyledButton = styled(Button)(
	Object.assign({}, SelectedButtonStyles, ButtonStyles, {width: '114px'})
);

type genderType = Capitalize<GenderT>;
const genders: genderType[] = ['Male', 'Female', 'Other', 'Unknown'];

const PatientAccountEdit: React.FC<PatientAccountEditProps> = ({
	address: currentAddress,
	companies,
	appeals,
	currentInsurance,
	setContact = () => {},
	getAddress = () => {},
	getPatientInsurances = () => {},
	deleteInsurance = () => {},
	getAppeals,
	getCompanies,
	getProfile,
	updateBaseInfo,
	codeSended = false,
	sendVerificationCode,
	validateCode,
	codeValidated,
	validationError,
	profileUpdated,
	fullProfile,
	editAddress,
}) => {
	const navigate = useNavigate();
	const [selectedGender, setSelectedGender] = useState<genderType>();
	const [isVerifyModalOpen, setIsVerifyModalOpen] = useState<boolean>(false);
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [toShowSuccessMessage, setToShowSuccessMessage] = useState<boolean>(false);
	const [tabIndex, setTabIndex] = useState<number>(0);
	const [isPhoneValid, setIsPhoneValid] = useState<boolean>(false);
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [address, setAddress] = useState<string>('');
	const [appeal, setAppeal] = useState<number | string>(fullProfile.appeal!);
	const [currentProfileAddress, setCurrrentProfileAddress] = useState<string>('');
	const [firstName, setFirstName] = useState<string>(fullProfile.firstName!);
	const [lastName, setLastName] = useState<string>(fullProfile.lastName!);
	const [middleName, setMiddleName] = useState<string>(fullProfile.middleName!);
	const [birthDate, setBirthDate] = useState<string>(fullProfile.birthDate!);
	const [avatarUrl, setAvatarUrl] = useState<string>(fullProfile.avatarUrl!);
	const [currentPhoneNumber, setCurrentPhoneNumber] = useState<string>(fullProfile.phone!);
	const [ssn, setSSN] = useState<string>();
	const [birthDateError, setBirthDateError] = useState<string>('');
	const [lastNameError, setLastNameError] = useState<string>('');
	const [firstNameError, setFirstNameError] = useState<string>('');
	const [middleNameError, setMiddleNameError] = useState<string>('');
	const [hasErrors, setHasErrors] = useState<boolean>(false);

	const {locations, latlng, currentlatlng, setLatLng, setLocations, setCurrentAddressPoint} = useGeoLocation();

	const {
		placePredictions,
		getPlacePredictions,
	} = usePlacesService({
		apiKey: process.env.REACT_APP_GOOGLE,
	});

	const handleTabsSelect = (index: number) => {
		setTabIndex(index)
	}

	const handleMapClick = ({lat, lng}: LatLngT) => {
		setLatLng({lat, lng});
	}

	const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e?.target.value
		const regExp = new RegExp(/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/);
		setIsPhoneValid(regExp.test(value))
		setPhoneNumber(value);
	}

	useEffect(() => {
		if (currentAddress) {
			setCurrrentProfileAddress(currentAddress);
			setAddress('');
			setLocations([]);
			setCurrentAddressPoint(currentAddress);
		}
	}, [currentAddress])

	const handleSaveButton = () => {
		switch (tabIndex) {
			case 0:
				handleBaseInfo();
				break;
			case 1:
				handlePhoneUpdate();
				break;
			case 2:
				handleAddress();
				return;
		}
	}

	const handleBaseInfo = () => {
		const postData = {
			firstName,
			lastName,
			middleName,
			ssn,
			birthDate: moment(birthDate, "YYYY/MM/DD").format("YYYY-MM-DD"),
			sex: selectedGender,
			appeal
		};
		if (!hasErrors) {
			updateBaseInfo(postData);
		}
	}

	const handleAddress = () => {
		editAddress(address);
	}

	const handlePhoneUpdate = () => {
		const parsedPhone = phoneNumber.replace(new RegExp(/[^+\d]/gi), ''); 
		setContact({
			phone: parsedPhone
		})
	}

	useEffect(() => {
		if (profileUpdated) {
			setToShowSuccessMessage(true);
			const timeout = setTimeout(() => setToShowSuccessMessage(false), 3000);
			return () => clearTimeout(timeout);
		}
	}, [profileUpdated])

	useEffect(() => {
		if (middleNameError || lastNameError || firstNameError || birthDateError) {
			setHasErrors(true);
		} else {
			setHasErrors(false);
		}
	}, [middleNameError, lastNameError, firstNameError, birthDateError])

	useEffect(() => {
		getProfile();
		getAddress();
		getAppeals();
	}, [])

	useEffect(() => {
		getPatientInsurances();
	}, []);

	useEffect(() => {
		getProfile();
	}, [codeValidated])

	useEffect(() => {
		setFirstName(fullProfile.firstName!);
		setLastName(fullProfile.lastName!);
		setMiddleName(fullProfile.middleName!);
		setBirthDate(fullProfile.birthDate!);
		setAvatarUrl(fullProfile.avatarUrl!);
		setCurrentPhoneNumber(fullProfile.phone!);
		setSelectedGender(capitalize(fullProfile.sex) as genderType);
		setSSN(fullProfile.ssn)
		setAppeal(fullProfile.appeal!)
	}, [fullProfile])

	useEffect(() => {
		if (codeSended) {
			setIsVerifyModalOpen(true);
		}
	}, [codeSended]);

	const handleDateValidation = (date: string) => {
		if (date) {
			const diff = moment().diff(moment(date), 'years');
			if(diff < 18) {
				setBirthDateError('Must be at least 18 years old');
			} else {
				setBirthDateError('');
			}
		}
	}

	const handleFirstNameValidation = (name: string) => {
		if(name.length > 180 ) {
			setFirstNameError('Must be less then 180 simbols');
		} else if (name.length === 0 ) {
			setLastNameError('Must not be empty');
		} else {
			setFirstNameError('');
		}
	}

	const handleLastNameValidation = (name: string) => {
		if(name.length > 180 ) {
			setLastNameError('Must be less then 180 simbols');
		} else if (name.length === 0 ) {
			setLastNameError('Must not be empty');
		} else {
			setLastNameError('');
		}
	}

	const handleMiddleNameValidation = (name: string) => {
		if(name.length > 180 ) {
			setMiddleNameError('Must be less then 180 simbols');
		} else {
			setMiddleNameError('');
		}
	}

	const handleMarkerClick = () => {
		window.open(`http://maps.google.com/?q=${currentProfileAddress}`, '_blank');
	}

	const getAddressList = () => {
		return (
			<div className='locations-menu'>
				<div
					className='close-icon'
					onClick={(event: React.ChangeEvent<unknown>) => {
						event.stopPropagation();
						setLocations([]);
					}}
				><CloseIcon /></div>
				{
					locations?.map((item: any) => {
						return <div>
							<a
								href='#'
								onClick={(event: React.ChangeEvent<unknown>) => {
									event.stopPropagation();
									setAddress(item.formatted_address);
								}}>
								{item.formatted_address}
							</a>
						</div>;
					})
				}
			</div>
		)
	}

	return (
		<Container className='patient-account-edit-layout'>
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
			<div className='tabs-block'>
				<Tabs
					onSelect={handleTabsSelect}
					className='tabs-selector'
					selectedTabClassName='selected'
					selectedTabPanelClassName='selected-panel'
					focusTabOnClick={false}
				>
					<TabList>
						<Tab>
							<div>
								My Profile
							</div>
						</Tab>
						<Tab>
							<div>
								Phone number
							</div>
						</Tab>
						<Tab>
							<div>
								Address
							</div>
						</Tab>
						<Tab>
							<div>
								Insurance
							</div>
						</Tab>
					</TabList>
					<TabPanel className='tab-panel base-info-panel'>
						<div className='photo-block'>
							<div className='patient-photo'>
								<img width="148px" height="148px" src={avatarUrl} alt='' />
							</div>
							<div>{`${upperfirst(fullProfile.firstName!)} ${upperfirst(fullProfile.lastName!)}`}</div>
						</div>
						<div className='base-info'>
							<div>
								<div>
									<StyledSelectField
										id="outlined-required"
										value={appeal}
										focused={!!appeal}
										label="Appeal"
										variant="outlined"
										select
										SelectProps={{
											native: true,
										}}
										onChange={(event: React.ChangeEvent<unknown>) => {
											setAppeal((event.target as HTMLInputElement).value)
										}}
									>
										<option key={''} value=''></option>
										{appeals.map((option) => (
											<option key={option.id} value={option.id}>
												{upperfirst(option.name)}
											</option>
										))}
									</StyledSelectField>
								</div>
								<div>
									<StyledTextField
										required
										id="outlined-required"
										value={firstName}
										focused={!!firstName}
										label="First Name"
										variant="outlined"
										onChange={(event: React.ChangeEvent<unknown>) => {
											setFirstName((event.target as HTMLInputElement).value);
											handleFirstNameValidation((event.target as HTMLInputElement).value);
										}}
									/>
									<div className='error'>{firstNameError}</div>
								</div>
								<div>
									<StyledTextField
										required
										id="outlined-required"
										value={lastName}
										label="Last Name"
										focused={!!lastName}
										variant="outlined"
										onChange={(event: React.ChangeEvent<unknown>) => {
											setLastName((event.target as HTMLInputElement).value);
											handleLastNameValidation((event.target as HTMLInputElement).value);
										}}
									/>
									<div className='error'>{lastNameError}</div>
								</div>
								<div>
									<StyledTextField
										id="outlined-required"
										value={middleName}
										focused={!!middleName}
										label="Middle Name (optional)"
										variant="outlined"
										onChange={(event: React.ChangeEvent<unknown>) => {
											setMiddleName((event.target as HTMLInputElement).value);
											handleMiddleNameValidation((event.target as HTMLInputElement).value);
										}}
									/>
									<div className='error'>{middleNameError}</div>
								</div>
								<div className='birthdate'>
									<StyledTextField
										onFocus={() => setIsFocused(true)}
										onBlur={() => setIsFocused(false)}
										focused={true}
										id="outlined-required"
										onChange={(event: React.ChangeEvent<unknown>) => {
											const date = (event.target as HTMLInputElement).value;
											setBirthDate(date);
											handleDateValidation(date);
										}}
										label="Date of birth"
										type={isFocused ? 'date' : 'text'}
										variant="outlined"
										value={birthDate}
									/>
									<div className='error'>{birthDateError}</div>
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
															disableRipple={true}
															variant="contained"
															key={index}
															onClick={() => setSelectedGender(undefined)}
														>
															<div className="button-label">
																<div>{item}</div>
																<ActiveIcon />
															</div>
														</GenderSelectedStyledButton>
													) : (
														<GenderSimpleStyledButton
															disableRipple={true}
															onClick={() => setSelectedGender(item)}
															key={index}
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
									<InputMask
										mask="999-99-9999"
										value={ssn}
										onChange={(event: React.ChangeEvent<unknown>) => {
											setSSN((event.target as HTMLInputElement).value)
										}}
									>
										<StyledTextField
											id="outlined-required"
											label="SSN (optional)"
											focused={!!ssn}
											variant="outlined"
										/>
									</InputMask>
								</div>
							</div>
						</div>
					</TabPanel>
					<TabPanel className='tab-panel phone-panel'>
						<PhoneBlock
							phoneNumber={phoneNumber}
							currentPhoneNumber={currentPhoneNumber}
							handlePhoneNumber={handlePhoneNumber}
							isPhoneValid={isPhoneValid}
						/>
					</TabPanel>
					<TabPanel className='tab-panel address-panel'>
						<div className='current-address'>
								{currentProfileAddress ? (
									<div className='address-selected'>
										<div>
											{currentProfileAddress}
										</div>
										<div>
											<SuccessIcon />
										</div>
									</div>
								) : (
									<div className='no-address'>
										You haven't set an address yet
									</div>
								)}
						</div>
						<div className='new-address'>
							<div>New address</div>
							<div className={`address-selected ${address ? '' : 'has-no-address'}`}>
								<span>
									{address || 'Start type the address or select point on the map'}
								</span>
								<span className='hint'>
									{address ? ' (Press save button below)' : ''}
								</span>
							</div>
						</div>
						<div>
							<StyledAutoComplete
								options={placePredictions}
								getOptionLabel={(option: unknown) => (option as {description: string}).description}
								style={{ width: 300 }}
								onInputChange={(event: React.ChangeEvent<unknown>) => {
									getPlacePredictions({ input: (event.target as HTMLInputElement).value });	
								}}
								onChange={(_, object) => {
									if (object) {
										setAddress((object as {description: string})?.description)
									}
								}}
								renderInput={(params) => <TextField {...params} label="Start typing the address" variant="outlined" />}
							/>
						</div>
						<div className='map-block'>
							<Map
								className='current-map'
								zoom={8}
								center={{
									lat: currentlatlng?.lat,
									lng: currentlatlng?.lng,
								}}
								onClick={handleMapClick}
								markers={currentProfileAddress ? 
									[{
										lat: currentlatlng?.lat,
										lng: currentlatlng?.lng,
										content: avatarUrl,
										text: `${firstName} ${lastName}`,
										action: () => handleMarkerClick()
									}] : undefined}
								overlay={locations?.length ? {
										lat: latlng?.lat,
										lng: latlng?.lng,
										content: getAddressList(),
									} : undefined}

							/>
						</div>
					</TabPanel>
					<TabPanel className='tab-panel insurance-panel'>
						<InsuranceBlock
							currentInsurance={currentInsurance}
							getCompanies={getCompanies}
							deleteInsurance={deleteInsurance}
							companies={companies}
							setCompany={(arg: number) => console.log('arg', arg)}
						/>
					</TabPanel>
				</Tabs>
				<div>
					{
						hasErrors ? (
							<SaveButtonUnactive
								disableRipple={true}
								onClick={() =>{}}
							>
								Save
							</SaveButtonUnactive>
						) : (
							<SaveButton
								disableRipple={true}
								onClick={handleSaveButton}
							>
								Save
							</SaveButton>
						)
					}
				</div>
			</div>
			<StyledModal
				keepMounted
				disablePortal
				aria-labelledby="unstyled-modal-title"
				aria-describedby="unstyled-modal-description"
				open={toShowSuccessMessage}
				onClose={() => setToShowSuccessMessage(false)}
			>

				<div>
					<SuccessMessage
						closeModal={() => setToShowSuccessMessage(false)}
					/>
				</div>
			</StyledModal>
			<StyledModal
				keepMounted
				disablePortal
				aria-labelledby="unstyled-modal-title"
				aria-describedby="unstyled-modal-description"
				open={isVerifyModalOpen}
				onClose={() => setIsVerifyModalOpen(false)}
			>
				<div className='modal-wrapper'>
					<VerifyCodeModal
						closeModal={() => setIsVerifyModalOpen(false)}
						phoneNumber={phoneNumber}
						sendVerificationCode={sendVerificationCode}
						validateCode={validateCode}
						codeValidated={codeValidated}
						codeSended={codeSended}
						validationError={validationError}
					/>
				</div>
			</StyledModal>
		</Container>
	);
};

const mapStateToProps  = (state: AppStateType) => ({
	isLoading: state.profile.isLoading,
	profile: state.auth.profile,
	appeals: state.dictionaries.appeals,
	address: state.profile.address,
	codeSended: state.profile.codeSended,
	codeValidated: state.profile.codeValidated,
	validationError: state.profile.codeValidationError,
	fullProfile: state.profile.fullProfile,
	profileUpdated: state.profile.profileUpdated,
	currentInsurance: state.profile.patientInsurancesList,
	companies: state.dictionaries.insuranceCompanies
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setContact: (data: contactPayloadT) => dispatch(setContactProfileRequest(data)),
	getAppeals: () => dispatch(getAppealsRequest()),
	validateCode: (data: number) => dispatch(validateCodeRequest(data)),
	sendVerificationCode: () => dispatch(sendVerificationCodeRequest()),
	editAddress: (data: string) => dispatch(editAddressProfileRequest(data)),
	updateBaseInfo: (data: Partial<BaseInfoT>) => dispatch(updateUserProfileRequest(data)),
	getProfile: () => dispatch(getProfileByTokenRequest()),
	getAddress: () => dispatch(getAddressProfileRequest()),
	getCompanies: () => dispatch(getInsuranceListRequest()),
	getPatientInsurances: () => dispatch(getPatientInsurancesRequest()),
	deleteInsurance: (id?: number) => dispatch(deletePatientInsurancesRequest(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PatientAccountEdit);
