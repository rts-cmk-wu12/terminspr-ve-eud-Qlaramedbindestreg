"use client"
import Image from "next/image";
import Link from "next/link"
import "./page.scss";
import Button from "./components/button/button";

export default function Home() {
 


  return (
    <>
    <div className="splashscreen-container">
   
      <Image 
          src="/images/splash-image.jpg" 
          fill
          alt="Splash Image"
          className="background-image"
          priority // Add priority for above-the-fold images
          sizes="100vw" // Add sizes for proper responsive behavior
        />
   <div className="logo-container">
     <h1>
      <div className="logo-primary">Landrup</div>
      <div className="logo-secondary">Dans</div>
     </h1>
     <div className="logo-underline"></div>
   </div>
   
   <div className="button-container">
     <Link href="/aktiviteter">
     <Button className="splashscreen-button">Kom godt igang</Button>
     
     </Link>
   </div>
   
   </div>
    </>

  );
}
