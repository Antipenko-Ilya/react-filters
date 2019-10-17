import { types, Instance } from "mobx-state-tree"
import { momentDate } from "./Types";

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

export const ProductStore = types.model("ProductStore", {
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


