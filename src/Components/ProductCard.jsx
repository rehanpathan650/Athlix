import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`); // consider product.uniqueId if needed
  };

  return (
    <div className="rounded-lg shadow-md bg-gray-50 overflow-hidden w-full h-full hover:shadow-2xl
     transition flex flex-col">
  <img
    src={product.image}
    alt={product.name}
    className="w-full h-48 object-cover"
  />
  <div className="p-4 flex flex-col flex-1">
    <h2 className="font-bold text-lg truncate">{product.name}</h2>
    <p className="text-gray-600">${product.price}</p>
    <div className="mt-auto">
      <button
        onClick={handleViewDetails}
        className="w-full border border-gray-200 px-3 py-2 rounded hover:border-gray-400"
      >
        View Details
      </button>
    </div>
  </div>
</div>

  );
}

export default ProductCard;
