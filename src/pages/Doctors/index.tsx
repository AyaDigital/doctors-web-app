import React, {useEffect, useState} from 'react';
import { connect, DispatchProp } from 'react-redux';
import get from 'lodash/get';
import ReactPaginate from 'react-paginate';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import MapBlock from '../../components/map/map';
import AppStateType from '../../redux/types';
import { DoctorT } from '../../types';
import {getDoctorsListRequest} from '../../redux/modules/doctors/actions/doctors';
import './doctorsPage.scss';
import { Dispatch } from '@reduxjs/toolkit';

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type DoctorsForAppointmentProps = {
  isAuth: boolean,
  doctorsList: DoctorT[],
  totalResults: number
} & DispatchProps;

export const DetailsButton = styled(Button)({
	backgroundColor: 'rgba(245, 250, 255, 1)',
	width: '135px',
	height: '44px',
	padding: '12px 24px 12px 24px',
	borderRadius: '8px',
	border: '1px solid',
	borderColor: 'rgba(44, 121, 206, 1)',
	color: 'rgba(44, 121, 206, 1)',
	disableRipple: 'true',
	'&:hover': {
		backgroundColor: 'rgba(245, 250, 255, 1)',
	}
});
type PaginatorClickEvent = {
    selected: number;
};

const ITEMS_PER_PAGE = 10;

const DoctorsForAppointment: React.FC<DoctorsForAppointmentProps> = ({
	doctorsList,
	getDoctorsList
}) => {
	const navigate = useNavigate();
	const [itemOffset, setItemOffset] = useState(0);
	const [currentItems, setCurrentItems] = useState<DoctorT[]>([]);

	useEffect(() => {
		getDoctorsList()
	}, []);

	const pageCount = Math.ceil(doctorsList.length / ITEMS_PER_PAGE);

	useEffect(() => {
		const endOffset = itemOffset + ITEMS_PER_PAGE;

		const currentItems = doctorsList.slice(itemOffset, endOffset);
		setCurrentItems(currentItems);

	}, [itemOffset, doctorsList]);

	const handlePageClick = (item: PaginatorClickEvent) => {
		const newOffset = (item.selected * ITEMS_PER_PAGE) % doctorsList.length;
		setItemOffset(newOffset);
	};

	return (
		<div className="doctors-page-layout">
			<div>
				<div>
				{
					currentItems.map(({firstName, lastName, specialities, id, photo}) => {
						return (
							<div className='doctors-block' key={id}>
								<div className='image'>
									<img src={photo} alt='' />
								</div>
								<div>
									<div>Therapist</div>
									<div>{`${firstName} ${lastName}`}</div>
									<div className='specialities'>{get(specialities, '[0]name', '')}</div>
								</div>
								<div>
									<DetailsButton
										disableRipple={true}
										onClick={() => navigate(`/doctors/${id}`, { state: id })}
									>
										View profile
									</DetailsButton>
								</div>
							</div>
						)
					})

				}
				</div>
				<div className='paginationBlock'>
					{
						doctorsList.length ? (
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
						) : null
					}
				</div>
			</div>
            <div className='map-block'>
                <MapBlock
					zoom={4}
					markers={doctorsList.length ? doctorsList.map(item => {
						return {
							lat: item.location?.lat,
							lng: item.location?.long,
							content: item.photo,
							text: `${item.firstName} ${item.lastName}`,
							action: () => navigate(`/doctors/${item.id}`, { state: item.id })
						}
					}) : undefined}
                    style={{
                        width: '100%',
                        height: '856px',
                        borderRadius: '16px',
                        border: '1px' 
                    }}
                />
            </div>
		</div>
	);
};

const mapStateToProps  = (state: AppStateType) => ({
	isAuth: state.auth.isAuth,
	doctorsList: state.doctors.list,
	totalResults: state.doctors.totalResults
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getDoctorsList: () => dispatch(getDoctorsListRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(DoctorsForAppointment);
