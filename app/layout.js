import { Sora } from "next/font/google"
import "./globals.css"

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${sora.variable} font-sans bg-[#0A0B0F] text-white min-h-screen`}>{children}</body>
    </html>
  )
}

