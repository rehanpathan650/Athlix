import { atom } from "recoil";
import nikePegasus from "../assets/nikePegasus.avif";
import pumaFuego from "../assets/pumaFuego.avif";
import nikeVomero from "../assets/nikeVomero.avif";
import deviatoNitro from "../assets/deviatoNitro.avif";
import deviatoNitroElite from "../assets/deviatoNitroElite.avif";
import nikeVaporfly from "../assets/nikeVaporfly.avif";
import pumaGalaxis from "../assets/pumaGalaxis.avif";
import nikeStructure from "../assets/nikeStructure.avif";
import nikeShoes from "../assets/nikerunning.avif"

export const runningShoes = atom({
  key: "runningShoes",
  default: [
    { id: "r1",type:"runner", name: "Nike Pegasus Premium", price: 120, image: nikePegasus },
    { id: "r2",type:"runner", name: "Puma Fuego", price: 80, image: pumaFuego },
    { id: "r3",type:"runner", name: "Puma Vomero", price: 100, image: nikeVomero },
    { id: "r4",type:"runner", name: "Puma deviato Nitro", price: 35, image: deviatoNitro },
    { id: "r5",type:"runner", name: "Puma Nitro Elite", price: 35, image: deviatoNitroElite },
    { id: "r6",type:"runner", name: "Nike Vaporfly", price: 45, image: nikeVaporfly },
    { id: "r7",type:"runner", name: "Nike Running Shoes", price: 110, image: nikeShoes },
    { id: "r8",type:"runner", name: "Puma Galaxis", price: 60, image: pumaGalaxis },
    { id: "r9",type:"runner", name: "Nike Structure", price: 25, image: nikeStructure }
  ],
});
