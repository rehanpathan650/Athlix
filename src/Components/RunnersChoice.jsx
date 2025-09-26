import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {runningShoes} from '../state/runningShoes.js';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import ProductCard from './ProductCard.jsx';

function RunnersChoice() {
  const [startIndex, setStartIndex] = useState(0);
  const products = useRecoilValue(runningShoes);

  // Example: filter products for runners (customize as needed)
  const runnersProducts = products;
  
  const visibleCount = 5;
  const visibleProducts = runnersProducts.slice(startIndex, startIndex + visibleCount);

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex + visibleCount < runnersProducts.length) setStartIndex(startIndex + 1);
  };

  return (
    <div className="py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 px-10">Runner's Choice</h1>
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="p-2 bg-gray-300 rounded disabled:opacity-50"
        >
          <FaArrowLeftLong />
        </button>

        <div className="flex gap-6 overflow-hidden">
          {visibleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={startIndex + visibleCount >= runnersProducts.length}
          className="p-2 bg-gray-300 rounded disabled:opacity-50"
        >
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
}

export default RunnersChoice;
