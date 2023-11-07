import React, {useState, useEffect, useRef, FC} from 'react';
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DispatchProp, connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import AppStateType from '../../../redux/types';
import Avatar from '@material-ui/core/Avatar';
import { ActionWithAnyProp, CurrentInsuranceT, UploadFileT } from '../../../types';
import Loader from 'components/layout/Loader';
import SuccessIcon from '../../../images/Icons/successIcon';
import FailedIcon from '../../../images/Icons/failedIcon';
import AddFileIcon from '../../../images/Icons/addFileIcon';
import InfiniteLoaderBlock from 'components/inputs/InFiniteLoader';
import { TextFieldStyles } from '../../../components/controls/textfields';
import { DispatchPropT, DictionaryT, InsuranceCompanyT, SelectedAttachmentT } from '../../../types';
import { StyledAutocompleteRoot, StyledInput } from 'components/controls/textfields';
import { setUploadAttachmentRequest } from '../../../redux/modules/attachments/actions/attachments';
import {
	setInsuranceRequest,
	setInsuranceUpdated,
	updatePatientInsuranceRequest
} from 'redux/modules/profile/actions/profile';

import { useStyles, CommonCancelButton,  CancelButtonStyles, SaveChangesButtonStyles, CommonStyles, StyledButton } from './blocks';
import './insuranceBlock.scss';

const CancelEditionButton = styled(Button)(Object.assign(CancelButtonStyles, CommonStyles));
const SaveChangesButton = styled(Button)(Object.assign(SaveChangesButtonStyles, CommonStyles));

const Container = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	rowGap: '32px',
	justifyContent: 'space-between'
});

export const StyledTextField = styled(TextField)(Object.assign(TextFieldStyles, {width: '100%'}));
export const CancelButton = styled(Button)(Object.assign({color: 'rgba(255, 84, 74, 1)'}, CommonCancelButton));
export const DatesButton = styled(Button)({
	backgroundColor: 'transparent',
	padding: 0,
});

const requiredMessage = 'This data is required';

type InsuranceCreationT = {
	id?: number,
	number: string | undefined,
	organizationId: string | undefined,
	attachmentId?: string | undefined
}
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type InsuranceWindowT = {
	currentId?: number,
	currentOrganizationName?: string,
	currentOrganizationId?: number,
	currentNumber?: string,
	currentPicture?: string,
	scheduleCreated?: boolean,
	isScheduleCreationLoading?: boolean,
	insuranceUpdated?: boolean,
	error?: Error | string,
	selectedAttachment?: SelectedAttachmentT,
	companies: DictionaryT<InsuranceCompanyT>,
	getCompanies: (arg: string | undefined) => ActionWithAnyProp,
	closeModal?: () => void,
	setCompany: (arg: number) => void,
	updateInsurance: (data: InsuranceCreationT) => void
} & DispatchProps;

const InsuranceWindow: React.FC<InsuranceWindowT> = ({
	error = '',
	currentId,
	currentOrganizationName,
	currentOrganizationId,
	currentNumber,
	currentPicture,
	companies,
	selectedAttachment,
	insuranceUpdated,
	setUpdated,
	closeModal = () => {},
	getCompanies,
	uploadPhoto,
	setInsurance = () => {},
	updateInsurance
}) => {
	const classes = useStyles();
	const [items, setItems] = useState<InsuranceCompanyT[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [apiError, setApiError] = useState<Error | string>('');
	const [saveHandler, setSaveHandler] = useState<boolean>(false);
	const [insuranceNumber, setInsuranceNumber] = useState<string | undefined>(currentNumber);
	const [insuranceCompany, setInsuranceCompany] = useState<number | undefined>(currentOrganizationId);
	const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
	const [hasNextPage, setHasNextPage] = useState<boolean>(false);
	const [attachmentId, setAttachmentId] = useState<number>();
	const [files, setFiles] = useState<any>([]);

	const hiddenFileInput = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (insuranceUpdated) {
			const timeout = setTimeout(() => {
				setUpdated(false);
				setFiles([]);
				closeModal();
			}, 3000);

			return () => clearTimeout(timeout);
		}
	}, [insuranceUpdated])

	const handleFileUpload = () => {
		if (hiddenFileInput.current) {
			hiddenFileInput.current.click();
		}
	}

	const handleClick = (event: any) => {
		const file = URL.createObjectURL(event.target.files[0]);
		files.push(file);
		setFiles(files);
		uploadPhoto(event.target.files[0]);
	}

	useEffect(() => {
		if (selectedAttachment?.id) {
			setAttachmentId(selectedAttachment.id);
		}
	}, [selectedAttachment])

	useEffect(() => {
		setApiError(error);
	}, [error])

	useEffect(() => {
		if (apiError) {
			const timeout = setTimeout(() => {
				setApiError('');
			}, 3000);

			return () => clearTimeout(timeout);
		}
	}, [apiError]);

	const handleSaveInsurance = () => {
		setSaveHandler(true);
		const fieldsValid = insuranceCompany;
		if (fieldsValid) {
			const payload = {
				number: insuranceNumber?.toString(),
				organizationId: insuranceCompany?.toString()
			}
			if (attachmentId?.toString()) {
				Object.assign(payload, {attachmentId: attachmentId?.toString()})
			}
			if (currentId) {
				updateInsurance(Object.assign({}, payload, {id: currentId}) )
			} else {
				setInsurance(payload);
			}
		}
	}

	const loadNextPage = async (...args: any) => {
		try{
			getCompanies(undefined);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSlect = (arg: number) => {
		setInsuranceCompany(arg)
	}

	useEffect(() => {
		setItems(companies.data! || [])
		setIsNextPageLoading(false);
	}, [companies]);

	useEffect(() => {
		setHasNextPage(!companies.isLastPage);
	}, [companies])

	useEffect(() => {
		getCompanies(undefined);
	}, []);

	const {
		getRootProps,
		getInputProps,
		getListboxProps,
		getOptionProps,
		groupedOptions,
		focused
	} = useAutocomplete({
		id: "use-autocomplete-demo",
		options: items,
		getOptionLabel: option => option.name
	});
	
	useEffect(() => {
		if (items?.length === 0) {
			loadNextPage();
		}
	}, [items]);

	const handleCloseModal = () => {
		closeModal();
		setFiles([]);
	}

	const inputProps = Object.assign({}, {...getInputProps()});

	return (
		<>
			{
				isLoading ? (
					<Container className='schedule-form-layout'>
						<div className='schedule-base-block loading'>
							<Loader height='500px' />
						</div>
					</Container>
				) : (
						<Container className='insurance-form-layout'>
							{
								insuranceUpdated ? (
									<div className='success-message'>
										<div>Data successfully updated!</div>
										<div><SuccessIcon /></div>
									</div>
								) : (
										<>
											<div className='insurance-base-block'>
												<div>
													{
														apiError && (
															<div className='success-message'>
																<div>{apiError}</div>
																<div><FailedIcon /></div>
															</div>
														)
													}
												</div>
												<div className='title'>
													Add Insurance
												</div>
												<div className='fields-block'>
													<div>
														{
															currentOrganizationName && (
																<div className='current title'>{currentOrganizationName}</div>
															)
														}
														<div className='insurance-companies-loader'>
															<StyledAutocompleteRoot
																{...getRootProps()}
																className={!focused ? 'focused' : undefined}
															>
																<StyledInput
																	{...inputProps}
																	// value={search}
																	//onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
																/>
															</StyledAutocompleteRoot>
															<label htmlFor="insurance">Start typing company name</label>

															{groupedOptions.length > 0 ? (
																<InfiniteLoaderBlock
																	hasNextPage={hasNextPage}
																	isNextPageLoading={isNextPageLoading}
																	items={items}
																	loadNextPage={loadNextPage}
																	wrapperClassName={classes.listbox}
																	getOptionProps={getOptionProps}
																	groupedOptions={groupedOptions}
																	listboxProps={getListboxProps()}
																	handleSelect={handleSlect}
																/>
															) : null}
														</div>
														<div className='errorBlock'>
															{saveHandler && !insuranceCompany && requiredMessage}
														</div>
													</div>
													<div>
														{
															currentNumber && (
																<div className='current number'>{currentNumber}</div>
															)
														}
														<div>
															<StyledTextField
																required
																id="outlined-required"
																value={insuranceNumber}
																focused={!!insuranceNumber}
																label="Insurance Number"
																variant="outlined"
																onChange={(event: React.ChangeEvent<unknown>) => {
																	setInsuranceNumber((event.target as HTMLInputElement).value)
																}}
															/>
														</div>
														<div className='errorBlock'>
															{saveHandler && !insuranceNumber && requiredMessage}
														</div>
													</div>
													<div className="gallery">
														{
															currentPicture && (
																<div className='current attachment'>
																	<Avatar
																		src={currentPicture}
																		alt="Preview"
																		className="img-preview"
																	/>
																</div>
															)
														}
														{files.map((file: any, index: number) => (
															<div className='photo-item' key={index}>
																<img
																	width='64px'
																	height='64px'
																	key={index}
																	src={file}
																	alt="Preview"
																	className="img-preview"
																/>
															</div>
														))}
													</div>
													<div className='file-upload'>
														<StyledButton
															onClick={handleFileUpload}
															disableRipple={true}
														>
																<AddFileIcon />
																Upload insurance photo
														</StyledButton>
														<input
															ref={hiddenFileInput}
															type='file'
															onChange={handleClick}
														/>
													</div>
												</div>
											</div>
											<div className='save-changes-block'>
												<div>
													<CancelEditionButton disableRipple={true}  onClick={handleCloseModal}>
														Cancel
													</CancelEditionButton>
												</div>
												<div>
													<SaveChangesButton
														disableRipple={true}
														onClick={handleSaveInsurance}
													>
														Save
													</SaveChangesButton>
												</div>
											</div>
										</>
								)
							}
						</Container>
					)
			}
		</>


	);
}

const mapStateToProps  = (state: AppStateType) => ({
	selectedAttachment: state.attachments.selectedAttachment,
	insuranceUpdated: state.profile.insuranceUpdated,
	error: state.profile.error
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	uploadPhoto: (data: UploadFileT | any) => dispatch(setUploadAttachmentRequest(data)),
	setInsurance: (data: InsuranceCreationT) => dispatch(setInsuranceRequest(data)),
	setUpdated: (data: boolean) => dispatch(setInsuranceUpdated(data)),
	updateInsurance: (data: InsuranceCreationT) => dispatch(updatePatientInsuranceRequest(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(InsuranceWindow);