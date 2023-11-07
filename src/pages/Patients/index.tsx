import React, {useEffect, useState} from 'react';
import { DispatchProp, connect } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import ReactPaginate from 'react-paginate';
import EtcIcon from 'images/Icons/etcIcon';
import Avatar from 'images/noPhoto.png';
import AppStateType from '../../redux/types';
import { getPatientsListRequest, setModalIsOpen } from '../../redux/modules/patients/actions/patients';
import AddUserForm from 'components/patient/AddUserBlock/AddUserForm';
import Loader from 'components/layout/Loader';
import {KeycloakTokenParsed, PatientT} from '../../types'
import {
	DetailsButton, StyledModal, StyledInput
} from './components';

import './patients.scss';
import { Dispatch } from '@reduxjs/toolkit';

const ITEMS_PER_PAGE = 10;

const Container = styled('div')({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between'
});
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type PatientsProps = {
	isAuth?: boolean,
	isModalOpen?: boolean,
	isLoading?: boolean,
	profile?: KeycloakTokenParsed,
	patients?: PatientT[] | undefined,
	search?: string,
} & DispatchProps;

type PaginatorClickEvent = {
    selected: number;
};

const Patients: React.FC<PatientsProps> = ({
	isAuth,
	isLoading,
	getList,
	patients: list = [],
	isModalOpen = false,
	openModal = () => {},
}) => {
	const [patients, setPatients] = useState<PatientT[]>([]);
	const [currentItems, setCurrentItems] = useState<PatientT[]>([]);
	const [itemOffset, setItemOffset] = useState(0);
	const [search, setSearch] = useState<string>();
	const navigate = useNavigate();

	useEffect(() => {
		if (getList) {
			getList();
		}
	}, [isAuth, getList])

	useEffect(() => {
		if (list.length) {
			setPatients(list);
		}
	}, [list])

	useEffect(() => {
		if (search) {
			setCurrentItems(currentItems.filter((item) => item?.name?.toUpperCase().includes(search.toUpperCase())));
		} else {
			const endOffset = itemOffset + ITEMS_PER_PAGE;
			const currentItems = patients.slice(itemOffset, endOffset);
			setCurrentItems(currentItems);
		}
	}, [itemOffset, patients, search]);

	const pageCount = Math.ceil(patients.length / ITEMS_PER_PAGE);
  
	const handlePageClick = (item: PaginatorClickEvent) => {
		const newOffset = (item.selected * ITEMS_PER_PAGE) % patients.length;
		setItemOffset(newOffset);
	};

	const handleSearchChange = (event: React.SyntheticEvent<EventTarget>) => {
		setSearch((event.target as HTMLInputElement).value)
	}

	return (
		<Container className='patients-layout'>
			<div className="list">
				<div>
					<div>Patients</div>
					<div>
						<StyledInput
							id="standard-search"
							label="Find patient"
							type="search"
							variant="standard"
							onChange={handleSearchChange}
						/>
					</div>
				</div>

				<div className='outerGrid'>
					<div className='tableGrid tableHeader'>
						<div>ID</div>
						<div>Full Name</div>
						<div>Date of Birth</div>
						<div>Sex</div>
						<div>Role</div>
						<div></div>
					</div>
					{
						isLoading ? (
							<Loader height='500px' />
						) : (
						currentItems.map((item) => {
							const {name, id, birthdate, sex, photo} = item;
							return (
								<div className='tableGrid tableBody' key={id}>
									<div>{id}</div>
									<div className="avatar">
										<div className='image'>
											<img width='48px' height='48px' src={photo || Avatar} alt='' />
										</div>
										<div className='full-name'>
											<Typography color="textPrimary">
												{name}
											</Typography>
										</div>
									</div>
									<div>{birthdate}</div>
									<div>{sex}</div>
									<div className='role'>patient</div>
									<div>
										<DetailsButton
											disableRipple={true}
											onClick={() => navigate(`/patients/${id}`, { state: id })}
										>
											<EtcIcon />
										</DetailsButton>
									</div>
								</div>
							)
						})
					)}
				</div>
				<div className='paginationBlock'>
					{
						currentItems.length && !isLoading && (
							<ReactPaginate
								nextLabel=">"
								onPageChange={handlePageClick}
								pageRangeDisplayed={3}
								marginPagesDisplayed={2}
								pageCount={pageCount}
								previousLabel="<"
								pageClassName="page-item"
								pageLinkClassName="page-link"
								previousClassName="page-item"
								previousLinkClassName="page-link prev"
								disabledClassName="page-link-disabled"
								nextClassName="page-item"
								nextLinkClassName="page-link next"
								breakLabel="..."
								breakClassName="page-item"
								breakLinkClassName="page-link"
								containerClassName="pagination"
								activeClassName="active"
								renderOnZeroPageCount={null}
							/>
						)
					}
				</div>
			</div>
			<StyledModal
				keepMounted
				disablePortal
				aria-labelledby="unstyled-modal-title"
				aria-describedby="unstyled-modal-description"
				open={isModalOpen}
				onClose={() => openModal(false)}
			>
				<div>
					<AddUserForm />
				</div>
			</StyledModal>
		</Container>
	);
};

const mapStateToProps = (state: AppStateType) => ({
	isAuth: state.auth.isAuth,
	profile: state.auth.profile,
	patients: state.patients.list,
	isLoading: state.patients.isLoading,
	isModalOpen: state.patients.isModalOpen
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getList: () => dispatch(getPatientsListRequest()),
	openModal: (data: boolean) => dispatch(setModalIsOpen(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
