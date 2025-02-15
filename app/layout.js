import { Sora } from "next/font/google"
import "./globals.css"
import Header from "../components/Header"
import WalletContextProvider from '../components/WalletContextProvider'

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
})

export const metadata = {
  title: "POTION Dashboard", 
  openGraph: {
    title: "POTION Dashboard", 
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "POTION Dashboard Image",
      },
    ],
  },
  twitter: {
    card: "POTION Dashboard",
    title: "POTION Dashboard",
    description: "POTION Dashboard",
    image: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${sora.variable} font-sans bg-[#060611] text-white min-h-screen`}>
        <WalletContextProvider>
          <Header />
          <main className="">{children}</main>
        </WalletContextProvider>
      </body>
    </html>
  )
}

