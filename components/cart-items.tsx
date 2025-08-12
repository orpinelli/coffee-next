"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, X, Heart } from "lucide-react"
import Link from "next/link"

// Mock data do carrinho
const initialCartItems = [
  {
    id: 1,
    name: "Furadeira de Impacto Bosch GSB 550 RE",
    price: 299.9,
    originalPrice: 399.9,
    image: "/placeholder-dsz12.png",
    quantity: 1,
    category: "ferramentas",
    brand: "Bosch",
    availability: "Em estoque",
  },
  {
    id: 2,
    name: "Kit Chaves de Fenda e Phillips 6 Peças",
    price: 45.9,
    originalPrice: 65.9,
    image: "/placeholder-420rd.png",
    quantity: 2,
    category: "ferramentas",
    brand: "Stanley",
    availability: "Em estoque",
  },
  {
    id: 3,
    name: "Cimento Portland CP II-E-32 50kg",
    price: 28.9,
    originalPrice: null,
    image: "/cement-bag.png",
    quantity: 1,
    category: "materiais",
    brand: "Votorantim",
    availability: "Em estoque",
  },
]

export function CartItems() {
  const [items, setItems] = useState(initialCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setItems(items.filter((item) => item.id !== id))
    } else {
      setItems(items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="space-y-4">
            <div className="text-6xl">🛒</div>
            <h3 className="text-xl font-semibold text-slate-900">Seu carrinho está vazio</h3>
            <p className="text-slate-600">Adicione produtos para continuar comprando</p>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link href="/">Continuar Comprando</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtos no Carrinho ({items.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 p-4 border border-slate-200 rounded-lg">
            <Link href={`/produto/${item.id}`}>
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg border cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>

            <div className="flex-1 space-y-3">
              <div>
                <Link href={`/produto/${item.id}`}>
                  <h3 className="font-semibold text-slate-900 hover:text-orange-600 transition-colors cursor-pointer">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-sm text-slate-600">Marca: {item.brand}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">{item.availability}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-900">
                      R$ {item.price.toFixed(2).replace(".", ",")}
                    </span>
                    {item.originalPrice && (
                      <>
                        <span className="text-sm text-slate-500 line-through">
                          R$ {item.originalPrice.toFixed(2).replace(".", ",")}
                        </span>
                        <Badge className="bg-red-500 text-white text-xs">
                          -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                        </Badge>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">
                    Subtotal: R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-300 rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-10 w-10 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 text-center min-w-[60px] font-medium">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-10 w-10 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-red-500">
                    <Heart className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-slate-500 hover:text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" asChild>
            <Link href="/">Continuar Comprando</Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => setItems([])}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Limpar Carrinho
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
