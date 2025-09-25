import React from 'react'
import ProductCard from './ProductCard';
import nike from "../assets/nike.avif";
import puma from "../assets/puma.avif";
import reebok from "../assets/reebok.jpg";
import adidas from "../assets/adidas.avif";
import underArmour from "../assets/underarmour.avif";
import nikeShoes from "../assets/nikerunning.avif";
import adidasPants from "../assets/adidasPants";
import pumaSweatshirt from "../assets/pumaSweatshirt.avif";
import realMadrid from "../assets/RealMadrid.webp";
import realMadrid from "../assets/RealMadrid.webp";
import realMadrid from "../assets/RealMadrid.webp";
import realMadrid from "../assets/RealMadrid.webp";
import realMadrid from "../assets/RealMadrid.webp";
import realMadrid from "../assets/RealMadrid.webp";
import realMadrid from "../assets/RealMadrid.webp";
import realMadrid from "../assets/RealMadrid.webp";


const products = [
  {
    id: 1,
    name: "Nike Air Max",
    price: 120,
    image: nike,
  },
  {
    id: 2,
    name: "Adidas Hoodie",
    price: 80,
    image: puma,
  },
  {
    id: 3,
    name: "Puma Sneakers",
    price: 100,
    image: adidas,
  },
  {
    id: 4,
    name: "Reebok T-Shirt",
    price: 35,
    image: reebok,
  },
  {
    id: 4,
    name: "Real Madrid Jersey",
    price: 35,
    image: realMadrid,
  },
  { id: 6, name: "Under Armour Shorts", price: 45, image: underArmour },
  { id: 7, name: "Nike Running Shoes", price: 110, image: nikeShoes },
  { id: 8, name: "Adidas Track Pants", price: 60, image: adidasPants },
  { id: 9, name: "Puma Sweatshirt", price: 70, image: pumaSweatshirt },
  { id: 10, name: "Reebok Cap", price: 25, image: reebokCap },
  { id: 11, name: "Barcelona Jersey", price: 55, image: barcelona },
  { id: 12, name: "Nike Sports Socks", price: 15, image: nikeSocks },
  { id: 13, name: "Adidas Backpack", price: 65, image: adidasBackpack },
  { id: 14, name: "Puma Sports Watch", price: 120, image: pumaWatch },
  { id: 15, name: "Reebok Gym Gloves", price: 30, image: reebokGloves }
];

function FeaturedProducts() {
  return (
    <div className="py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
      <div className="flex flex-wrap gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
