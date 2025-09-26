import { atom } from "recoil";

export const ordersAtom = atom({
  key: "ordersAtom",
  default: [],
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      // Load orders from localStorage
      const savedOrders = localStorage.getItem("orders");
      if (savedOrders) setSelf(JSON.parse(savedOrders));

      // Save orders to localStorage whenever updated
      onSet((newOrders) => {
        localStorage.setItem("orders", JSON.stringify(newOrders));
      });
    },
  ],
});
