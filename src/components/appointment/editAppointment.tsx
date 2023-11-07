import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import moment, { Moment } from 'moment';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppStateType from '../../redux/types';
import FailedIcon from '../../images/Icons/failedIcon';
import SuccessIcon from '../../images/Icons/successIcon';
import { CalendarBlock as Calendar  } from 'components/calendar/calendar';
import Loader from 'components/layout/Loader';
import { getOneDoctorRequest, getDoctorSlotsRequest } from '../../redux/modules/doctors/actions/doctors';

import {SlotItemT, NewAppointmentT, SlotsRequestPayloadT, SlotsCountItemT, SlotsCountRequestPayloadT} from '../../types';
import {
	updateAppointmentStatus,
	getCountSlotsRequest,
	updateAppointmentRequest
} from '../../redux/modules/schedule/actions/schedule';

import './appointment.scss';
import { Dispatch } from '@reduxjs/toolkit';
import { CommonStyles as CommonCancelButton, TextFieldStyles } from '../../pages/AppointmentPage/components/common';

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
	width: '270px',
	height: '40px',
	padding: '12px 24px 12px 24px',
	borderRadius: '8px',
	border: '1px solid',
	fontFamily: 'Manrope',
	fontSize: '16px',
	fontWeight: 500,
	lineHeight: '20px'
}

const CommonStatusStyles = {
	width: '98px',
	height: '34px',
	padding: '8px 16px 8px 16px',
	borderRadius: '8px',
	fontFamily: 'Manrope',
	fontSize: '14px',
	fontWeight: 500,
	lineHeight: '18px'
}

const SelectedButtonStyles = {
	backgroundColor: 'rgba(44, 121, 206, 1)',
	color: '#FFFFFF',
	borderColor: 'rgba(44, 121, 206, 1)',
	padding: '5px 10px',
	'&:hover': {
		backgroundColor: 'rgba(44, 121, 206, 1)',
	}
}

const UnselectedButtonStyles = {
	backgroundColor: '#FFFFFF',
	color: 'rgba(0, 0, 0, 1)',
	border: '1px solid',
	borderColor: 'rgba(198, 198, 200, 1)',
	padding: '5px 10px',
	'&:hover': {
		backgroundColor: '#FFFFFF',
	}
}

const OutlineButton = styled(Button)(Object.assign(CancelButtonStyles, CommonStyles));
const SaveChangesButton = styled(Button)(Object.assign(SaveChangesButtonStyles, CommonStyles));

const SelectedButton = styled(Button)(Object.assign(SelectedButtonStyles, CommonStatusStyles));
const UnselectedButton = styled(Button)(Object.assign(UnselectedButtonStyles, CommonStatusStyles));

const SelectedSlotButton = styled(Button)(Object.assign({}, SelectedButtonStyles, CommonStatusStyles, {width: '130px'}));
const UnselectedSlotButton = styled(Button)(Object.assign({}, UnselectedButtonStyles, CommonStatusStyles, {width: '130px'}));

const IntervalButton = (
	{ isSelected,  ...props } : {
		isSelected: boolean,
		children: string,
		onClick: () => void,
		disableRipple: boolean
	}
) => isSelected ? <SelectedButton {...props} /> :<UnselectedButton {...props} />;

const SlotButton = (
	{ isSelected,  ...props } : {
		isSelected: boolean,
		children: string,
		onClick: () => void,
		disableRipple: boolean
	}
) => isSelected ? <SelectedSlotButton {...props} /> :<UnselectedSlotButton {...props} />;

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

type groupedSlotsT = {[key: string]: number} | undefined;
type groupedSlotsByTimeT = {[key: string]: SlotItemT[]};
type updateAppointmentT = {
	slotId: number,
	appointmentId: number
}
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type EditAppointmentProps = {
	photo?: string,
	name?: string,
	error: string,
	doctorId?: number,
	isDoctor?: boolean,
	appointmentId?: number | null,
	isLoading?: boolean,
	slots?: SlotItemT[],
	slotsCalculation: SlotsCountItemT[],
	appointmentCreated?: boolean,
	newAppointment?: Partial<NewAppointmentT> | null,
	createAppointment?: (arg: number) => void,
	closeModal: () => void
} & DispatchProps;

const NO_SLOTS_MESSAGE = 'There are no free slots on this date';
const SELECT_PROMPT_MESSAGE = 'Please select time';
const NO_DATE_SELECTED_MESSAGE = 'Please select date';
const SUCCESS_MESSAGE = 'Data successfully updated';

const EditAppointment: React.FC<EditAppointmentProps> = ({
	photo='',
	name='',
	error = '',
	doctorId,
	appointmentId,
	slots=[],
	slotsCalculation =[],
	appointmentCreated = false,
	isLoading: isRequestLoading = false,
	isDoctor =false,
	closeModal = () => {},
	updateAppointment = () => {},
	setAppointmentCreated = () => {},
	createAppointment = () => {},
	getSlots,
	getCountSlots
}) => {
	const [selectedDate, setSelectedDate] = useState<string>('');
	const [selectedMonthReschedule, setSelectedMonthReschedule] = useState<Moment | null>(moment());
	const [apiError, setApiError] = useState<string>('');
	const [slotInterval, setSlotInterval] = useState<string>('');
	const [parsedSlots, setParsedSlots] = useState<groupedSlotsByTimeT>({})
	const [selectedSlot, setSelectedSlot] = useState<number>(0);
	const [groupedDate, setGroupeddate] = useState<groupedSlotsT>({});
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const renderDate = (current: Moment) => {
		const currentDay = moment(current).isSame(moment(), 'day') ? 'current-day' : '';
		const isBeforeToday = moment(current).isBefore(moment(), 'day');
		const isOtherMonth = !moment(current).isSame(moment(selectedMonthReschedule), 'month');
		const otherMonth = !moment(current).isSame(selectedMonthReschedule, 'month') ? 'other-month' : '';
		const selectedDay = moment(selectedDate).isSame(current, 'day') ? 'selected-day' : currentDay;

		const formatedCurrentDate = moment(current, "YYYY-MM-DD").format("YYYY-MM-DD");
		const slotsCount = ((groupedDate || {})[formatedCurrentDate] || 0);
		const unActiveButton = isBeforeToday ? 'unactive' : '';

		if (!isOtherMonth) {
				return (
					<DatesButton
						disableRipple={true}
						disabled={slotsCount === 0 || isBeforeToday}
						onClick={() => {
							if (slotsCount !== 0 && !isBeforeToday) {
								setSelectedDate(moment(current, 'YYYY-MM-DD').format('YYYY-MM-DD'));
							} else {
								return;
							}
						}}
					>
						<div className={`current-date ${selectedDay} ${otherMonth} ${unActiveButton}`}>
							<div>{moment(current, "DD").format("DD")}</div>
							<div className={`slots-count ${slotsCount ? '' : 'no-slots'}`}>{`${slotsCount}`}</div>
						</div>
					</DatesButton>
				);
		}
	};

	useEffect(() => {
		setSlotInterval('');
		setSelectedSlot(0);
		setApiError(error)
	}, [error])

	const handleCloseModal = () => {
		setSelectedDate('');
		setSlotInterval('');
		setSelectedSlot(0);
		setApiError('');
		closeModal();
	}

	const makeAppointment = () => {
		if (appointmentId) {
			setIsLoading(true)
			const updateData = {
				slotId: (selectedSlot as number),
				appointmentId: (appointmentId as number)
			}
			updateAppointment(updateData);
		} else {
			createAppointment((selectedSlot as number))
		}
	}

	useEffect(() => {
		if (appointmentCreated) {
			setIsLoading(false);
			const timeout = setTimeout(() => {
				setAppointmentCreated(false);
				handleCloseModal();
			}, 3000);

			return () => clearTimeout(timeout);
		}
	}, [appointmentCreated])

	useEffect(() => {
		if (slots) {
			const parsed = parseSlotsByTime(slots);
			if (parsed) {
				setParsedSlots(parsed);
			}
		}
	}, [slots, selectedDate])

	const finalObj: groupedSlotsByTimeT= {};

	// Group slots by time interval 
	const parseSlotsByTime = (slots?: SlotItemT[]) => {
		return slots?.reduce((acc, item: SlotItemT) => {
			const isLater = moment(item.startDate).isAfter(moment(), 'hour');
			if (isLater) {
				const startDate = moment(item.startDate).format('YYYY-MM-DDTHH:mm:ss')
				const hours = moment(startDate).format('HH')
				const formatHours = `${hours}:00`;
	
				if (hours && !acc[formatHours]) {
					acc[formatHours] = []
				}
				if (item.statusSlot === 'FREE') {
					acc[formatHours].push(item)
				}
			}
			return acc
		}, finalObj);
	}
	const finalSlotsObj: groupedSlotsT= {};

	const parseSlotsByDate = (slots?: SlotsCountItemT[]) => {
		return slots?.reduce((acc, item: SlotsCountItemT) => {
			const date = item?.date?.split('T')[0];

			if (date && !acc[date]) {
				acc[date] = item.count_slots;
			}
			acc[date] = item.count_slots;

			return acc
		}, finalSlotsObj);
	}

	useEffect(() => {
		const dateGroups = parseSlotsByDate(slotsCalculation);
		setGroupeddate(dateGroups);
	}, [slotsCalculation]);

	useEffect(() => {
		if (selectedMonthReschedule !==null && doctorId) {
			const getData = {
				id: doctorId,
				selectedMonth: selectedMonthReschedule
			}
			getCountSlots(getData);
		}
	}, [selectedMonthReschedule, doctorId]);

	useEffect(() => {
		if (doctorId && selectedDate) {
			const getData = {
				id: doctorId,
				startDate: moment(selectedDate).format('YYYY-MM-DD'),
				endDate: moment(selectedDate).format('YYYY-MM-DD')
			}
			getSlots(getData);
		}
	}, [selectedDate, doctorId])

	useEffect(() => {
		if (apiError) {
			setIsLoading(false);
			const timeout = setTimeout(() => {
				setApiError('');
			}, 3000);

			return () => clearTimeout(timeout);
		}
	}, [apiError]);

	const handleChangeMonth = (date: Moment | null) => {
		setSelectedMonthReschedule(date);
		setSelectedDate('');
		setSlotInterval('')
	}

	return (
		<>
			<Container className={`edit-appointment-form-layout-loader ${isLoading ? 'active' : ''}`}>
				<div className='schedule-base-block loading'>
					<Loader height='500px' />
				</div>
			</Container>
			<Container className='edit-appointment-form-layout'>
				<div>
					{
						apiError && (
							<div className='success-message'>
								<div>{apiError}</div>
								<div><FailedIcon /></div>
							</div>
						)
					}
					{
						appointmentCreated && (
							<div className='success-message'>
								<div>{SUCCESS_MESSAGE}</div>
								<div><SuccessIcon /></div>
							</div>
						)
					}
				</div>
				<div className='title'>
					{appointmentId ? 'Reschedule appointment' : 'New appointment'}
				</div>
				<div className='edit-appointment-base-block'>
					<div className='specialist'>
						<div>Specialist</div>
						<div>
							<div className='doctors-photo'>
								<img src={photo} alt='' />
							</div>
							<div className='right-block'>
								<div>
									<div className=''>{isDoctor ? 'Patient' : 'Therapist'}</div>
								</div>
								<div>
									<div className='full-name'>{name}</div>
								</div>
							</div>
						</div>
					</div>
					<div className='calendar-block'>
						<div>Date</div>
						<div>
							<Calendar
								className={'calendar-reschedule-common'}
								dateRender={renderDate}
								onChange={(date: Moment | null) => handleChangeMonth(date)}
								disabledDate={(current: Moment | undefined) => {
									return moment(current).isSame(moment(selectedMonthReschedule), 'month');
								}}
							/>
						</div>
					</div>

					<div className='time-picker-block'>
						<div>Time</div>
						<div className='controls-block'>
							{
								slots.length === 0 || !selectedDate ? (
									<div className='no-free-slots'>
										{
											selectedDate ? NO_SLOTS_MESSAGE : NO_DATE_SELECTED_MESSAGE
										}
									</div>
								) : (
									Object.keys(parsedSlots as groupedSlotsByTimeT).map((item) => {
										if (parsedSlots[item]?.length) {
											return (
												<IntervalButton
													disableRipple={true}
													isSelected={item === slotInterval}
													onClick={
														() => {
															setSlotInterval(item);
															setSelectedSlot(0);
														}
													}
												>
													{item}
												</IntervalButton>
											)
										}
									})
								)
							}
						</div>
					</div>
					<div className='slots-block'>
							<div>Slots available</div>
							{
								!slotInterval ? (
									<div className='select-prompt'>
										{SELECT_PROMPT_MESSAGE}
									</div>
								) : (
										<div className='current-slots'>
											{
												parsedSlots[slotInterval]?.length === 0 ? (
													<div className='no-free-slots'>No available slots</div>
												) : ( 
													parsedSlots[slotInterval]?.map((item) => {
														const from = moment(item.startDate).format('LT');
														const to = moment(item.endDate).format('LT');
														const title = `${from} - ${to}`;
														return (
															<SlotButton
																disableRipple={true}
																isSelected={item.id === selectedSlot}
																onClick={() => setSelectedSlot(item.id)}
															>
																{title}
															</SlotButton>
														);
													}))
											}
										</div>
								)
							}
						</div>
				</div>
				<div className='save-changes-block'>
						<div>
							<OutlineButton disableRipple={true}  onClick={handleCloseModal}>
								Cancel
							</OutlineButton>
						</div>
						{
							selectedSlot ? (
								<div>
									<SaveChangesButton
										disableRipple={true}
										onClick={makeAppointment}
									>
										Save
									</SaveChangesButton>
								</div>
							) : (
								<div>
									<OutlineButton
										disableRipple={true}
									>
										Save
									</OutlineButton>
								</div>
							)
						}

				</div>
			</Container>
		</>
	);
}

const mapStateToProps = (state: AppStateType) => ({
	slots: state.doctors.slots,
	slotsCalculation: state.schedule.slots,
	appointmentCreated: state.schedule.appointmentCreated,
	newAppointment: state.schedule.newAppointment,
	isLoading: state.schedule.isLoading,
	error: state.schedule.error
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getDoctor: (data: number) => dispatch(getOneDoctorRequest(data)),
	getSlots: (data: SlotsRequestPayloadT) => dispatch(getDoctorSlotsRequest(data)),
	getCountSlots: (data?: SlotsCountRequestPayloadT) => dispatch(getCountSlotsRequest(data)),
	updateAppointment: (data: updateAppointmentT) => dispatch(updateAppointmentRequest(data)),
	setAppointmentCreated: (data: boolean) => dispatch(updateAppointmentStatus(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditAppointment);
