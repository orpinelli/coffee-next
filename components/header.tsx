"use client"

import { useState } from "react"
import { Search, ShoppingCart, Menu, X, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top bar */}
      <div className="bg-orange-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>(11) 99999-9999</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>contato@prado.com.br</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Frete grátis para compras acima de R$ 299</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-orange-600">
              Comercial<span className="text-slate-700">Prado</span>
            </h1>
          </div>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Buscar produtos, ferramentas, materiais..."
                className="w-full pl-4 pr-12 py-3 border-2 border-slate-200 focus:border-orange-500"
              />
              <Button size="sm" className="absolute right-1 top-1 bg-orange-600 hover:bg-orange-700">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Cart and Menu */}
          <div className="flex items-center gap-4">
            <Button variant="outline" className="relative bg-transparent">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 bg-orange-600 text-white">3</Badge>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden bg-transparent"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search bar - Mobile */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Buscar produtos..."
              className="w-full pl-4 pr-12 py-3 border-2 border-slate-200 focus:border-orange-500"
            />
            <Button size="sm" className="absolute right-1 top-1 bg-orange-600 hover:bg-orange-700">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? "block" : "hidden"} md:block mt-4`}>
          <ul className="flex flex-col md:flex-row gap-2 md:gap-8 text-slate-700">
            <li>
              <a href="#" className="hover:text-orange-600 font-medium">
                Início
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600 font-medium">
                Ferramentas
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600 font-medium">
                Materiais
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600 font-medium">
                Elétrica
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600 font-medium">
                Hidráulica
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600 font-medium">
                Tintas
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-600 font-medium">
                Ofertas
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
