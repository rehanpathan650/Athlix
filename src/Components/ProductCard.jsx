// ProductCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

   const handleViewDetails = () => {
    navigate(`/product/${product.id}`); // use uniqueId instead of id
  };

  return (
    <div className=" rounded-lg shadow-md bg-gray-50 overflow-hidden w-60 hover:shadow-2xl">
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
            onClick={handleViewDetails}
            className="border border-gray-200 px-3 py-1 rounded hover:border-gray-400"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
