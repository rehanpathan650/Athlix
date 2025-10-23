import { selector } from "recoil";
import { productsAtom } from "./productsAtom";
import { runnersAtom } from "./runnersAtom";

export const allProductsSelector = selector({
  key: "allProductsSelector",
  get: ({ get }) => {
    const products = get(productsAtom);
    const runners = get(runnersAtom);
    return [...products, ...runners];
  },
});
