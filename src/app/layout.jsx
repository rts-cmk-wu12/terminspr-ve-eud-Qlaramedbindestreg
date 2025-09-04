import "./globals.css";
import { Ubuntu, Roboto, Racing_Sans_One } from 'next/font/google'
import MenuWrapper from "./components/menu-wrapper/menu-wrapper";


//Kilde: https://nextjs.org/docs/app/getting-started/fonts

const ubuntu = Ubuntu({ 
  weight: '400',
  subsets: ['latin'], 
  variable: '--font-ubuntu' });

const roboto = Roboto({ 
   weight: '400',
  subsets: ['latin'], 
  variable: '--font-roboto' });
const racing = Racing_Sans_One({ 
  weight: '400',
  subsets: ['latin'], 
  variable: '--font-racing' });

export const metadata = {
  title: {
    title: "Landrup Dans",
   
  },
  description: "En danseskole der tilbyder deres kunder en digital oplevelse til danseaktiviteter",
};

export default function RootLayout({ children }) {


  
  return (
    <html lang="da" className={`${ubuntu.variable} ${roboto.variable} ${racing.variable}`}>
        <body>
          {children}
          <MenuWrapper></MenuWrapper>
        </body>
    </html>
  );
}
