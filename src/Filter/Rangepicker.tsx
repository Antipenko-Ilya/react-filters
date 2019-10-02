import React from 'react';
import { DatePicker } from 'antd';
import { Moment } from 'moment'
const AntRangePicker = DatePicker.RangePicker

// https://stackoverflow.com/questions/36648231/how-can-moment-js-be-imported-with-typescript

interface RangePickerProps {
    defaultValue: [Moment, Moment];
    onChange: (value: [Moment, Moment]) => void;
}

export const RangePicker: React.FunctionComponent<RangePickerProps> = ({
    defaultValue,
    onChange
}) => {
    return(
        <AntRangePicker onCalendarChange={onChange} />
    );
}


