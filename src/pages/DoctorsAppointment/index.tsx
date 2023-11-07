import React, {useState, useEffect} from 'react';
import moment, { Moment } from 'moment';
import 'rc-select/assets/index.less';
import { DispatchProp, connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Loader from '../../components/layout/Loader';
import { CalendarBlock as Calendar } from '../../components/calendar/calendar';
import { SimpleButton } from '../../components/controls/buttons';
import AppointmentIcon from '../../images/Icons/appointmentsIcon';
import ScheduleIcon from '../../images/Icons/scheduleIcon';
import CancellationIcon from '../../images/Icons/cancellationIcon';
import ActiveSwitcherIcon from 'images/Icons/activeSwitcherIcon';
import UnactiveSwitcherIcon from 'images/Icons/unactiveSwitcherIcon';
import AppStateType from '../../redux/types';
import { SlotItemT, SlotsCountItemT, AppointmentT, SlotsCountRequestPayloadT } from '../../types';
import { getDoctorsAppointmentsRequest, getDoctorSlotsRequest } from '../../redux/modules/doctors/actions/doctors';
import { getProfileByTokenRequest } from '../../redux/modules/profile/actions/profile';
import { getCountSlotsRequest, deleteScheduleRequest, clearErrorStatus, getCancelledAppointmentsRequest } from '../../redux/modules/schedule/actions/schedule';

import './doctorsAppointments.scss';
import { Dispatch } from '@reduxjs/toolkit';

type slotPeriodT = {
	startDate?: string,
	endDate?: string,
	id?: number
};

type scheduleDataT = {
	selectedDate?: string,
	scheduleId?: number
};

type groupedSlotsT = {[key: string]: number} | undefined;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type DoctorsForAppointmentProps = {
  isAuth: boolean,
  isScheduleLoading: boolean,
  error: string,
  slots: SlotsCountItemT[],
  daySlots?: SlotItemT[],
  doctorId?: number,
  appointments?: AppointmentT[],
  cancelledAppointments?: AppointmentT[] 
} & DispatchProps;

export const DatesButton = styled(Button)({
	backgroundColor: 'transparent',
	padding: 0,
	'&:hover': {
		backgroundColor: 'white',
	}
});

enum modeType {
	time = 'time',
	date = 'date',
	month = 'month',
	year = 'year',
	decade = 'decade'
  }

const DoctorsAppointment: React.FC<DoctorsForAppointmentProps> = ({
	slots,
	error,
	doctorId,
	daySlots = [],
	appointments = [],
	cancelledAppointments = [],
	isScheduleLoading,
	getAppointments,
	getProfile,
	getCountSlots,
	getDoctorSlots,
	deleteSchedule,
	getCancelled,
	clearError
}) => {
	const [selectedDate, setSelectedDate] = useState<string>(moment().format('YYYY-MM-DD'));
	const [scheduleId, setScheduleid] = useState<number | undefined>(undefined);
	const [groupedDate, setGroupeddate] = useState<groupedSlotsT>({});
	const [unionArray, setUnionArray] = useState<SlotItemT[]>();
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [toShowcancelled, setToShowcancelled] = useState<boolean>(false);

	const mode: modeType = modeType.date;
	const navigate = useNavigate();

	useEffect(() => {
		setUnionArray(daySlots)
	}, [daySlots]);

	useEffect(() => {
		setErrorMessage(error);
		if (error) {
			const timeout = setTimeout(() => clearError(), 3000);
			return () => clearTimeout(timeout);
		}
	}, [error])

	useEffect(() => {
		getProfile();
	}, []);

	useEffect(() => {
		const getData = {
			selectedMonth: moment(selectedDate)
		}
		getCountSlots(getData);
	}, [selectedDate])

	useEffect(() => {
		if (selectedDate && getAppointments && getCancelled && doctorId) {
			const getData = {
				id: doctorId,
				startDate: moment(selectedDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
				endDate: moment(selectedDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
			}
			getAppointments(getData);
			getDoctorSlots(getData);
			getCancelled(getData);
		}
	}, [selectedDate, getAppointments, getCancelled, getProfile, doctorId]);

	useEffect(() => {
		const dateGroups = parseSlotsByDate(slots);
		setGroupeddate(dateGroups);
	}, [slots])

	useEffect(() => {
		if (selectedDate && slots) {
			const schedule = slots.find(slot => moment(selectedDate).isSame(moment(slot.date), 'day'));
			setScheduleid(schedule?.schedule_id);
		}
	}, [slots, selectedDate])

	const appointmentClickHandler = (id: number) => navigate(`/appointments/${id}`, { state: id })
	const settingsClickHandler = () => navigate(`/appointments/settings`, { state: 1056 })
	const finalObj: groupedSlotsT= {};

	const parseSlotsByDate = (slots?: SlotsCountItemT[]) => {
		return slots?.reduce((acc, item: SlotsCountItemT) => {
			const date = item?.date?.split('T')[0];

			if (date && !acc[date]) {
				acc[date] = item.count_slots;
			}
			acc[date] = item.count_slots;

			return acc;
		}, finalObj);
	}

	const handleDeleteSchedule = () => {
		if (scheduleId) {
			deleteSchedule({
				scheduleId,
				selectedDate
			});
		}
	}

	const renderDate = (current: Moment) => {
		const currentDay = moment(current).isSame(moment(), 'day') ? 'current-day' : '';
		const otherMonth = !moment(current).isSame(moment(selectedDate), 'month') ? 'other-month' : '';
		const selectedDay = moment(selectedDate).isSame(current, 'day') ? 'selected-day' : currentDay;
		const formatedCurrentDate = moment(current, "YYYY-MM-DD").format("YYYY-MM-DD");

		const slotsCount = ((groupedDate || {})[formatedCurrentDate] || 0);
		return (
			<DatesButton
				disableRipple={true}
				onClick={() => setSelectedDate(moment(current, "YYYY-MM-DD").format("YYYY-MM-DD"))}
			>
				<div className={`current-date ${selectedDay} ${otherMonth}`}>
					<div>{moment(current, "DD").format("DD")}</div>
					<div className={`number-slots ${slotsCount > 9 ? 'decimal' : ''}`}>
						<div className='number'>{slotsCount}</div>
						<div>slots</div>
					</div>
				</div>
			</DatesButton>
		);
	};

	const onChangeHandler = (arg: Moment | null) => {
		setSelectedDate(moment(arg, 'YYYY-MM-DD').format('YYYY-MM-DD'))
	}

	return (
		<div className={`doctors-layout ${selectedDate ? '' : 'no-day-selected'}`}>
			<div className='calendar-block'>
				<div className='calendar-header'>
					<div>Appointments</div>
					<div>
						<SimpleButton
							disableRipple={true}
							onClick={settingsClickHandler}
						>
							<AppointmentIcon/>
						</SimpleButton>
					</div>
				</div>
				<Calendar
					className={'calendar-common-doctors'}
					dateRender={renderDate}
					mode={mode}
					onChange={onChangeHandler}
				/>
			</div>
			<div className={`schedule-block ${!unionArray?.length ? 'empty-schedule' : ''}`}>
				{
					isScheduleLoading && (
						<Loader height='500px' />
					)
				}
				{
					(!isScheduleLoading && scheduleId) ? (
						<div className='schedule-controls'>
							{
								errorMessage ? (
									<div className='error-message'>{errorMessage}</div>
								) : null
							}
							<div className={`controls-button ${cancelledAppointments.length ? '' : 'right'}`}>
								{
									cancelledAppointments.length ? (
										<SimpleButton
											variant="contained"
											disableRipple={true}
											onClick={() => {
												setToShowcancelled(!toShowcancelled)
											}}
										>
											<div className="schedule-controls-button-label switcher">
												{
													toShowcancelled ? <ActiveSwitcherIcon /> : <UnactiveSwitcherIcon />
												}
												<div>Show cancelled</div>
											</div>
									</SimpleButton>
									) : null
								}
								<SimpleButton
										variant="contained"
										disableRipple={true}
										onClick={() => handleDeleteSchedule()}
									>
										<div className="schedule-controls-button-label">
											<CancellationIcon />
											<div>Delete schedule</div>
										</div>
								</SimpleButton>
							</div>
						</div>
					) : null
				}
				{
					!isScheduleLoading && selectedDate && toShowcancelled && (
						<div className='cancelled-appointments'>
							{
								cancelledAppointments.length ? cancelledAppointments.map(({participant, id, status, startDate}) => {
									let fullName = '';
									const startDateFormatted = moment(startDate).format('YYYY-MM-DDTHH:mm:ss');
									const time = moment(startDateFormatted).format('hh:mm A');
									if (participant) {
										fullName = `${participant?.firstname} ${participant?.lastname}`;
									}
									return (
										<div
											className='slot-unit'
											key={time}
											onClick={() => appointmentClickHandler(id)}
										>
											<div>{time}</div>
											<div className='patient-unit'>
												<div className='patient-photo'>
													<img width='44px' height='44px' src={participant.photo} alt='' />
												</div>
												<div>
													<div>{fullName}</div>
													<div className='online-status'>{status}</div>
												</div>
												</div>
										</div>
									)
								}) : null
							}
						</div>
					)
				}
				{
					!isScheduleLoading ? (selectedDate ? (
						unionArray?.length ? unionArray?.map(({ startDate, appointmentId } : Partial<SlotItemT>) => {
							const appointment: AppointmentT | object = appointments?.filter(item => item.id === appointmentId)[0] || {};
							const startDateFormatted = moment(startDate).format('YYYY-MM-DDTHH:mm:ss');
							const sheduleSlot = moment(startDate);
							const time = moment(startDateFormatted).format('hh:mm A');
							const currentTime = moment();
							const diff = sheduleSlot.diff(currentTime, 'minutes');
							const nextEvent = (diff < 30 && diff > 0) ?  'next-event' : '';
							const futureEvent = diff > 30 ? 'future-event' : nextEvent;
							const event = diff < 0 ? 'past-event' : futureEvent
							const hasAppointments = (appointment as AppointmentT)?.id;
							let fullName = '';
							if ((appointment as AppointmentT)?.participant) {
								fullName = `${(appointment as AppointmentT)?.participant?.firstname} ${(appointment as AppointmentT)?.participant?.lastname}`;
							}

							return (
								<div
									className={`slot-unit ${!hasAppointments ? 'empty' : ''}`}
									key={time}
									onClick={() => hasAppointments ? appointmentClickHandler((appointment as AppointmentT)?.id) : null}
								>
									<div>{time}</div>
									<div className={`patient-unit ${event}`}>
											{
												hasAppointments ? (
													<>
														<div className='patient-photo'>
															<img width='44px' height='44px' src={(appointment as AppointmentT)?.participant?.photo} alt='' />
														</div>
														<div>
															<div>{fullName}</div>
															<div className='online-status'>{(appointment as AppointmentT)?.status}</div>
														</div>
													</>
												) : (
													<div className='no-appointment'>No appointment</div>
												)
											}
									</div>
								</div>
							)
						}) : (
							<div className='no-schedule'>
								<ScheduleIcon />
								<div>No appointments this day</div>
							</div>
						)
					) : (
						<div className='select-day-message'>
							<ScheduleIcon />
							<div>Please select day</div>
						</div>
					)) : null}
			</div>
		</div>
	);
};

const mapStateToProps  = (state: AppStateType) => ({
	isAuth: state.auth.isAuth,
	doctorId: state.profile.fullProfile.id,
	appointments: state.doctors.appointments,
	cancelledAppointments: state.schedule.cancelledAppointments,
	daySlots: state.doctors.slots,
	slots: state.schedule.slots,
	error: state.schedule.error,
	isScheduleLoading: state.schedule.isLoading
  });

const mapDispatchToProps  = (dispatch: Dispatch) => ({
	getAppointments: (data?: slotPeriodT) => dispatch(getDoctorsAppointmentsRequest(data)),
	getProfile: () => dispatch(getProfileByTokenRequest()),
	getCountSlots: (data?: SlotsCountRequestPayloadT) => dispatch(getCountSlotsRequest(data)),
	getDoctorSlots: (data?: slotPeriodT) => dispatch(getDoctorSlotsRequest(data)),
	deleteSchedule: (data?: scheduleDataT) => dispatch(deleteScheduleRequest(data)),
	getCancelled: (data?: slotPeriodT) => dispatch(getCancelledAppointmentsRequest(data)),
	clearError: () => dispatch(clearErrorStatus())
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorsAppointment);
