import { types, Instance } from "mobx-state-tree"
import { productStore, ProductStore, IProduct } from "./ProductStore";
import { filterStore, FilterStore} from "./FilterStore";
import { IFilterKey, IFilterValue } from './Types';

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

export const RootStore = types.model("RootStore", {
  productStore: ProductStore,
  filterStore: FilterStore
}).views(self => ({
  get filteredProducts() {
    return self.productStore.products.filter(product => Object.entries(self.filterStore.filtersMap)
    .every(([key, value]) => isOK(key, product, value as IFilterValue)));

  }
}))

export const rootStore = RootStore.create({
  productStore,
  filterStore
});
