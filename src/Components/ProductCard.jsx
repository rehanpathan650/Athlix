// ProductCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = () => {
    // Temporary frontend cart in localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify([...existingCart, product]));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="border rounded-lg shadow-md overflow-hidden w-60">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="font-bold text-lg">{product.name}</h2>
        <p className="text-gray-600">${product.price}</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-3 py-1 rounded"
          >
            Add to Cart
          </button>
          <button
            onClick={handleViewDetails}
            className="border px-3 py-1 rounded"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
