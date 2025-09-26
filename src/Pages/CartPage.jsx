import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { cartAtom } from '../state/cartAtom';
import { userAtom } from '../state/userAtom';
import { ordersAtom } from '../state/ordersAtom';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const [cart, setCart] = useRecoilState(cartAtom);
  const user = useRecoilValue(userAtom);
  const setOrders = useSetRecoilState(ordersAtom);
  const navigate = useNavigate();

  if (cart.length === 0) return (
    <div>
      <Navbar />
      <div className="text-center mt-20 text-xl">Your cart is empty</div>
      <Footer />
    </div>
  );

  // Increase quantity
  const handleIncrease = (index) => {
  const newCart = cart.map((item, i) =>
    i === index ? { ...item, quantity: (item.quantity || 1) + 1 } : item
  );
  setCart(newCart);
};

const handleDecrease = (index) => {
  const newCart = cart.map((item, i) =>
    i === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
  );
  setCart(newCart);
};


  // Remove item
  const handleRemove = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    toast.info("Item removed from cart");
  };

  // Total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  // Place order
  const handlePlaceOrder = () => {
    if (!user) {
      toast.warn("Please login to place order");
      setTimeout(()=> navigate("/login"), 2000);
      return;
    }

    const order = {
      id: Date.now(),
      items: cart,
      total: totalPrice,
      date: new Date().toLocaleString(),
    };

    setOrders(prev => [...prev, order]);
    setCart([]); // empty cart after order
    toast.success("Order placed successfully!");
    navigate("/my-orders"); // redirect to orders page
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="p-8 flex flex-col gap-4">
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between items-center border p-4 rounded shadow">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-contain"/>
              <div className="flex flex-col">
                <span className="font-semibold">{item.name}</span>
                <div className="flex items-center gap-2 mt-1">
                  <button onClick={() => handleDecrease(index)} className="px-2 bg-gray-300 rounded">-</button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => handleIncrease(index)} className="px-2 bg-gray-300 rounded">+</button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-semibold">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
              <button onClick={() => handleRemove(index)} className="text-red-500 text-sm mt-1">Remove</button>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-6 p-4 border rounded shadow">
          <span className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</span>
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
  )
}

export default CartPage;
