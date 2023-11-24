import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Moment } from 'moment';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import AppStateType from '../../redux/types';
import { ScheduleCreationT, SlotsCountItemT, SlotsCountRequestPayloadT } from '../../types'
import {
	setScheduleRequest,
	getCountSlotsRequest,
	updateScheduleStatus as updateScheduleStatusRequest
} from '../../redux/modules/schedule/actions/schedule';

import ScheduleWindow from './schedule';

import './settings.scss';
import { Dispatch } from '@reduxjs/toolkit';

export const StyledModal = styled(Modal)({
	position: 'fixed',
	width: '200px',
	height: '200px'
});

export const DoctorsButton = styled(Button)({
	border: 'none',
	fontFamily: 'Manrope',
	fontWeight: 500,
	height: '40px',
	width: '200px',
	fontSize: '15px',
	color: '#000000',
	backgroundColor: '#ffffff',
	padding: '5px 0px',
	focusVisible: 'false',
	'&>span': {
		justifyContent: 'flex-start'
	},
	'&:hover': {
		backgroundColor: '#ffffff',
	}
});

export const Container = styled('div')({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between'
});

type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type AppointmentProps = {
	scheduleCreated: boolean,
	isScheduleCreationLoading: boolean,
	scheduleError: string,
	address: string,
	slotsCalculation?: SlotsCountItemT[]
} & DispatchProps;

const AppointmentsSettings: React.FC<AppointmentProps> = ({
	scheduleCreated,
	isScheduleCreationLoading,
	scheduleError,
	address,
	slotsCalculation,
	updateScheduleStatus,
	setSchedule,
	getCountSlots
}) => {
	const [isEditWindowOpen, setIsEditWindowOpen] = useState<boolean>(false);
	const navigate = useNavigate();

	const handleGetCountSlots = (date: Moment) => {
			const getData = {
				selectedMonth: date
			}
			getCountSlots(getData);
	}

	return (
		<Container className='appointment-settings-layout'>
			<StyledModal
				keepMounted
				disablePortal
				aria-labelledby="unstyled-modal-title"
				aria-describedby="unstyled-modal-description"
				open={true}
				onClose={() => {
					setIsEditWindowOpen(false);
					updateScheduleStatus(false);
					navigate('/appointments');
				}}
			>
				<div>
					<ScheduleWindow
						closeModal={() => {
							setIsEditWindowOpen(false);
							updateScheduleStatus(false);
							navigate('/appointments');
						}}
						isOpen={isEditWindowOpen}
						setSchedule={setSchedule}
						getCountSlots={handleGetCountSlots}
						slotsCalculation={slotsCalculation}
						scheduleCreated={scheduleCreated}
						updateScheduleStatus={updateScheduleStatus}
						isScheduleCreationLoading={isScheduleCreationLoading}
						scheduleError={scheduleError}
						address={address}
						// cancelAppointment={cancelAppointment}
					/>
				</div>

			</StyledModal>
		</Container>
	);
};

const mapStateToProps = (state: AppStateType) => ({
	scheduleCreated: state.schedule.scheduleCreated,
	address: state.profile.address,
	isScheduleCreationLoading: state.schedule.isScheduleCreationLoading,
	slotsCalculation: state.schedule.slots,
	scheduleError: state.schedule.error
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setSchedule: (data: ScheduleCreationT) => dispatch(setScheduleRequest(data)),
	updateScheduleStatus: (data: boolean) => dispatch(updateScheduleStatusRequest(data)),
	getCountSlots: (data?: SlotsCountRequestPayloadT) => dispatch(getCountSlotsRequest(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentsSettings);
