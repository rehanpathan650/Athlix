import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { allProductsSelector } from "../state/allProductSelector";
import { userAtom } from "../state/userAtom";
import { cartAtom } from "../state/cartAtom";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom"; 
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const products = useRecoilValue(allProductsSelector);
  const user = useRecoilValue(userAtom);
  const setCart = useSetRecoilState(cartAtom);
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);

  const [quantity, setQuantity] = useState(1); // Track quantity

  if (!product) return <h2 className="text-center mt-20 text-xl">Product not found</h2>;

  const handleAddToCart = () => {
    if (!user) {
      toast.warn("Please login first to add items to your cart");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    setCart(prev => {
      const index = prev.findIndex(p => p.id === product.id);
      if (index !== -1) {
        // update existing quantity
        const newCart = [...prev];
        newCart[index] = { ...newCart[index], quantity: newCart[index].quantity + quantity };
        return newCart;
      }
      // add new product with quantity
      return [...prev, { ...product, quantity }];
    });

    toast.success(`${product.name} added to cart`);
  };


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-col md:flex-row gap-10 p-8 md:p-16 items-center md:items-start">
        {/* Product Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img src={product.image} alt={product.name} className="rounded-lg shadow-lg max-h-[500px] object-contain" />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl text-gray-700 font-semibold">${product.price}</p>
          <p className="text-gray-600">
            Experience unmatched comfort and performance with the {product.name}. Crafted with premium materials, it ensures durability, lightweight support, and a stylish look for everyday wear or intense workouts.
          </p>

          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              -
            </button>
            <span className="px-2">{quantity}</span>
            <button
              onClick={() => setQuantity(prev => prev + 1)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
