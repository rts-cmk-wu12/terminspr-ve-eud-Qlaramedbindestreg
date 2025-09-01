import Image from "next/image";
import Link from "next/link"
import "./page.scss";

export const metadata = {
  title: "Hjem",
}

export default function Home() {

  return (
    <>
    <div className="splashscreenContainer">
   
   <Image 
   src="/images/splash-image.jpg" 
   fill
   alt="Splash Image"
   className="backgroundImage">
   </Image>
   <div className="logoContainer">
     <h1>
      <div className="logoPrimary">Landrup</div>
      <div className="logoSecondary">Dans</div>
     </h1>
     <div className="logoUnderline"></div>
   </div>
   
   <div className="buttonContainer">
     <Link href="/aktiviteter">
     <button className="splashscreenButton">Kom godt igang</button>
     </Link>
   </div>
   
   </div>
    </>

  );
}
