import React, {useState, useEffect} from 'react';
import { styled } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppStateType from '../../redux/types';
import Button from '@material-ui/core/Button';
import EditIcon from 'images/Icons/editIcon';
import DeleteIcon from 'images/Icons/deleteUserIcon';

import {CreateButtonStyles} from 'components/controls/buttons';
export const ButtonStyles = {
	width: '113px',
	height: '34px',
	padding: '8px 16px 8px 16px',
	borderRadius: '8px',
};
import ArrowLeftIcon from '../../images/Icons/arrowLeftIcon';
import Modal from '@material-ui/core/Modal';
import Loader from '../../components/layout/Loader';
import { EmergencyTypeDataT, EmergencyContactT, EmergencyContactItemT } from 'types';
import {
	getEmergencyContactRequest,
	getOneEmergencyContactRequest,
	setEmergencyContactRequest,
	getEmergencyTypesRequest,
	deleteEmergencyContactRequest,
	updateEmergencyContactRequest
} from 'redux/modules/emergency/actions/emergency';

import { SimpleButton } from 'components/controls/buttons';
export const StyledModal = styled(Modal)({
	position: 'fixed',
	width: '200px',
	height: '200px',
	top: '50vw'
});
import EditForm from './editForm';
import { maskedPhone } from '../../utils/constants' 
import './patientEmergencyContact.scss';
import { Dispatch } from '@reduxjs/toolkit';


const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
});

const StyledButton = styled(Button)({
	border: 'none',
	width: '140px',
	height: '40px',
	minWidth: '24px',
	padding: '0',
	'&:hover': {
		backgroundColor: '#ffffff',
	}
});
const CancelButtonStyles = {
	backgroundColor: '#FFFFFF',
	color: 'rgba(44, 121, 206, 1)',
	padding: '5px 10px',
	'&:hover': {
		backgroundColor: '#FFFFFF',
	}
}
const SaveChangesButtonStyles = {
	backgroundColor: 'rgba(44, 121, 206, 1)',
	color: '#FFFFFF',
	borderColor: 'rgba(44, 121, 206, 1)',
	padding: '5px 10px',
	'&:hover': {
		backgroundColor: 'rgba(44, 121, 206, 1)',
	}
}
const CommonStyles = {
	width: '170px',
	height: '40px',
	padding: '12px 24px 12px 24px',
	borderRadius: '8px',
	border: '1px solid',
	fontFamily: 'Manrope',
	fontSize: '16px',
	fontWeight: 500,
	lineHeight: '20px'
}

const OutlineButton = styled(Button)(Object.assign(CancelButtonStyles, CommonStyles));
const SaveChangesButton = styled(Button)(Object.assign(SaveChangesButtonStyles, CommonStyles));
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type PatientEmergencyContactPageProps = {
	contacts: EmergencyContactItemT[];
	types: EmergencyTypeDataT,
	currentContact: EmergencyContactItemT,
	isLoading: boolean;
} & DispatchProps;

const SaveButton = styled(Button)(Object.assign({}, {...CreateButtonStyles, ...ButtonStyles}, {width: '185px', height: '40px'}));
const PatientEmergencyContactPage: React.FC<PatientEmergencyContactPageProps> = ({
	contacts,
	types,
	isLoading,
	currentContact: oneContact,
	getContact = () => {},
	getOneContact = () => {},
	setContact = () => {},
	deleteContact = () => {},
	updateContact = () => {},
	getEmergencyTypes,
}) => {
	const [isEmegencyFormOpen, setIsEmegencyFormOpen] = useState<boolean>(false);
	const [currentContact, setCurrentContact] = useState<EmergencyContactItemT>();
	const [currentList, setCurrentList] = useState<EmergencyContactItemT[]>();
	const [currentId, setCurrentId] = useState<number | undefined>();
	const [currentName, setCurrentName] = useState<string>('');
	const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (contacts.length) {
			setCurrentList(contacts);
			setIsEmegencyFormOpen(false);
			setCurrentContact(undefined);
			setCurrentId(undefined);
			setCurrentName('');
		}
	}, [contacts]);

	useEffect(() => {
		getContact();
		getEmergencyTypes();
		setCurrentContact(undefined);
		setCurrentId(undefined);
	}, []);

	useEffect(() => {
		if (oneContact) {
			setCurrentContact(oneContact)
		}
	}, [oneContact])

	const handleSetContact = (data: EmergencyContactT) => {
		setContact(data);
	}
	const handleUpdateContact = (data: EmergencyContactT, id: number) => {
		updateContact({data, id});
	}

	const handleDeletetdata = (contact: EmergencyContactItemT) => {
		setCurrentId(contact?.id as number);
		setCurrentName(contact?.fullName)
		setDeleteDialogOpen(true);
	}

	const handleEditData = (contact: EmergencyContactItemT) => {
		setCurrentId(contact?.id as number);
		getOneContact(contact?.id as number);
		setIsEmegencyFormOpen(true);
	}
	
	return (
		<Container className='contact-layout'>
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
			<div className='base-block'>
				<div>Emergency Contacts</div>

				<div>
					<SaveButton
						disableRipple={true}
						onClick={() => {
							setIsEmegencyFormOpen(true);
							setCurrentContact(undefined);
						}}
					>
						Add contact
					</SaveButton>
				</div>
				<div className='contacts-list'>
					<ul>
						{
							currentList?.length && contacts.map((contact: EmergencyContactItemT) => {
								return (
									<li>
										<div className='contact-item'>
											<div>{`${contact.fullName} (${contact.type.name})`}</div>
											<div className='phone-block'>
												<div>Phone:</div>
												<div>
													{
														maskedPhone(contact.phone, '+#(###) ### - ### - #')
													}
												</div> 
											</div>
										</div>
										<div className='controls-block'>
												<div>
													<StyledButton
														disableRipple={true}
														variant="outlined"
														onClick={() => handleEditData(contact)}
													>
														<div className='inside-button'>
															<EditIcon />
															<div>{'Edit contact'}</div>
														</div>
													</StyledButton>
												</div>
												<div>
													<StyledButton
														disableRipple={true}
														variant="outlined"
														onClick={() => {
															handleDeletetdata(contact)
														}}
													>
														<div className='inside-button'>
															<DeleteIcon />
															<div>{'Delete contact'}</div>
														</div>
													</StyledButton>
												</div>
										</div>
									</li>
								);
							})
						}
					</ul>
				</div>

			</div>
			<StyledModal
				keepMounted
				disablePortal
				aria-labelledby="unstyled-modal-title"
				aria-describedby="unstyled-modal-description"
				open={isLoading}
			>
				<Loader height='600px' />
			</StyledModal>
			<StyledModal
				keepMounted
				disablePortal
				aria-labelledby="unstyled-modal-title"
				aria-describedby="unstyled-modal-description"
				open={deleteDialogOpen}
				onClick={() => setDeleteDialogOpen(false)}
			>
				<div className='delete-contact-form-layout'>
					<div className='delete-dialog-block'>
						<div>{`Delete contact ${currentName} ?`}</div>
						<div className='save-changes-block'>
							<div>
								<OutlineButton disableRipple={true}  onClick={() => setDeleteDialogOpen(false)}>
									No
								</OutlineButton>
							</div>
							<div>
								<SaveChangesButton
									disableRipple={true}
									onClick={() => deleteContact(currentId as number)}
								>
									Yes
								</SaveChangesButton>
							</div>
						</div>
					</div>
				</div>
			</StyledModal>
			<StyledModal
				keepMounted
				disablePortal
				aria-labelledby="unstyled-modal-title"
				aria-describedby="unstyled-modal-description"
				open={isEmegencyFormOpen}
				onClose={() => {
					setIsEmegencyFormOpen(false);
					setCurrentContact(undefined);
					setCurrentId(undefined);
				}}
			>
				<div>
					<EditForm
						types={types}
						isLoading={isLoading}
						currentContact={currentContact}
						id={currentId}
						contactsLength={contacts.length}
						handleSetContact={handleSetContact}
						handleUpdateContact={handleUpdateContact}
						handleCloseModal={() => {
							setIsEmegencyFormOpen(false);
							setCurrentContact(undefined);
							setCurrentId(undefined);
						}}
					/>
				</div>
			</StyledModal>
		</Container>
	);
};

const mapStateToProps  = (state: AppStateType) => ({
  isLoading: state.emergency.isLoading,
  contacts: state.emergency.contacts,
  types: state.emergency.types,
  currentContact: state.emergency.currentContact
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getContact: () => dispatch(getEmergencyContactRequest()),
	getOneContact: (id: number) => dispatch(getOneEmergencyContactRequest(id)),
	setContact: (data: EmergencyContactT) => dispatch(setEmergencyContactRequest(data)),
	deleteContact: (id: number) => dispatch(deleteEmergencyContactRequest(id)),
	getEmergencyTypes: () => dispatch(getEmergencyTypesRequest()),
	updateContact: (putData: {data: EmergencyContactT, id: number}) => dispatch(updateEmergencyContactRequest(putData))
})

export default connect(mapStateToProps, mapDispatchToProps)(PatientEmergencyContactPage);