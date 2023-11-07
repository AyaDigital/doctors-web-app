import React, {useState, useEffect} from "react";
import {connect} from 'react-redux';
import moment, { Moment } from 'moment';
import { useNavigate } from 'react-router-dom';
import AppStateType from '../../redux/types';
import Button from '@material-ui/core/Button';
import Avatar from '../../images/noPhoto.png';
import ArrowUpRightIcon from '../../images/Icons/arrowUpRightIcon';
import { CommonStyles } from 'components/controls/buttons';
import { AppointmentT, ParticipantT } from '../../types'
import {
	getPatientAppointmentsByPeriodRequest,
	getCancelledAppointmentsRequest
} from '../../redux/modules/patients/actions/patients';
import { Dispatch } from '@reduxjs/toolkit';
import { styled } from '@material-ui/core/styles';
import './patientAppointmets.scss';
import HardwareKeyboardArrowUp from "material-ui/svg-icons/hardware/keyboard-arrow-up";

type PatientAppointmentPropsT = {
	getAppointments: () => void,
	getCancelledAppointments: () => void,
	appointments: AppointmentT[],
	cancelledAppointments: AppointmentT[]
};

const Container = styled('div')({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between'
});

export const NavButton = styled(Button)(Object.assign({color: 'rgba(60, 60, 67, 0.6)'}, CommonStyles, {width: 'auto'}));

const PatientAppointments: React.FC<PatientAppointmentPropsT> = ({
	appointments,
	cancelledAppointments,
	getAppointments,
	getCancelledAppointments
}) => {
	const [appointmentsList, setAppointmentList] = useState<AppointmentT[]>([]);
	const [selectedTab, setSelectedTab] = useState('planned');
	const navigate = useNavigate();

	useEffect(() => {
		if (selectedTab === 'cancelled') {
			setAppointmentList(cancelledAppointments);
		} else {
			const filtered = appointments.filter((item: AppointmentT) => {
				return selectedTab === 'planned'
					? moment(item.startDate).isSameOrAfter(moment())
					: moment(item.endDate).isBefore(moment())
			});
			setAppointmentList(filtered);
		}
	}, [appointments, cancelledAppointments, selectedTab]);

	useEffect(() => {
		getAppointments();
		getCancelledAppointments();
	}, []);

	return (
		<Container className="appointments-layout">
			<div className="title">Appointments</div>
			<div className="content-block">
				<div className="tabs-block">
					<div
						className={`planned ${selectedTab === 'planned' ? 'selected' : ''}`}
						onClick={() => setSelectedTab('planned')}
					>
						Planned
					</div>
					<div
						className={`past ${selectedTab === 'past' ? 'selected' : ''}`}
						onClick={() => setSelectedTab('past')}
					>
						Past
					</div>
					<div
						className={`cancelled ${selectedTab === 'cancelled' ? 'selected' : ''}`}
						onClick={() => setSelectedTab('cancelled')}
					>
						Cancelled
					</div>
				</div>
				<div className="list-block">
					{
						appointmentsList.map((item: AppointmentT, index: number) => {
							const {firstname, lastname, photo, id} = item.participant;
							return (
								<div className="one-appointment" key={index}>
									<div className="avatar">
										<img width="80px" height="80px" src={photo || Avatar} alt='' />
									</div>
									<div className="description">
										<div>Therapist</div>
										<div className="full-name-block">
											<NavButton
												variant="contained"
												disableRipple={true}
												onClick={() => {
													navigate(`/doctors/${id}`);
												}}
											>
											<div className="button-label">
												<div> {`${firstname} ${lastname}`}</div>
												<ArrowUpRightIcon />
											</div>
											</NavButton>
										</div>
										<div>{moment(item.startDate).format('lll')}</div>
									</div>
									<div className='status-block'>
										<div>{item.type}</div>
									</div>
									<div className={`status-block ${item.status === 'cancelled' ? 'cancelled' : ''}`}>
										<div onClick={() => navigate(`/patient-appointments/${item.id}`)}>{item.status}</div>
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		</Container>
	)
}


const mapStateToProps = (state: AppStateType) => ({
	appointments: state.patients.appointments,
	cancelledAppointments: state.patients.cancelledAppointments
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getAppointments: () => dispatch(getPatientAppointmentsByPeriodRequest()),
	getCancelledAppointments: () => dispatch(getCancelledAppointmentsRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(PatientAppointments);