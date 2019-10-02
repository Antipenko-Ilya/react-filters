import React from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import {Filter} from './Filter/Filter';

export type IControl = 'select' | 'checkbox' | 'colorpicker' | 'rangepicker';
export type IValue = null | string | boolean;

export type IFilter = {
  slug: string,
  name: string,
  type: IControl,
  values?: string[],
  defaultValue: IValue
}

export type IFilterValues = { [s: string]: IValue };

const filters: Array<IFilter> = [
  {
    slug: 'type',
    name: 'Тип',
    type: 'select',
    values: ['Верхняя одежда', 'Белье', 'Штанишки'],
    defaultValue: null,
  },
  {
    slug: 'stock',
    name: 'В наличии',
    type: 'checkbox',
    defaultValue: false,
  },
  {
    slug: 'calendar',
    name: 'Дата',
    type: 'rangepicker',
    defaultValue: null,
  }
];

export function App() {

  function handleChange(dict: IFilterValues): void {
    console.log(dict);
  }

  return (
    <div className="App">
      <Filter filters={filters} onChange={handleChange}/>
    </div>
  );
}
