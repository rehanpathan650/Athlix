import { selector } from "recoil";
import { productsAtom } from "./productsAtom";
import { runningShoes } from "./runningShoes";

export const allProductsSelector = selector({
  key: "allProductsSelector",
  get: ({ get }) => {
    const products = get(productsAtom);
    const runners = get(runningShoes);
    return [...products, ...runners];
  },
});
