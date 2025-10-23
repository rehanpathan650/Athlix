import React, { useState, useEffect } from "react";
import { useRecoilValue,useSetRecoilState } from "recoil";
import { productsAtom } from "../state/productsAtom";
import ProductCard from "./ProductCard";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

function FeaturedProducts() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5); // default desktop
  const products = useRecoilValue(productsAtom);
  const setProducts = useSetRecoilState(productsAtom);

  // Adjust visible count based on screen size
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1); // mobile
      } else if (window.innerWidth < 1024) {
        setVisibleCount(3); // tablet
      } else {
        setVisibleCount(5); // desktop
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
  fetch("https://athlix.vercel.app/api/products")
    .then(res => res.json())
    .then(data => setProducts(data.slice(0, 15)))
    .catch(err => console.error(err));
  }, []);

  const visibleProducts = products.slice(startIndex, startIndex + visibleCount);

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex + visibleCount < products.length) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className="py-8 px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 px-10 sm:px-10">
        Featured Products
      </h1>
      <div className="flex items-center gap-2">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="p-2 bg-gray-300 rounded disabled:opacity-50"
        >
          <FaArrowLeftLong />
        </button>

        {/* Products */}
        <div className="flex-1 flex gap-4 sm:gap-6 overflow-hidden">
          {visibleProducts.map((product) => (
            <div key={product.id} className="flex-1">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={startIndex + visibleCount >= products.length}
          className="p-2 bg-gray-300 rounded disabled:opacity-50"
        >
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
}

export default FeaturedProducts;
