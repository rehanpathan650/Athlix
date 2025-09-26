import { atom } from "recoil";
import hero1 from "../assets/hero1.jpg"
import hero2 from "../assets/hero2.jpg"
import hero3 from "../assets/hero3.jpg"

export const heroSlidesState = atom({
    key: "heroSlidesState",
    default: [
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
  }]
})