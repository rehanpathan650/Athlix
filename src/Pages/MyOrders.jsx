import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ordersAtom } from "../state/ordersAtom";
import { userAtom } from "../state/userAtom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { toast } from "react-toastify";

export default function MyOrders() {
  const user = useRecoilValue(userAtom);
  const [orders, setOrders] = useRecoilState(ordersAtom);

  // ✅ Fetch orders from backend
  useEffect(() => {
    if (!user) return;

    fetch(`https://athlix.vercel.app/api/orders/${user._id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch(() => toast.error("Failed to load orders"));
  }, [user, setOrders]);

  // ✅ Cancel Order API call
  const handleCancelOrder = async (orderId) => {
    try {
      const res = await fetch(`https://athlix.vercel.app/api/orders/cancel/${orderId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to cancel order");

      // Update frontend state
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
      toast.success("Order cancelled successfully");
    } catch (err) {
      console.error(err);
      toast.error("Error cancelling order");
    }
  };

  // ✅ If not logged in
  if (!user)
    return (
      <>
        <Navbar />
        <div className="text-center mt-20 text-xl">
          Please login to view your orders.
        </div>
        <Footer />
      </>
    );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <p>You haven't placed any orders yet.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div key={order._id} className="border rounded p-4 shadow-md hover:shadow-lg transition">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold text-lg">
                    Order #{order._id.slice(-5)} •{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </h2>

                  {order.status === "Pending" ? (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Cancel Order
                    </button>
                  ) : (
                    <span className="text-sm text-gray-600 italic">
                      Cannot cancel ({order.status})
                    </span>
                  )}
                </div>

                <ul className="mt-2 border-t pt-2">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between py-1">
                      <span>
                        {item.product?.name} × {item.quantity}
                      </span>
                      <span>${(item.product?.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-2 font-bold text-right">
                  Total: ${order.totalPrice.toFixed(2)}
                </p>
                <p className="text-right text-gray-500 text-sm">
                  Status: {order.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
