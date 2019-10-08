import React from 'react';
import { Select as AntSelect } from 'antd';
import style from './Select.module.css';

// https://ant.design/components/select/#header

const { Option } = AntSelect;

interface SelectProps {
  values: any[];
  onChange: (value: string) => void;
  label: string;
}

export const Select: React.FunctionComponent<SelectProps> = ({
  values,
  onChange,
  label
 }) => {
  function handleChange(value: string) {
    onChange(value);
  }
  
  return (
    <div>
      {label}
      <AntSelect className={style.select} onChange={handleChange}>
        {values.map(value => <Option key={value} value={value}>{value}</Option>)}
      </AntSelect>
    </div>
  );
}