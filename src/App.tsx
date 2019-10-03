import React, { useState } from 'react';
import moment from 'moment';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { generateData } from './generateData';

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
type filterKey = 'type' | 'color' | 'size' | 'inStock' | 'dateReceipt';
export type IFilterValues = { [s in filterKey]: IValue };

const filters: Array<IFilter> = [
  {
    slug: 'type',
    name: 'Тип',
    type: 'select',
    values: ['Верхняя одежда', 'Белье', 'Штанишки'],
    defaultValue: null,
  },
  {
    slug: 'inStock',
    name: 'В наличии',
    type: 'checkbox',
    defaultValue: false,
  },
  {
    slug: 'dateReceipt',
    name: 'Дата',
    type: 'rangepicker',
    defaultValue: null,
  }
];

// https://github.com/marak/Faker.js/

const data = generateData();

function isOK(slug, productFieldValue, filterValue) {
  if (slug === 'dateReceipt') {
    const [start, end] = filterValue;
    return start.isBefore(moment(productFieldValue)) && (!end || end.isAfter(moment(productFieldValue)));
  }
  if (slug === 'inStock') {
    return !filterValue || productFieldValue;
  }
  return productFieldValue === filterValue;
}

export function App() {
  const [query, setQuery] = useState({});
  function handleChange(dict: IFilterValues): void {
    setQuery(dict);
  }

  const filtered = data.filter(product => Object.entries(query as IFilterValues)
    .every(([key, value]) => isOK(key, product[key as filterKey], value)));

  console.table(filtered.map(({ dateReceipt, ...rest }) => ({ ...rest, date: dateReceipt.format('YYYY.MM.DD') })));

  // https://github.com/bvaughn/react-virtualized
  return (
    <div className="App">
      {/* <Table list={data.filter(x => x → query)} /> */}

      <Filter filters={filters} onChange={handleChange}/>
    </div>
  );
}
