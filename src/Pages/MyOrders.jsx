import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ordersAtom } from "../state/ordersAtom";
import { userAtom } from "../state/userAtom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { toast } from "react-toastify";

export default function MyOrders() {
  const user = useRecoilValue(userAtom);
  const orders = useRecoilValue(ordersAtom);
  const setOrders = useSetRecoilState(ordersAtom);

  const userOrders = orders.filter(order => order.userId === user?.id);

  const handleCancelOrder = (orderId) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
    toast.success("Order cancelled successfully");
  };

  if (!user) return (
    <>
      <Navbar />
      <div className="text-center mt-20 text-xl">Please login to view your orders.</div>
      <Footer />
    </>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        {userOrders.length === 0 ? (
          <p>You haven't placed any orders yet.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {userOrders.map((order, index) => (
              <div key={index} className="border rounded p-4 shadow-md">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg">Order #{order.id} - {new Date(order.date).toLocaleString()}</h2>
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Cancel Order
                  </button>
                </div>
                <ul className="mt-2">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between py-1">
                      <span>{item.name} x {item.quantity}</span>
                      <span>${item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 font-bold text-right">Total: ${order.total}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
