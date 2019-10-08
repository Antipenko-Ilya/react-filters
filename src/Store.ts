import { types, Instance } from "mobx-state-tree"
import moment, { Moment } from "moment";

export const momentDate = types.custom<string, Moment>({
    name: "momentDate",
    fromSnapshot(value: string): Moment {
      return moment(value);
    },
    toSnapshot(value: Moment): string {
      return value.toISOString();
    },
    // tslint:disable-next-line:no-any
    isTargetType(v: any) {
      return moment.isMoment(v);
    },
    // tslint:disable-next-line:no-any
    getValidationMessage(v: any) {
      if (moment.isMoment(v)) {
        return "Invalid moment object";
      }
      return "";
    }
});

const Filter = types
    .model("Filter", {
        slug: types.enumeration('Slug', ['type', 'color', 'size', 'inStock', 'dateReceipt']),
        name: types.string,
        type: types.enumeration('Type', ['select', 'checkbox', 'rangepicker']),
        values: types.maybe(types.array(types.string)),
        value: types.maybe(types.union(types.string, types.boolean, types.array(momentDate))),
    })
    .actions(self => ({
        setValue(value: any) {
            self.value = value;
        },
        getValue() {
            return self.value;
        }
    }))


const FilterStore = types.model("FilterStore", {
    filters: types.array(Filter)
})

export const filterStore = FilterStore.create({
    filters: [
        {
          slug: 'type',
          name: 'Тип',
          type: 'select',
          values: ['Верхняя одежда', 'Белье', 'Штанишки'],
        },
        {
          slug: 'inStock',
          name: 'В наличии',
          type: 'checkbox',
        },
        {
          slug: 'dateReceipt',
          name: 'Дата', 
          type: 'rangepicker',
        }
    ]
});

export const Product = types
    .model("Product", {
        id: types.number,
        name: types.string,
        color: types.string,
        type: types.enumeration('Type', ["Верхняя одежда" , "Белье" , "Штанишки" , "Ботинки" , "Головные уборы"]),
        size: types.enumeration('Type', ["S" , "M" , "L" , "XL"]),
        inStock: types.boolean,
        dateReceipt: momentDate
    });

const ProductStore = types.model("ProductStore", {
    loading: types.boolean,
    products: types.array(Product)
}).actions((self) => ({
    addProducts(arr: any[]) {
        self.products.push(...arr);
    },
    startLoading() {
        self.loading = true;
    },
    stopLoading() {
        self.loading = false;
    },
}))

export const productStore = ProductStore.create({
    loading: true,
    products: []
});

export type IProduct = Instance<typeof Product>;
export type IFilterKey = 'type' | 'color' | 'size' | 'inStock' | 'dateReceipt';
export type IFilterValue =  null | string | boolean | [Moment?, Moment?];
