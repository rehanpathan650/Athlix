import { atom } from "recoil";
import nike from "../assets/nike.avif";
import puma from "../assets/puma.avif";
import reebok from "../assets/reebok.jpg";
import adidas from "../assets/adidas.avif";
import underArmour from "../assets/underarmour.avif";
import adidasPants from "../assets/adidasPants.avif";
import nikeShoes from "../assets/nikerunning.avif";
import pumaSweatshirt from "../assets/pumaSweatshirt.avif";
import realMadrid from "../assets/RealMadrid.webp";
import reebokCap from "../assets/reebokCap.jpg";
import barcelona from "../assets/barcelona.jpg";
import pumaWatch from "../assets/pumaWatch.jpg";
import reebokGloves from "../assets/reebokGloves.jpg";
import nikeSocks from "../assets/nikeSocks.avif";
import adidasBackpack from "../assets/adidasBackpack.avif";

export const productsAtom = atom({
  key: "productsAtom",
  default: [
    { id: "p1",type:"product", name: "Nike Air Max", price: 120, image: nike },
    { id: "p2",type:"product", name: "Puma Sneakers", price: 80, image: puma },
    { id: "p3",type:"product", name: "Adidas Hoodie", price: 100, image: adidas },
    { id: "p4",type:"product", name: "Reebok T-Shirt", price: 35, image: reebok },
    { id: "p5",type:"product", name: "Real Madrid Jersey", price: 35, image: realMadrid },
    { id: "p6",type:"product", name: "Under Armour Shorts", price: 45, image: underArmour },
    { id: "p7",type:"product", name: "Nike Running Shoes", price: 110, image: nikeShoes },
    { id: "p8",type:"product", name: "Adidas Track Pants", price: 60, image: adidasPants },
    { id: "p9",type:"product", name: "Puma Sweatshirt", price: 70, image: pumaSweatshirt },
    { id: "p10",type:"product", name: "Reebok Cap", price: 25, image: reebokCap },
    { id: "p11",type:"product", name: "Barcelona Jersey", price: 55, image: barcelona },
    { id: "p12",type:"product", name: "Nike Sports Socks", price: 15, image: nikeSocks },
    { id: "p13",type:"product", name: "Adidas Backpack", price: 65, image: adidasBackpack },
    { id: "p14",type:"product", name: "Puma Sports Watch", price: 120, image: pumaWatch },
    { id: "p15",type:"product", name: "Reebok Gym Gloves", price: 30, image: reebokGloves },
  ],
});
