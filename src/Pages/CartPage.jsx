import React, { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { cartAtom } from "../state/cartAtom";
import { userAtom } from "../state/userAtom";
import { ordersAtom } from "../state/ordersAtom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_URL = "https://athlix.vercel.app/api/cart";

function CartPage() {
  const [cart, setCart] = useRecoilState(cartAtom);
  const user = useRecoilValue(userAtom);
  const setOrders = useSetRecoilState(ordersAtom);
  const navigate = useNavigate();
  const mergedRef = useRef(false); // Track if guest cart is merged

  // 1️⃣ Load cart initially and merge guest cart if logged in
  useEffect(() => {
    const fetchCart = async () => {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];

      if (user?._id) {
        try {
          const res = await fetch(`${API_URL}/${user._id}`);
          const serverData = await res.json();
          const serverCart = serverData.items || [];

          let mergedCart = [...serverCart];

          // Merge guest cart safely only once
          if (localCart.length && !mergedRef.current) {
            localCart.forEach((item) => {
              const existing = mergedCart.find(
                (i) => (i.product?._id || i._id) === (item.product?._id || item._id)
              );
              if (existing) {
                // Keep the higher quantity instead of adding blindly
                existing.quantity = Math.max(existing.quantity || 0, item.quantity || 1);
              } else {
                mergedCart.push(item);
              }
            });

            // Sync merged cart to server
            await Promise.all(
              mergedCart.map((item) =>
                fetch(`${API_URL}/update`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    userId: user._id,
                    productId: item.product?._id || item._id,
                    quantity: item.quantity || 1, // replace quantity
                  }),
                })
              )
            );

            localStorage.removeItem("cart");
            mergedRef.current = true;
          }

          setCart(mergedCart);
        } catch (err) {
          console.error("Error fetching cart:", err);
        }
      } else {
        setCart(localCart);
      }
    };

    fetchCart();
  }, [user]);

  if (cart.length === 0)
    return (
      <div>
        <Navbar />
        <div className="text-center mt-20 text-xl">Your cart is empty</div>
        <Footer />
      </div>
    );

  // ✅ Increase quantity
  const handleIncrease = async (index) => {
    const updated = cart.map((item, i) =>
      i === index ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCart(updated);

    const item = updated[index];
    if (user) {
      await fetch(`${API_URL}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          productId: item.product?._id || item._id,
          quantity: item.quantity,
        }),
      });
    } else {
      localStorage.setItem("cart", JSON.stringify(updated));
    }
  };

  // ✅ Decrease quantity
  const handleDecrease = async (index) => {
    const item = cart[index];
    if (item.quantity <= 1) return;

    const updated = cart.map((it, i) =>
      i === index ? { ...it, quantity: it.quantity - 1 } : it
    );
    setCart(updated);

    if (user) {
      await fetch(`${API_URL}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          productId: item.product?._id || item._id,
          quantity: item.quantity - 1,
        }),
      });
    } else {
      localStorage.setItem("cart", JSON.stringify(updated));
    }
  };

  // ✅ Remove item
  const handleRemove = async (index) => {
    const item = cart[index];
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    toast.info("Item removed from cart");

    if (user) {
      try {
        const res = await fetch(`${API_URL}/remove`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
            productId: item.product?._id || item._id,
          }),
        });

        if (!res.ok) toast.error("Failed to update server cart");
      } catch (err) {
        console.error("Remove error:", err);
        toast.error("Server error while removing item");
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  // ✅ Total price
  const totalPrice = cart.reduce(
    (acc, item) =>
      acc + (item.product?.price || item.price || 0) * (item.quantity || 1),
    0
  );

  // ✅ Place order
  const handlePlaceOrder = async () => {
    if (!user) {
      toast.warn("Please login to place order");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const orderPayload = {
      userId: user._id,
      items: cart.map((item) => ({
        product: item.product?._id || item._id,
        quantity: item.quantity || 1,
      })),
      totalPrice,
    };

    try {
      const res = await fetch("https://athlix.vercel.app/api/orders/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) throw new Error("Failed to place order");
      const savedOrder = await res.json();

      setCart([]);
      mergedRef.current = false;
      await fetch(`${API_URL}/clear/${user._id}`, { method: "POST" });

      setOrders((prev) => [...prev, savedOrder]);

      toast.success("Order placed successfully!");
      navigate("/my-orders");
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="p-8 flex flex-col gap-4">
        {cart.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border p-4 rounded shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product?.imageUrl || item.imageUrl}
                alt={item.product?.name || item.name}
                className="w-20 h-20 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-semibold">
                  {item.product?.name || item.name}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => handleDecrease(index)}
                    className="px-2 bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity || 1}</span>
                  <button
                    onClick={() => handleIncrease(index)}
                    className="px-2 bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-semibold">
                $
                {(
                  (item.product?.price || item.price || 0) *
                  (item.quantity || 1)
                ).toFixed(2)}
              </span>
              <button
                onClick={() => handleRemove(index)}
                className="text-red-500 text-sm mt-1"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-6 p-4 border rounded shadow">
          <span className="text-xl font-bold">
            Total: ${totalPrice.toFixed(2)}
          </span>
          <button
            onClick={handlePlaceOrder}
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CartPage;
