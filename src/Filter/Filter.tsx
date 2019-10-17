import React, { useState, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import {Moment} from 'moment';
import { IMSTArray, ISimpleType } from "mobx-state-tree"
import {Select} from './Select';
import {Checkbox} from './Checkbox';
import {RangePicker} from './Rangepicker';
import {IFilterValue} from '../stores/Types';
import { rootStore } from '../stores/RootStore';
// select checkbox rangepicker colorpicker 

interface FilterProps {
  className: string
}

export const Filter: React.FunctionComponent<FilterProps> = ({ className }) => {
  return (
    <div className={className}>
        <div>
          {rootStore.filterStore.filters.map((filter) => {
            const onChange = (value: IFilterValue) => Boolean(console.log(value)) || filter.setValue(value);
            if (filter.type === 'select') {
              return <Select label={filter.name} values={filter.values as IMSTArray<ISimpleType<string>>} onChange={onChange} />;
            }
            if (filter.type === 'checkbox') {
              return <Checkbox label={filter.name} onChange={onChange} />;
            }
            if (filter.type === 'rangepicker'){
              return <RangePicker label={filter.name} onChange={onChange} />;
            }
          })}
        </div>
    </div>
  );
}
