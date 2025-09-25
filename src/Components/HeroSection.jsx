import React, { useState, useEffect } from "react";
import hero1 from "../assets/hero1.jpg"
import hero2 from "../assets/hero2.jpg"
import hero3 from "../assets/hero3.jpg"

const slides = [
  {
    id: 1,
    image: hero1, // Replace with your image paths
    title: "Welcome to Athlix",
    subtitle: "Shop the latest sportswear and shoes",
    cta: "Shop Now",
  },
  {
    id: 2,
    image: hero2,
    title: "Upgrade Your Game",
    subtitle: "Exclusive deals on top brands",
    cta: "Shop Now",
  },
  {
    id: 3,
    image: hero3,
    title: "Feel the Comfort",
    subtitle: "Stylish and durable sneakers for everyone",
    cta: "Shop Now",
  },
];

function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Change slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <img
        src={currentSlide.image}
        alt={currentSlide.title}
        className="w-full h-full object-cover transition duration-700 z-1"
      />
      <div className="absolute inset-0 bg-opacity-30 flex flex-col justify-center items-start p-10 text-white">
        <h1 className="text-4xl font-bold mb-2">{currentSlide.title}</h1>
        <p className="text-lg mb-4">{currentSlide.subtitle}</p>
        <button className="bg-white text-black px-6 py-2 rounded font-semibold">
          {currentSlide.cta}
        </button>
      </div>
      {/* Optional navigation dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
