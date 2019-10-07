import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { generateData } from './generateData';
import {Filter} from './Filter/Filter';
import {Content} from './Content/Content';
import  { Product } from './generateData';
import style from './App.module.css';
import { filterStore } from './Store';
import { Provider } from 'mobx-react';
import { useLocalStore, useObserver, observer } from 'mobx-react';

export type IControl = 'select' | 'checkbox' | 'colorpicker' | 'rangepicker';
export type IValue = null | string | boolean | Moment
export type IFilterValue =  null | string | boolean | [Moment, Moment];

export type IFilter = {
  slug: string,
  name: string,
  type: IControl,
  values?: string[],
  defaultValue: IFilterValue
}
type filterKey = 'type' | 'color' | 'size' | 'inStock' | 'dateReceipt';
export type IFilterValues = { [s in filterKey]: IFilterValue };

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

function isOK(slug: filterKey, productFieldValue: IValue, filterValue: IFilterValue) {
  if (slug === 'dateReceipt') {
    if (!Array.isArray(filterValue) || productFieldValue === null || typeof productFieldValue === 'boolean') throw new Error('invalid moment array');
    const [start, end] = filterValue;
    return (!start || start.isBefore(productFieldValue)) && (!end || end.isAfter(productFieldValue));
  }
  if (slug === 'inStock') {
    return !filterValue || productFieldValue;
  }
  return productFieldValue === filterValue;
}
// https://github.com/bvaughn/react-virtualized

const App = () => {
  return (
    <Provider projectStore={filterStore}>
      <div className={style.wrapper}>
        <Filter className={style.left} />
        {/* <Content className={style.right} data={filtered}/> */}
      </div>
    </Provider>
  );
}
