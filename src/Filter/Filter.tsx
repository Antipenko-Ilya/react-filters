import React, { useState, useEffect } from 'react';
import {Select} from './Select';
import {Checkbox} from './Checkbox';
import {RangePicker} from './Rangepicker';
import { IFilter, IFilterValues, IControl, IValue } from '../App';

// select checkbox rangepicker colorpicker 

const getControl = (
  handleChange: (slug: string, value: IValue) => void,
  slug: string,
  type: IControl,
  defaultValue: IValue,
  values?: string[]
) => {
  const onChange = value => handleChange(slug, value);

  if (type === 'select') {
    if (values === undefined) throw new Error('invalid select props');
    if (defaultValue !== null && typeof defaultValue !== 'string' ) throw new Error('invalid select props');
    return <Select values={values} defaultValue={defaultValue} onChange={onChange} />;
  }
  if (type === 'checkbox') {
    if (typeof defaultValue !== 'boolean' ) throw new Error('invalid checkbox props');
    return <Checkbox defaultValue={defaultValue} onChange={onChange} />;
  }
  if (type === 'rangepicker'){
    return <RangePicker defaultValue={defaultValue} onChange={onChange} />;
  }
};

interface FilterProps {
  filters: Array<IFilter>;
  onChange: (value: IFilterValues) => void;
}

export const Filter: React.FunctionComponent<FilterProps> = ({
  onChange,
  filters
}) => {
  const [selectedValue, setSelectedValues] = useState({});
  
  function handleChange(name: string, value: IValue) {
    setSelectedValues(prev => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    onChange(selectedValue);
  }, [selectedValue])

  return (
    <div>
      {filters.map(({ name, slug, type, values, defaultValue }) => (
        <div>
          {name}
          {getControl(handleChange, slug, type, defaultValue, values)}
        </div>
      ))}
    </div>
  );
}