import React from 'react';
import  { Product } from '../generateData';
import 'react-virtualized/styles.css';
import { List } from 'react-virtualized';


type IProps = {
    data: Array<any>
}

type IRowObj = {
    key: string,
    index: number,
    isScrolling: boolean,
    isVisible: boolean,
    style: Object
}

function rowRenderer (row: IRowObj, data: Array<any>){
    console.log(row);
    const { key, index, isScrolling, isVisible, style } = row
    return (
      <div
        key={key}
        style={style}
      >
        {JSON.stringify(data[index])}
      </div>
    )
  }

export function Content(props: IProps) {
    return (
        <div>
            <List
                width={300}
                height={300}
                rowCount={props.data.length}
                rowHeight={20}
                rowRenderer={(row: IRowObj) => rowRenderer(row, props.data)}
            />
        </div>
    )
}

