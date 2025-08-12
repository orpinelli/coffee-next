"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  badge: string
  badgeColor: string
  brand: string
  sku: string
  availability: string
  description: string
}

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="space-y-6">
      {/* Badge e Marca */}
      <div className="flex items-center gap-3">
        <Badge className={`${product.badgeColor} text-white`}>{product.badge}</Badge>
        <span className="text-sm text-slate-600">Marca: {product.brand}</span>
      </div>

      {/* Nome do Produto */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{product.name}</h1>
        <p className="text-sm text-slate-500">SKU: {product.sku}</p>
      </div>

      {/* Avaliações */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-slate-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-slate-600">
          {product.rating} ({product.reviews} avaliações)
        </span>
      </div>

      {/* Preços */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-slate-900">R$ {product.price.toFixed(2).replace(".", ",")}</span>
          {product.originalPrice && (
            <>
              <span className="text-lg text-slate-500 line-through">
                R$ {product.originalPrice.toFixed(2).replace(".", ",")}
              </span>
              <Badge className="bg-red-500 text-white">-{discount}%</Badge>
            </>
          )}
        </div>
        <p className="text-sm text-green-600 font-medium">
          Em até 12x de R$ {(product.price / 12).toFixed(2).replace(".", ",")} sem juros
        </p>
      </div>

      {/* Disponibilidade */}
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-green-600 font-medium">{product.availability}</span>
      </div>

      {/* Descrição */}
      <div>
        <p className="text-slate-700 leading-relaxed">{product.description}</p>
      </div>

      {/* Quantidade e Ações */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-slate-700">Quantidade:</label>
          <div className="flex items-center border border-slate-300 rounded-lg">
            <Button variant="ghost" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3">
              -
            </Button>
            <span className="px-4 py-2 text-center min-w-[60px]">{quantity}</span>
            <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} className="px-3">
              +
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white" size="lg">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Adicionar ao Carrinho
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsFavorite(!isFavorite)}
            className={isFavorite ? "text-red-500 border-red-500" : ""}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
          <Button variant="outline" size="lg">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        <Button variant="outline" className="w-full bg-transparent" size="lg">
          Comprar Agora
        </Button>
      </div>

      {/* Benefícios */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-slate-900">Frete Grátis</p>
                <p className="text-sm text-slate-600">Para compras acima de R$ 199</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-slate-900">Garantia</p>
                <p className="text-sm text-slate-600">12 meses de garantia do fabricante</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-orange-600" />
              <div>
                <p className="font-medium text-slate-900">Troca Fácil</p>
                <p className="text-sm text-slate-600">7 dias para trocar ou devolver</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
