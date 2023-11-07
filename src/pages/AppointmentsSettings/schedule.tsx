import React, {useState, useEffect} from 'react';
import moment, { Moment } from 'moment';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { MenuItem } from '@material-ui/core';
import { CalendarBlock as Calendar  } from 'components/calendar/calendar';
import Loader from 'components/layout/Loader';
import SuccessIcon from '../../images/Icons/successIcon';
import FailedIcon from '../../images/Icons/failedIcon';
import { ScheduleCreationT, SlotsCountItemT } from '../../types'
import './settings.scss';
import { CommonStyles as CommonCancelButton, TextFieldStyles } from '../AppointmentPage/components/common';
const hourPoints = [
	'09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
]

const durations = [
	'5', '10', '15', '20', '25', '30', '60', '90', '120', '180', '240'
]

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
	height: '34px',
	padding: '12px 24px 12px 24px',
	borderRadius: '8px',
	border: '1px solid',
	fontFamily: 'Manrope',
	fontSize: '16px',
	fontWeight: 500,
	lineHeight: '20px'
}

const CommonStatusStyles = {
    width: '258px',
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

const CancelEditionButton = styled(Button)(Object.assign(CancelButtonStyles, CommonStyles));
const SaveChangesButton = styled(Button)(Object.assign(SaveChangesButtonStyles, CommonStyles));

const SelectedButton = styled(Button)(Object.assign(SelectedButtonStyles, CommonStatusStyles));
const UnselectedButton = styled(Button)(Object.assign(UnselectedButtonStyles, CommonStatusStyles));

const ConsultationTypeButton = (
    { isSelected,  ...props } : { isSelected: boolean, children: string, onClick: () => void }
) => isSelected ? <SelectedButton {...props} /> :<UnselectedButton {...props} />;

const Container = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	rowGap: '32px',
	justifyContent: 'space-between'
});

export const StyledTextField = styled(TextField)(Object.assign(TextFieldStyles, {
	width: '100%',
	'& > .MuiOutlinedInput-root.MuiInputBase-formControl': {
		height: '30px',
		borderRadius: '8px',
		backgroundColor: '#FFFFFF !important',
		'& > input': {
			backgroundColor: '#FFFFFF !important',
		}
	},
	'& > label': {
		fontFamily: 'Manrope',
		fontSize: '16px',
		fontWeight: 400,
		color: 'rgba(60, 60, 67, 0.6)',
		transform: 'translate(14px, 4px) scale(1)'
	}
}));
export const CancelButton = styled(Button)(Object.assign({color: 'rgba(255, 84, 74, 1)'}, CommonCancelButton));
export const DatesButton = styled(Button)({
	backgroundColor: 'transparent',
	padding: 0,
});

const REQUIRED_MESSAGE = 'This data is required';
const NO_DATE_SELECTED_MESSAGE = 'Please select date';
const THE_LAST_HOUR = '18:00';

type ScheduleWindowT = {
	scheduleCreated?: boolean,
	isOpen?: boolean,
	isScheduleCreationLoading?: boolean,
	scheduleError?: string,
	closeModal: () => void,
	setSchedule?: (args: ScheduleCreationT) => void,
	updateScheduleStatus?: (data: boolean) => void,
	slotsCalculation?: SlotsCountItemT[],
	getCountSlots: (arg: Moment) => void,
}
type groupedSlotsT = {[key: string]: number} | undefined;

function ScheduleWindow({
	scheduleCreated = false,
	isScheduleCreationLoading = false,
	scheduleError = '',
	slotsCalculation,
	isOpen = false,
	closeModal = () => {},
	setSchedule = () => {},
	updateScheduleStatus = () => {},
	getCountSlots
}: ScheduleWindowT) {
	const [fromValue, setFromValue] = useState<string>('');
	const [toValue, setToValue] = useState<string>('');
	const [duration, setDuration] = useState<string>('');
    const [type, setType] = useState('');
	const [selectedDate, setSelectedDate] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [apiError, setApiError] = useState<string>('');
	const [saveHandler, setSaveHandler] = useState<boolean>(false);
	const [scheduleStatus, setScheduleStatus] = useState<boolean>(false);
	const [selectedMonth, setSelectedMonth] = useState<Moment | null>(moment());
	const [groupedDate, setGroupeddate] = useState<groupedSlotsT>({});
	const [timePoints, setTimePoints] = useState(hourPoints);

	const finalObj: groupedSlotsT= {};

	const parseSlotsByDate = (slots?: SlotsCountItemT[]) => {
		return slots?.reduce((acc, item: SlotsCountItemT) => {
			const date = item?.date?.split('T')[0];

			if (date && !acc[date]) {
				acc[date] = item.count_slots;
			}
			acc[date] = item.count_slots;

			return acc
		}, finalObj);
	}

	useEffect(() => {
		const today = moment(selectedDate).isSame(moment(), 'day');
		if (today) {
			setTimePoints(hourPoints.filter(point => {
				return moment(moment().format('YYYY-MM-DDT'+point)).isAfter(moment())
			}))
		} else {
			setTimePoints(hourPoints);
		}
	}, [selectedDate])

	useEffect(() => {
		const dateGroups = parseSlotsByDate(slotsCalculation);
		setGroupeddate(dateGroups);
	}, [slotsCalculation])

    const renderDate = (current: Moment) => {
		const today = moment(current).isSame(moment(), 'day');
		const currentDay = today ? 'current-day' : '';
		const isLastHour = today && moment().isAfter(moment().format('YYYY-MM-DDT'+THE_LAST_HOUR))
		const isBeforeToday = moment(current).isBefore(moment(), 'day') || isLastHour;
		const isOtherMonth = !moment(current).isSame(moment(selectedMonth), 'month');
		const otherMonth = !moment(current).isSame(selectedMonth, 'month') ? 'other-month' : '';
		const selectedDay = moment(selectedDate).isSame(current, 'day') ? 'selected-day' : currentDay;

		const formatedCurrentDate = moment(current, "YYYY-MM-DD").format("YYYY-MM-DD");
		const slotsCount = ((groupedDate || {})[formatedCurrentDate] || 0);
		const unActiveButton = !slotsCount || isOtherMonth || isBeforeToday ? '' : 'unactive';

		if (!isOtherMonth) {
			return (
				<DatesButton
					disableRipple={true}
					disabled={slotsCount !== 0 || isBeforeToday}
					onClick={() => {
						if (slotsCount === 0 && !isBeforeToday) {
							clearForm();
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
		clearForm();
		setSelectedDate('');
	}, [isOpen])

	const clearForm = () => {
		setSaveHandler(false);
		setDuration('');
		setFromValue('');
		setToValue('');
		setType('');
		setApiError('');
	}

	const handleCloseModal = () => {
		clearForm();
		setSelectedDate('');
		closeModal();
	}

	useEffect(() => {
		if (selectedMonth) {
			getCountSlots(selectedMonth);
		}
	}, [selectedMonth]);

	useEffect(() => {
		setIsLoading(isScheduleCreationLoading);
		setApiError(scheduleError);
	}, [isScheduleCreationLoading, scheduleError])

	useEffect(() => {
		setSelectedMonth(moment());
		setScheduleStatus(scheduleCreated);
	}, [scheduleCreated]);

	useEffect(() => {
		if (scheduleStatus) {
			const timeout = setTimeout(() => {
				updateScheduleStatus(false);
				closeModal();
			}, 3000);

			return () => clearTimeout(timeout);
		}
	}, [scheduleStatus])

	useEffect(() => {
		if (apiError) {
			const timeout = setTimeout(() => {
				setApiError('');
			}, 3000);

			return () => clearTimeout(timeout);
		}
	}, [apiError]);

	const handleSaveSchedule = () => {
		setSaveHandler(true);
		const fieldsValid = fromValue && toValue && duration && type && selectedDate;
		if (fieldsValid) {
			const payload = {
				date: selectedDate,
				dayStart: fromValue,
				dayEnd: toValue,
				zoneOffset: '',
				slotDuration: Number(duration),
				active: true,
				slotType: type,
				comment: ''
			}
			setSchedule(payload)
		}
	}

	const handleChangeMonth = (date: Moment | null) => {
		setSelectedMonth(date);
		setSelectedDate('');
	}

	return (
		<>
			{
				isLoading ? (
					<Container className='settings-schedule-form-layout'>
						<div className='settings-schedule-base-block loading'>
							<Loader height='500px' />
						</div>
					</Container>
				) : (
						<Container className={`settings-schedule-form-layout ${scheduleCreated ? 'response' : ''}`}>
							{
								scheduleCreated ? (
									<div className='success-message'>
										<div>Data successfully updated!</div>
										<div><SuccessIcon /></div>
									</div>
								) : (
										<div>
											<div className='settings-schedule-base-block'>
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
													New schedule
												</div>
												<div className='grey-header'>Working days</div>
												<div className='calendar-block'>
													<Calendar
														className={'calendar-schedule-common'}
														dateRender={renderDate}
														onChange={(date: Moment | null) => handleChangeMonth(date)}
														disabledDate={(current: Moment | undefined) => {
															return moment(current).isSame(moment(selectedMonth), 'month');
														}}
													/>
												</div>
												<div className='errorBlock margin-top'>
													{saveHandler && !selectedDate && REQUIRED_MESSAGE}
												</div>
												<div className='grey-header'>
													Working hours
												</div>
												<div className={`time-picker-block ${selectedDate ? '' : 'empty'}`}>
													{
														selectedDate ? (
															<>
																<div className='select-period-block'>
																	<StyledTextField
																		value={fromValue}
																		select
																		label="Start time"
																		variant="outlined"
																		onChange={(event) => {
																			setFromValue(event.target.value);
																		}}
																	>
																		{
																			timePoints.map((item, index) => {
																				return (
																					<MenuItem
																						key={index}
																						disableRipple={true} 
																						value={item}
																					>
																						{item}
																					</MenuItem>
																				)
																			})
																		}
																	</StyledTextField>
																</div>
																<div className='select-period-block'>
																	<StyledTextField
																		value={toValue}
																		select
																		label="End time"
																		variant="outlined"
																		onChange={(event) => {
																			setToValue(event.target.value);
																		}}
																	>
																			{
																				timePoints.map((item, index) => {
																					return (
																						<MenuItem
																							key={index}
																							disableRipple={true} 
																							value={item}
																						>
																							{item}
																						</MenuItem>
																					)
																				})
																			}
																	</StyledTextField>
																</div>
															</>
														) : NO_DATE_SELECTED_MESSAGE
													}
												</div>
												<div className='errorBlock'>
													{saveHandler && (!toValue || !fromValue) && REQUIRED_MESSAGE}
												</div>
												<div className='grey-header'>Appointment type</div>
												<div className={`controls-block ${selectedDate ? '' : 'empty'}`}>
													{
														selectedDate ? (
															<>
																<div>
																	<ConsultationTypeButton
																		isSelected={type === 'ONLINE'}
																		onClick={() => type === 'ONLINE' ? null : setType('ONLINE') }
																	>
																		Online
																	</ConsultationTypeButton>
																</div>
																<div>
																	<ConsultationTypeButton
																		isSelected={type === 'OFFLINE'}
																		onClick={() => type === 'OFFLINE' ? null : setType('OFFLINE')}
																	>
																		Offline
																	</ConsultationTypeButton>
																</div>
															</>
														) : NO_DATE_SELECTED_MESSAGE
													}
												</div>
												<div className='errorBlock'>
													{saveHandler && !type && REQUIRED_MESSAGE}
												</div>
												<div className='grey-header'>Consultation time</div>
												<div className={`duration-block ${selectedDate ? '' : 'empty'}`}>
													{
														selectedDate ? (
															<StyledTextField
																value={duration}
																select
																label="Duration"
																variant="outlined"
																onChange={(event) => {
																	setDuration(event.target.value);
																}}
															>
																	{
																		durations.map((item, index) => {
																			return (
																				<MenuItem
																					key={index}
																					disableRipple={true} 
																					value={item}
																				>
																					{item}
																				</MenuItem>
																			)
																		})
																	}
															</StyledTextField>
														) : NO_DATE_SELECTED_MESSAGE
													}
												</div>
												<div className='errorBlock'>
													{saveHandler && !duration && REQUIRED_MESSAGE}
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
														onClick={handleSaveSchedule}
													>
														Save
													</SaveChangesButton>
												</div>
											</div>
										</div>
								)
							}
						</Container>
					)
			}
		</>


	);
}

export default ScheduleWindow;