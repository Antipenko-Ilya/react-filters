import React, { useEffect } from 'react';
import { Moment } from 'moment';
import  { generateData } from '../generateData';
import 'react-virtualized/styles.css';
import { useObserver } from 'mobx-react';
import { Column, Table } from 'react-virtualized';
import { filterStore, productStore, momentDate, IProduct, IFilterKey, IFilterValue } from '../Store';

type IProps = {
    className: string
}

function isOK(slug: string, product: IProduct, filterValue: IFilterValue) {
  const productFieldValue = product[slug as IFilterKey];
  if (slug === 'dateReceipt') {
    if (!Array.isArray(filterValue) || productFieldValue === null || typeof productFieldValue === 'boolean') throw new Error('invalid moment array');
    if (filterValue.length === 0) return true;
    const [start, end] = filterValue;
    return (!start || start.isBefore(productFieldValue)) && (!end || end.isAfter(productFieldValue));
  }
  if (slug === 'inStock') {
    return !filterValue || productFieldValue;
  }
  return productFieldValue === filterValue;
}

export function Content({ className }: IProps) {
    useEffect(() => {
      productStore.startLoading();
      setTimeout(() => {
        productStore.addProducts(generateData());
        productStore.stopLoading();
      }, 1000)
    }, []);

    return useObserver(() => {

      if (productStore.loading) {
        return (
          <div className={className}>
            LOADING
          </div>
        );
      }

      const query = filterStore.filters.reduce((acc, { slug, value }) => value === undefined ? acc : ({ ...acc, [slug]: value }), {});

      console.log(query);

      const filtered: IProduct[] = productStore.products.filter(product => Object.entries(query)
        .every(([key, value]) => isOK(key, product, value as IFilterValue)));
  
      return (
        <div className={className}>
            <Table
              width={1000}
              height={700}
              headerHeight={20}
              rowHeight={30}
              rowCount={filtered.length}
              rowGetter={({ index }: ({ index: number })) => filtered[index]}
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
  });
}

