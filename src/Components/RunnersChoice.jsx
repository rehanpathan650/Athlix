import React, { useState, useEffect } from 'react';
import { useRecoilValue,useSetRecoilState } from 'recoil';
import { runnersAtom } from '../state/runnersAtom.js';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import ProductCard from './ProductCard.jsx';

function RunnersChoice() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);
  const products = useRecoilValue(runnersAtom);
  const setProducts = useSetRecoilState(runnersAtom)

  // Example: filter products for runners
  const runnersProducts = products;

  // Responsive visible count
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) setVisibleCount(1);      // mobile
      else if (window.innerWidth < 1024) setVisibleCount(3); // tablet
      else setVisibleCount(5);                              // desktop
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

   useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(15, 26)))
      .catch((err) => console.error("Error fetching products:", err));
  }, [setProducts]);

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

        <div className="flex-1 flex gap-4 sm:gap-6 overflow-hidden">
  {visibleProducts.map((product) => (
    <ProductCard key={product._id} product={product} />
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
