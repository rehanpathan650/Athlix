import { atom } from "recoil";
import hero1 from "../assets/hero1.jpg"
import hero2 from "../assets/hero2.jpg"
import hero3 from "../assets/hero3.jpg"

export const heroSlidesState = atom({
    key: "heroSlidesState",
    default: [
          {
    id: 1,
    image: "https://goonernews.com/blog/wp-content/uploads/2023/01/Bukayo-Saka.jpeg", // Replace with your image paths
    title: "Welcome to Athlix",
    subtitle: "Shop the latest sportswear and shoes",
    cta: "Shop Now",
  },
  {
    id: 2,
    image: "https://cdn.sanity.io/images/vxy259ii/production/184f460067a4b14fd5af6b11e8724616e4afff68-2700x1134.jpg?auto=format&crop=focalpoint&fit=crop&fp-x=0.761&fp-y=0.5&h=810&q=80&rect=0,0,2700,1134&w=1440",
    title: "Upgrade Your Game",
    subtitle: "Exclusive deals on top brands",
    cta: "Shop Now",
  },
  {
    id: 3,
    image: "https://visualhierarchy.co/wp-content/uploads/2016/09/nike-logo-meaning-featured-image.webp",
    title: "Feel the Comfort",
    subtitle: "Stylish and durable sneakers for everyone",
    cta: "Shop Now",
  }]
})