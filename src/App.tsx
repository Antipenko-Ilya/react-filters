import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { generateData } from './generateData';
import {Filter} from './Filter/Filter';
import {Content} from './Content/Content';
import style from './App.module.css';

const data = generateData();

export function App() {
  return (
    <div className={style.wrapper}>
      <Filter className={style.left} />
      <Content className={style.right} />
    </div>
  );
}
