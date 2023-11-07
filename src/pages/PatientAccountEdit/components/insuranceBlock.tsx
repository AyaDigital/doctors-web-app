import React, {useState} from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from 'images/Icons/addFileIcon';
import EditIcon from 'images/Icons/editIcon';
import DeleteIcon from 'images/Icons/deleteUserIcon';
import { StyledModal } from './common';
import InsuranceWindow from './insuranceContent';
import { DictionaryT, InsuranceCompanyT, ActionWithAnyProp, CurrentInsuranceT } from 'types';
import './insuranceBlock.scss';

type InsuranceBlockProps = {
	insuranceCompany?: string,
	insuranceNumber?: string,
	attachment?: string,
	currentInsurance?: CurrentInsuranceT[];
	companies: DictionaryT<InsuranceCompanyT>,
	getCompanies:  (arg: string | undefined) => ActionWithAnyProp,
	setCompany: (arg: number) => void,
	deleteInsurance: (arg?: number) => void,
};
const StyledButton = styled(Button)({
	border: 'none',
	width: '140px',
	height: '50px',
	minWidth: '24px',
	padding: '0',
	'&:hover': {
		backgroundColor: '#ffffff',
	}
});

const InsuranceBlock: React.FC<InsuranceBlockProps> = ({
	getCompanies,
	setCompany,
	deleteInsurance,
	companies,
	currentInsurance
}) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [currentId, setCurrentId] = useState<number>();
	const [currentOrganizationName, setCurrentOrganizationName] = useState<string>();
	const [currentOrganizationId, setCurrentOrganizationId] = useState<number>();
	const [currentNumber, setCurrentNumber] = useState<string>();
	const [currentPicture, setCurrentPicture] = useState<string>();

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setCurrentOrganizationName('');
		setCurrentNumber('');
		setCurrentId(undefined);
		setCurrentPicture('');
	}

	return (
		<div className='insurence-common'>
			<div className='current-company-list'>
				{
					currentInsurance?.length ? (
						currentInsurance.map(({organizationName, number, fullUrl, id, organizationId}) => {
							return (
								<div className='current-company-info' key={id}>
									<div className='title'>{organizationName}</div>
									<div className='current-company-base-info'>
										<div>
											
											<div className='member-id'>
												<div>Member ID</div>
												<div>{number}</div>
											</div>
											<div className='attachment'>
												<Avatar
													src={fullUrl}
													alt="Preview"
													className="img-preview"
												/>
											</div>
										</div>
										<div className='controls-block'>
												<div>
													<StyledButton
														disableRipple={true}
														variant="outlined"
														onClick={() => {
															setCurrentId(id);
															setIsModalOpen(!isModalOpen);
															setCurrentOrganizationName(organizationName);
															setCurrentNumber(number);
															setCurrentPicture(fullUrl);
															setCurrentOrganizationId(organizationId);
														}}
													>
														<div className='inside-button'>
															<EditIcon />
															<div>{'Edit insurance'}</div>
														</div>
													</StyledButton>
												</div>
												<div>
													<StyledButton
														disableRipple={true}
														variant="outlined"
														onClick={() => deleteInsurance(id)}
													>
														<div className='inside-button'>
															<DeleteIcon />
															<div>{'Delete insurance'}</div>
														</div>
													</StyledButton>
												</div>
										</div>
									</div>
								</div>
							)
						})
					) : null
				}

					<div className='edit'>
						<div>
							<StyledButton
								disableRipple={true}
								variant="outlined"
								onClick={() => setIsModalOpen(!isModalOpen)}
							>
								<AddIcon />
								<div>{'Add insurance'}</div>
							</StyledButton>
						</div>
					</div>
			</div>
			<StyledModal
				keepMounted
				disablePortal
				aria-labelledby="unstyled-modal-title"
				aria-describedby="unstyled-modal-description"
				open={isModalOpen}
				onClose={() => handleCloseModal()}
			>
				<InsuranceWindow
					currentId={currentId}
					currentOrganizationName={currentOrganizationName}
					currentNumber={currentNumber}
					currentPicture={currentPicture}
					currentOrganizationId={currentOrganizationId}
					getCompanies={getCompanies}
					companies={companies}
					setCompany={setCompany}
					closeModal={() => handleCloseModal()}
				/>
			</StyledModal>
		</div>
	)
};

export default InsuranceBlock;