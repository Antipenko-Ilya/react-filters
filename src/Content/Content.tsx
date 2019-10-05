import React from 'react';
import  { Product } from '../generateData';
import 'react-virtualized/styles.css';
// import { List } from 'react-virtualized';
import { Column, Table } from 'react-virtualized';

type IProps = {
    data: Array<Product>,
    className: string
}

type IRowObj = {
    key: string,
    index: number,
    isScrolling: boolean,
    isVisible: boolean,
    style: Object
}

export function Content({ data, className }: IProps) {
    return (
        <div className={className}>
            <Table
              width={1000}
              height={300}
              headerHeight={20}
              rowHeight={30}
              rowCount={data.length}
              rowGetter={({ index }: ({ index: number })) => data[index]}
            >
              <Column
                label='Id'
                dataKey='id'
                width={100}
              />
              <Column
                width={200}
                label='Name'
                dataKey='name'
              />
               <Column
                width={200}
                label='Type'
                dataKey='type'
              />
              <Column
                width={200}
                label='Size'
                dataKey='size'
              />

               <Column
                width={200}
                label='Color'
                dataKey='color'
              />
               <Column
                width={200}
                label='Date'
                dataKey='dateReceipt'
                cellRenderer={({ cellData }) => cellData.format('YYYY.MM.DD')}
              />
               <Column
                width={200}
                label='In stock'
                dataKey='inStock'
                cellRenderer={({ cellData }) => <input type="checkbox" disabled checked={cellData} />}
              />
            </Table>    
        </div>
    )
}

