import { types, Instance, onSnapshot, cast } from "mobx-state-tree"
import { momentDate } from "./Types";

export const Filter = types
    .model("Filter", {
        slug: types.enumeration('Slug', ['type', 'color', 'size', 'inStock', 'dateReceipt']),
        name: types.string,
        type: types.enumeration('Type', ['select', 'checkbox', 'rangepicker']),
        values: types.maybe(types.array(types.string)),
        value: types.maybe(types.union(types.string, types.boolean, types.array(momentDate))),
    })
    .actions(self => ({
        setValue(value: any) {
            console.log(value);
            self.value = value;
        },
        getValue() {
            return self.value;
        }
    }))


export const FilterStore = types.model("FilterStore", {
    filters: types.array(Filter)
})
.actions((self) => ({
    onChange(filterType: string, value: any) {
        const filter = self.filters.find(({ type }) => type === filterType);
        
        if (filter) {
            filter.setValue(value);
        }
    }
}))
.views((self) => ({
    get filtersMap() {
        return self.filters.reduce((acc, { slug, value }) => value === undefined ? acc : ({ ...acc, [slug]: value }), {});
    }
}));

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

onSnapshot(filterStore, snapshot => {
    console.dir(snapshot)
})