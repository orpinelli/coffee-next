import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto_Slab } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-slab",
})

export const metadata: Metadata = {
  title: "Comercial Prado - Materiais de Construção e Ferramentas",
  description:
    "Sua loja especializada em materiais de construção, ferramentas e equipamentos profissionais. Os melhores preços e qualidade garantida.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${robotoSlab.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
