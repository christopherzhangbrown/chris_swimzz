import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Chris Swimzz - D1 Swimmer & Content Creator",
  description:
    "Division 1 swimmer at Brown University sharing swimming insights and inspiring the next generation of swimmers.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={poppins.className} suppressHydrationWarning={true}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
