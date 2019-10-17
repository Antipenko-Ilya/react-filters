import { types, Instance } from "mobx-state-tree"
import { productStore, ProductStore } from "./ProductStore";
import { filterStore, FilterStore} from "./FilterStore";


export const RootStore = types.model("RootStore", {
  productStore: ProductStore,
  filterStore: FilterStore
});

export const rootStore = RootStore.create({
  productStore,
  filterStore
});
