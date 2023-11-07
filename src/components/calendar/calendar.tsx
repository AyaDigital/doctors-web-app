import React, { ReactNode } from 'react';
import 'rc-calendar/assets/index.css';
import Calendar from 'rc-calendar';
import { Moment } from 'moment';
import 'rc-select/assets/index.less';
//  import './calendar.scss';

enum modeType {
	time = 'time',
	date = 'date',
	month = 'month',
	year = 'year',
	decade = 'decade'
  }

type CalendarBlockProps = {
	className: string,
	dateRender: (arg: Moment) => ReactNode,
	mode?: modeType,
	onChange?: (date: Moment | null) => void,
	onSelect?: (date: Moment | null) => void,
	onPanelChange?: (date: Moment | null) => void
	disabledDate?: (date: Moment | undefined) => boolean
  };

export const CalendarBlock: React.FC<CalendarBlockProps> = ({
	className = '', dateRender, mode = modeType.date, onSelect, onChange, disabledDate, ...rest
}) => {
	return (
		<>
			<Calendar
				className={className}
				dateRender={dateRender}
				onChange={onChange}
				onSelect={onSelect}
				disabledDate={disabledDate}
				showDateInput={false}
				showToday={false}
				mode={mode}
				{...rest}
			/>
		</>
	);
}
