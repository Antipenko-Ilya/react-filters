import React from 'react';

interface SelectProps {
    values: string[];
    defaultValue: string | null;
    onChange: (value: string) => void;
  }
  
  export const Select: React.FunctionComponent<SelectProps> = ({
    values,
    defaultValue,
    onChange
   }) => {
    function handleChange(value: string) {
      onChange(value);
    }
    
    return (
      <AntSelect defaultValue={defaultValue || undefined} className="select" onChange={handleChange}>
        {values.map(value => <Option key={value} value={value}>{value}</Option>)}
      </AntSelect>
    );
  }