import React from 'react';
import { DatePicker } from 'antd';
import { Moment } from 'moment'
import style from './Rangepicker.module.css';

const AntRangePicker = DatePicker.RangePicker

// https://stackoverflow.com/questions/36648231/how-can-moment-js-be-imported-with-typescript

interface RangePickerProps {
    onChange: (value: [Moment, Moment]) => void;
    label: string;
}

export const RangePicker: React.FunctionComponent<RangePickerProps> = ({
    onChange,
    label
}) => {
    function handleChange(dates: any) {
        console.log('>> dates',dates);
        onChange(dates);
    }
    return(
      <div className={style.rangepicker}>
            {label}
            <AntRangePicker
                onChange={handleChange}   
            />
        </div>
    );
}


