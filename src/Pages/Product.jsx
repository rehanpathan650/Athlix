import React from "react";
import { useRecoilValue } from "recoil";
import { allProductsSelector } from "../state/allProductSelector";
import ProductCard from "../Components/ProductCard";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Product() {
  const allProducts = useRecoilValue(allProductsSelector);

  return (
    <div className="min-h-screen flex flex-col gap-2">
      <Navbar />
      <div className="py-10 px-6">
        <h1 className="text-3xl font-bold mb-6">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Product;
