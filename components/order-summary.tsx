"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Minus, Plus, X, Tag } from "lucide-react"
import { useState } from "react"

// Mock data do carrinho
const cartItems = [
  {
    id: 1,
    name: "Furadeira de Impacto Bosch GSB 550 RE",
    price: 299.9,
    originalPrice: 399.9,
    image: "/placeholder-dsz12.png",
    quantity: 1,
    category: "ferramentas",
  },
  {
    id: 2,
    name: "Kit Chaves de Fenda e Phillips 6 Peças",
    price: 45.9,
    originalPrice: 65.9,
    image: "/placeholder-420rd.png",
    quantity: 2,
    category: "ferramentas",
  },
]

export function OrderSummary() {
  const [items, setItems] = useState(cartItems)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setItems(items.filter((item) => item.id !== id))
    } else {
      setItems(items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "desconto10") {
      setAppliedCoupon("DESCONTO10")
      setCouponCode("")
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const savings = items.reduce((sum, item) => {
    const itemSavings = item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0
    return sum + itemSavings
  }, 0)
  const couponDiscount = appliedCoupon ? subtotal * 0.1 : 0
  const shipping = 25.9 // SEDEX padrão
  const total = subtotal - couponDiscount + shipping

  return (
    <div className="space-y-6">
      {/* Resumo do Pedido */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Resumo do Pedido
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg border"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-slate-900 text-sm line-clamp-2 mb-1">{item.name}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-slate-900">R$ {item.price.toFixed(2).replace(".", ",")}</span>
                  {item.originalPrice && (
                    <span className="text-xs text-slate-500 line-through">
                      R$ {item.originalPrice.toFixed(2).replace(".", ",")}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-slate-300 rounded">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="px-2 text-sm">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateQuantity(item.id, 0)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Cupom de Desconto */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Tag className="h-5 w-5" />
            Cupom de Desconto
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!appliedCoupon ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Digite seu cupom"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
              <Button
                onClick={applyCoupon}
                variant="outline"
                className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white bg-transparent"
              >
                Aplicar
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500">{appliedCoupon}</Badge>
                <span className="text-sm text-green-700">10% de desconto aplicado</span>
              </div>
              <Button variant="ghost" size="sm" onClick={removeCoupon} className="text-red-500 hover:text-red-700">
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Totais */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo de Valores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} itens)</span>
            <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
          </div>

          {savings > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Economia</span>
              <span>-R$ {savings.toFixed(2).replace(".", ",")}</span>
            </div>
          )}

          {couponDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Desconto cupom (10%)</span>
              <span>-R$ {couponDiscount.toFixed(2).replace(".", ",")}</span>
            </div>
          )}

          <div className="flex justify-between text-slate-600">
            <span>Frete</span>
            <span>R$ {shipping.toFixed(2).replace(".", ",")}</span>
          </div>

          <Separator />

          <div className="flex justify-between text-lg font-bold text-slate-900">
            <span>Total</span>
            <span>R$ {total.toFixed(2).replace(".", ",")}</span>
          </div>

          <div className="text-center text-sm text-slate-600 mt-2">
            Em até 12x de R$ {(total / 12).toFixed(2).replace(".", ",")} sem juros
          </div>
        </CardContent>
      </Card>

      {/* Segurança */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-green-600">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">Compra 100% Segura</span>
            </div>
            <p className="text-xs text-slate-600">Seus dados estão protegidos com certificado SSL</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
