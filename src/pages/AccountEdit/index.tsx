import React, {useState, useEffect} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { connect } from 'react-redux';
import moment from 'moment';
import capitalize from 'lodash/capitalize';
import { useNavigate } from 'react-router-dom';
import upperfirst from 'lodash.upperfirst';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppStateType from '../../redux/types';
import SuccessMessage from 'components/messages/successMessage';
import Map from 'components/map/map';
import useGeoLocation from 'hooks/useGeoLocation/useGeoLocation';
import SuccessIcon from 'images/Icons/successIcon';
import CloseIcon from 'images/Icons/closeIcon';
import ArrowLeftIcon from 'images/Icons/arrowLeftIcon';
import ActiveIcon from 'images/Icons/activeIcon';
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import {
	KeycloakTokenParsed, BaseInfoT, GenderT,
	FullProfileT, SpecialityT, MySpecialityT,
	MedicalDegreeT, InsuranceCompanyT, AppealT,
	LatLngT, LanguageT
} from 'types';

import {
	setContactProfileRequest,
	sendVerificationCodeRequest,
	validateCodeRequest,
	editAddressProfileRequest,
	updateUserProfileRequest,
	getProfileByTokenRequest,
	showMySpecialitiesRequest,
	addSpecialitiesRequest,
	removeSpecialityRequest,
	getMedicalDegreesRequest,
	getMyMedicalDegreesRequest,
	removeMyMedicalDegreesRequest,
	addMyMedicalDegreesRequest,
	getAddressProfileRequest,
	setDoctorInsuranceRequest,
	getDoctorInsuranceRequest,
	deleteDoctorsInsuranceRequest,
	getDoctorslanguagesRequest,
	updateDoctorslanguagesRequest
} from 'redux/modules/profile/actions/profile';

import {
	getSpecialitiesRequest,
	clearScrollToken,
	getAppealsRequest,
	getLanguagesRequest
} from 'redux/modules/dictionaries/actions/dictionaries';

import { SimpleButton, SelectedButtonStyles, UnselectedButtonStyles, CreateButtonStyles  } from 'components/controls/buttons';
import {
	StyledModal, ButtonStyles, Container, StyledTextField as TextInput, StyledAutoComplete, StyledSelectField
} from './components/common';
import { VerifyCodeModal } from 'components/profile/verifyCode';
import './accountEdit.scss';
import { Dispatch } from '@reduxjs/toolkit';
import PhoneBlock from 'components/profile/phoneBlock';
import SpecialityBlock from './components/blocks/specialityBlock/specialityBlock';
import InsuranceBlock from './components/blocks/insuranceBlock/insuranceBlock';
import MedicalDegreeBlock from './components/blocks/medicalDegreeBlock/medicalDegree'
import LanguagesBlock from './components/blocks/languagesBlock/languagesBlock';

type contactPayloadT = {
	phone?: string
}
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type AccountEditProps = {
	isAuth: boolean,
	profile: KeycloakTokenParsed,
	fullProfile: FullProfileT,
	codeSended: boolean,
	codeValidated: boolean,
	profileUpdated: boolean,
	isLastPage: boolean,
	validationError: boolean,
	specialities: SpecialityT[],
	mySpecialities: MySpecialityT[],
	medicalDegrees: MedicalDegreeT[],
	myMedicalDegrees: MedicalDegreeT[],
	doctorsInsuranceCompanies: InsuranceCompanyT[],
	myLanguages: LanguageT[],
	appeals: AppealT[],
	address: string,
	languages: LanguageT[],
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

const AccountEdit: React.FC<AccountEditProps> = ({
	appeals,
	doctorsInsuranceCompanies,
	address: currentAddress,
	setContact = () => {},
	getAddress = () => {},
	getAppeals = () => {},
	getMyLanguages,
	updateMyLanguages,
	getLanguages,
	getProfile,
	specialities,
	updateBaseInfo,
	medicalDegrees,
	myMedicalDegrees,
	myLanguages,
	codeSended,
	languages = [],
	sendVerificationCode,
	validateCode,
	codeValidated,
	profileUpdated = false,
	validationError,
	fullProfile,
	editAddress,
	getSpecialities,
	showMySpecialities,
	mySpecialities,
	addSpecialities,
	removeSpeciality,
	isLastPage,
	getMedicalDegrees,
	getMyDegrees,
	addMyDegrees,
	removeMyDegrees,
	setDoctorsInsurance,
	getDoctorsInsurance,
	removeDoctorsInsuranceCompanies,
	clearToken
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
	const [appeal, setAppeal] = useState<number | string | null>(fullProfile.appeal!);
	const [currentProfileAddress, setCurrrentProfileAddress] = useState<string>('');
	const [firstName, setFirstName] = useState<string>(fullProfile.firstName!);
	const [lastName, setLastName] = useState<string>(fullProfile.lastName!);
	const [middleName, setMiddleName] = useState<string>(fullProfile.middleName!);
	const [birthDate, setBirthDate] = useState<string>(fullProfile.birthDate!);
	const [currentPhoneNumber, setCurrentPhoneNumber] = useState<string>(fullProfile.phone!);
	const [avatarUrl, setAvatarUrl] = useState<string>(fullProfile.avatarUrl!);
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
			birthDate: moment(birthDate, "YYYY/MM/DD").format("YYYY-MM-DD"),
			sex: selectedGender,
			appeal: appeal
		};
		updateBaseInfo(postData);
	}

	useEffect(() => {
		if (currentAddress) {
			setCurrrentProfileAddress(currentAddress);
			setAddress('');
			setLocations([]);
			setCurrentAddressPoint(currentAddress);
		}
	}, [currentAddress])

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
		if (middleNameError || lastNameError || firstNameError || birthDateError) {
			setHasErrors(true);
		} else {
			setHasErrors(false);
		}
	}, [middleName, lastName, firstName, birthDate])

	useEffect(() => {
		if (profileUpdated) {
			setToShowSuccessMessage(true);
			getProfile();
			const timeout = setTimeout(() => setToShowSuccessMessage(false), 3000);

			return () => clearTimeout(timeout);
		}
	}, [profileUpdated])

	useEffect(() => {
		getProfile();
		getAppeals()
		getAddress();
		showMySpecialities();
		getMedicalDegrees();
		getMyDegrees();
		getDoctorsInsurance();
		getMyLanguages();
	}, []);

	const handleMarkerClick = () => {
		window.open(`http://maps.google.com/?q=${currentProfileAddress}`, '_blank');
	};

	useEffect(() => {
		getProfile();
	}, [codeValidated])

	useEffect(() => {
		setFirstName(fullProfile.firstName!);
		setLastName(fullProfile.lastName!);
		setMiddleName(fullProfile.middleName!);
		setBirthDate(fullProfile.birthDate!);
		setCurrentPhoneNumber(fullProfile.phone!);
		setAvatarUrl(fullProfile.avatarUrl!);
		setAppeal(fullProfile.appeal!);
		setSelectedGender(capitalize(fullProfile.sex) as genderType);
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
			}
		} else {
			setBirthDateError('');
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
		<Container className='account-edit-layout'>
			<div className='nav-block'>
				<SimpleButton
					variant="contained"
					disableRipple={true}
					onClick={() => {
						setIsVerifyModalOpen(false);
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
					</TabList>
					<TabPanel className='tab-panel base-info-panel'>
						<div className='photo-block'>
							<div className='doctor-photo'>
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
										<option key={null} value=''></option>
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
								<div>
									<StyledTextField
										required
										onFocus={() => setIsFocused(true)}
										onBlur={() => setIsFocused(false)}
										focused={true}
										id="outlined-required"
										onChange={(event: React.ChangeEvent<unknown>) => {
											setBirthDate((event.target as HTMLInputElement).value);
											handleDateValidation((event.target as HTMLInputElement).value);
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
									<InsuranceBlock 
										setDoctorsInsurance={(value) => setDoctorsInsurance([Number(value)])}
										doctorsInsuranceCompanies={doctorsInsuranceCompanies}
										removeDoctorsInsuranceCompanies={removeDoctorsInsuranceCompanies}
									/>
								</div>
								<div>
									<MedicalDegreeBlock
										medicalDegrees={medicalDegrees}
										myMedicalDegrees={myMedicalDegrees}
										addMyDegrees={addMyDegrees}
										removeMyDegrees={removeMyDegrees}
									/>
								</div>
								<div>
									<SpecialityBlock
										getSpecialities={getSpecialities}
										specialities={specialities}
										isLastPage={isLastPage}
										mySpecialities={mySpecialities}
										removeSpeciality={removeSpeciality}
										clearToken={clearToken}
										setSpeciality={(value) => {
											const specIds = mySpecialities.map(spec => spec.id);
											addSpecialities([Number(value), ...specIds])
										}}
									/>
								</div>
								<div>
									<LanguagesBlock
										getLanguages={getLanguages}
										languages={languages}
										isLastPage={isLastPage}
										myLanguages={myLanguages}
										clearToken={clearToken}
										setLanguage={(value) => updateMyLanguages(value)}
									/>
								</div>
							</div>
						</div>
					</TabPanel>
					<TabPanel className='tab-panel phone-panel'>
						<PhoneBlock
							phoneNumber={phoneNumber}
							handlePhoneNumber={handlePhoneNumber}
							currentPhoneNumber={currentPhoneNumber}
							isPhoneValid={isPhoneValid}
						/>
					</TabPanel>
					<TabPanel className='tab-panel address-panel'>
						<div className='current-address'>
							<div>Current address</div>
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
								<div>
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
								renderInput={(params) => <TextField {...params} label="Start type the address" variant="outlined" />}
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
						codeSended={codeSended}
						codeValidated={codeValidated}
						validationError={validationError}
					/>
				</div>
			</StyledModal>
		</Container>
	);
};

const mapStateToProps  = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  profile: state.auth.profile,
  codeSended: state.profile.codeSended,
  codeValidated: state.profile.codeValidated,
  fullProfile: state.profile.fullProfile,
  address: state.profile.address,
  profileUpdated: state.profile.profileUpdated,
  specialities: state.dictionaries.specialities.data,
  languages: state.dictionaries.languages.data,
  scrollToken: state.dictionaries.specialities.scrollToken,
  isLastPage: state.dictionaries.specialities.isLastPage,
  validationError: state.profile.codeValidationError,
  appeals: state.dictionaries.appeals,
  mySpecialities: state.profile.mySpecialities,
  medicalDegrees: state.profile.medicalDegrees,
  myMedicalDegrees: state.profile.myMedicalDegrees,
  myLanguages: state.profile.languages,
  doctorsInsuranceCompanies: state.profile.doctorsInsuranceCompanies
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setContact: (data: contactPayloadT) => dispatch(setContactProfileRequest(data)),
	getAppeals: () => dispatch(getAppealsRequest()),
	validateCode: (data: number) => dispatch(validateCodeRequest(data)),
	sendVerificationCode: () => dispatch(sendVerificationCodeRequest()),
	editAddress: (data: string) => dispatch(editAddressProfileRequest(data)),
	updateBaseInfo: (data: Partial<BaseInfoT>) => dispatch(updateUserProfileRequest(data)),
	getProfile: () => dispatch(getProfileByTokenRequest()),
	getSpecialities: (data: string | undefined) => dispatch(getSpecialitiesRequest(data)),
	showMySpecialities: () => dispatch(showMySpecialitiesRequest()),
	addSpecialities: (data: number[]) => dispatch(addSpecialitiesRequest(data)),
	removeSpeciality: (data: number[]) => dispatch(removeSpecialityRequest(data)),
	getMedicalDegrees: () => dispatch(getMedicalDegreesRequest()),
	getMyDegrees: () => dispatch(getMyMedicalDegreesRequest()),
	removeMyDegrees: (data: number[]) => dispatch(removeMyMedicalDegreesRequest(data)),
	addMyDegrees: (data: number[]) => dispatch(addMyMedicalDegreesRequest(data)),
	setDoctorsInsurance: (data: number[]) => dispatch(setDoctorInsuranceRequest(data)),
	getDoctorsInsurance: () => dispatch(getDoctorInsuranceRequest()),
	removeDoctorsInsuranceCompanies: (data: number[]) => dispatch(deleteDoctorsInsuranceRequest(data)),
	getAddress: () => dispatch(getAddressProfileRequest()),
	clearToken: () => dispatch(clearScrollToken()),
	getLanguages: (data: string | undefined) => dispatch(getLanguagesRequest(data)),
	getMyLanguages: () => dispatch(getDoctorslanguagesRequest()),
	updateMyLanguages: (data: number[]) => dispatch(updateDoctorslanguagesRequest(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountEdit);
