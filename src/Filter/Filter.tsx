import React, { useState, useEffect } from 'react';
import { useLocalStore, useObserver, observer,  } from 'mobx-react';
import {Moment} from 'moment';
import {Select} from './Select';
import {Checkbox} from './Checkbox';
import {RangePicker} from './Rangepicker';
import { IFilter, IFilterValues, IFilterValue, IControl, IValue } from '../App';

// select checkbox rangepicker colorpicker 

const getControl = (
  handleChange: (slug: string, value: IFilterValue) => void,
  slug: string,
  type: IControl,
  defaultValue: IFilterValue,
  values?: string[]
) => {
  const onChange = (value: IFilterValue) => handleChange(slug, value);

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
    if (defaultValue === 'boolean' || defaultValue === 'string') throw new Error('invalid rangepicker props');
    return <RangePicker defaultValue={defaultValue as ([Moment, Moment] | null)} onChange={onChange} />;
  }
};

interface FilterProps {
  filters: Array<IFilter>;
  onChange: (value: IFilterValues) => void;
  className: string
}

export const Filter: React.FunctionComponent<FilterProps> = ({
  onChange,
  filters,
  className
}) => {
  const [selectedValue, setSelectedValues] = useState({});

  const obj = useStores();
  console.log({obj});

  
  // function handleChange(name: string, value: IFilterValue) {
  //   setSelectedValues(prev => ({ ...prev, [name]: value }));
  // }

  // useEffect(() => {
  //   onChange(selectedValue as IFilterValues);
  // }, [selectedValue])

  return (
    <div className={className}>
      filter
      {/* {filters.map(({ name, slug, type, values, defaultValue }) => (
        <div>
          {name}
          {getControl(handleChange, slug, type, defaultValue, values)}
        </div>
      ))} */}
    </div>
  );
}

function Person() {
  const person = useLocalStore(() => ({ name: 'John' }))
  return useObserver(() => (
    <div>
      {person.name}
      <button onClick={() => (person.name = 'Mike')}>No! I am Mike</button>
    </div>
  ))
}