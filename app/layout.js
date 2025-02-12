import { Sora } from "next/font/google"
import "./globals.css"
import Header from "../components/Header"

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${sora.variable} font-sans bg-[#060611] text-white min-h-screen`}>
        <Header />
        <main className="">{children}</main>
      </body>
    </html>
  )
}

