import { types, onSnapshot } from "mobx-state-tree"



const Filter = types
    .model("Filter", {
        slug: types.enumeration('Slug', ['type', 'color', 'size', 'inStock', 'dateReceipt']),
        name: types.string,
        type: types.enumeration('Type', ['select', 'checkbox', 'rangepicker']),
        values: types.maybe(types.array(types.string)),
        value: types.maybe(types.union(types.string)),
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

// create an instance from a snapshot
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
})

// listen to new snapshots
onSnapshot(filterStore, snapshot => {
    console.dir(snapshot)
})

// invoke action that modifies the tree
filterStore.filters[0].setValue('qwe');
// prints: `{ todos: [{ title: "Get coffee", done: true }]}`
