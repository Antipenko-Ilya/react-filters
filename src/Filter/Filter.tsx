import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import {Moment} from 'moment';
import { IMSTArray, ISimpleType, Instance } from "mobx-state-tree"
import {Select} from './Select';
import {Checkbox} from './Checkbox';
import {RangePicker} from './Rangepicker';
import {IFilterValue} from '../stores/Types';
import { Filter as FilterModel } from '../stores/FilterStore';
// select checkbox rangepicker colorpicker 

interface FilterProps {
  className: string,
  onChange: (type: string, value: IFilterValue) => void,
  filters: Instance<typeof FilterModel>[]
}

export const Filter: React.FunctionComponent<FilterProps> = ({ className, filters, onChange }) => {
  return (
    <div className={className}>
        <div>
          {filters.map((filter) => {
            const handleChange = (value: IFilterValue) => onChange(filter.type, value);
            if (filter.type === 'select') {
              return <Select label={filter.name} values={filter.values as IMSTArray<ISimpleType<string>>} onChange={handleChange} />;
            }
            if (filter.type === 'checkbox') {
              return <Checkbox label={filter.name} onChange={handleChange} />;
            }
            if (filter.type === 'rangepicker'){
              return <RangePicker label={filter.name} onChange={handleChange} />;
            }
          })}
        </div>
    </div>
  );
}
