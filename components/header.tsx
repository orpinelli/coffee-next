"use client"

import { useState } from "react"
import { Search, ShoppingCart, Menu, X, Phone, Mail, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { itemCount } = useCart()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b">
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
              <span>contato@pradoo.com.br</span>
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
            <Link href="/">
              <h1 className="text-2xl font-bold text-orange-600 cursor-pointer hover:text-orange-700 transition-colors">
               Comercial<span className="text-slate-700">prado</span>
              </h1>
            </Link>
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

          {/* Cart, User and Menu */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Button variant="outline" className="relative bg-transparent" asChild>
              <Link href="/carrinho">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-orange-600 text-white animate-pulse">{itemCount}</Badge>
                )}
              </Link>
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-transparent">
                    <User className="h-5 w-5 mr-2" />
                    <span className="hidden sm:inline">{user.name.split(" ")[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/perfil">Meu Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/pedidos">Meus Pedidos</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" className="bg-transparent" asChild>
                <Link href="/login">
                  <User className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">Entrar</span>
                </Link>
              </Button>
            )}

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
              <Link href="/" className="hover:text-orange-600 font-medium transition-colors">
                Início
              </Link>
            </li>
            <li>
              <Link href="/categoria/ferramentas" className="hover:text-orange-600 font-medium transition-colors">
                Ferramentas
              </Link>
            </li>
            <li>
              <Link href="/categoria/materiais" className="hover:text-orange-600 font-medium transition-colors">
                Materiais
              </Link>
            </li>
            <li>
              <Link href="/categoria/eletrica" className="hover:text-orange-600 font-medium transition-colors">
                Elétrica
              </Link>
            </li>
            <li>
              <Link href="/categoria/hidraulica" className="hover:text-orange-600 font-medium transition-colors">
                Hidráulica
              </Link>
            </li>
            <li>
              <Link href="/categoria/tintas" className="hover:text-orange-600 font-medium transition-colors">
                Tintas
              </Link>
            </li>
            <li>
              <Link href="/ofertas" className="hover:text-orange-600 font-medium transition-colors">
                Ofertas
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
