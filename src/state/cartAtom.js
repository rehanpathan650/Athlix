import { atom } from "recoil";

export const cartAtom = atom({
  key: "cartAtom",
  default: [],
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      // Load cart from localStorage on init
      const savedCart = localStorage.getItem("cart");
      if (savedCart) setSelf(JSON.parse(savedCart));

      // Persist cart to localStorage whenever it changes
      onSet((newCart) => {
        localStorage.setItem("cart", JSON.stringify(newCart));
      });
    },
  ],
});


