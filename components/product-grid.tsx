"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { Star, ShoppingCart, Heart, Eye } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

// Mock data - em um app real, isso viria de uma API
const mockProducts = [
  {
    id: 1,
    name: "Furadeira de Impacto Bosch GSB 550 RE",
    price: 299.9,
    originalPrice: 399.9,
    image: "/placeholder-dsz12.png",
    rating: 4.8,
    reviews: 156,
    badge: "Mais Vendido",
    badgeColor: "bg-green-500",
    category: "ferramentas",
    brand: "Bosch",
  },
  {
    id: 2,
    name: "Cimento Portland CP II-E-32 50kg",
    price: 28.9,
    originalPrice: null,
    image: "/cement-bag.png",
    rating: 4.6,
    reviews: 89,
    badge: "Oferta",
    badgeColor: "bg-red-500",
    category: "materiais",
    brand: "Votorantim",
  },
  {
    id: 3,
    name: "Kit Chaves de Fenda e Phillips 6 Peças",
    price: 45.9,
    originalPrice: 65.9,
    image: "/placeholder-420rd.png",
    rating: 4.9,
    reviews: 234,
    badge: "Promoção",
    badgeColor: "bg-orange-500",
    category: "ferramentas",
    brand: "Stanley",
  },
  {
    id: 4,
    name: "Tinta Acrílica Premium Branca 18L",
    price: 189.9,
    originalPrice: 229.9,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 67,
    badge: "Desconto",
    badgeColor: "bg-blue-500",
    category: "tintas",
    brand: "Coral",
  },
  {
    id: 5,
    name: "Disjuntor Bipolar 25A",
    price: 32.9,
    originalPrice: null,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 123,
    badge: "Qualidade",
    badgeColor: "bg-purple-500",
    category: "eletrica",
    brand: "Schneider",
  },
  {
    id: 6,
    name: "Tubo PVC 100mm 6m",
    price: 78.9,
    originalPrice: 95.9,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 91,
    badge: "Oferta",
    badgeColor: "bg-red-500",
    category: "hidraulica",
    brand: "Tigre",
  },
  {
    id: 7,
    name: "Capacete de Segurança Branco",
    price: 25.9,
    originalPrice: null,
    image: "/safety-equipment-helmets-gloves.png",
    rating: 4.6,
    reviews: 78,
    badge: "EPI",
    badgeColor: "bg-yellow-500",
    category: "seguranca",
    brand: "3M",
  },
  {
    id: 8,
    name: "Parafusadeira Makita 12V",
    price: 189.9,
    originalPrice: 249.9,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 145,
    badge: "Top",
    badgeColor: "bg-green-500",
    category: "ferramentas",
    brand: "Makita",
  },
]

interface ProductGridProps {
  category: string
  searchParams: Record<string, string | undefined>
}

export function ProductGrid({ category, searchParams }: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const { addItem } = useCart()
  const productsPerPage = 12

  // Filtrar produtos por categoria
  let filteredProducts = mockProducts.filter((product) => product.category === category)

  // Aplicar filtros
  if (searchParams.marca) {
    filteredProducts = filteredProducts.filter(
      (product) => product.brand.toLowerCase() === searchParams.marca?.toLowerCase(),
    )
  }

  if (searchParams.preco_min) {
    filteredProducts = filteredProducts.filter((product) => product.price >= Number.parseFloat(searchParams.preco_min!))
  }

  if (searchParams.preco_max) {
    filteredProducts = filteredProducts.filter((product) => product.price <= Number.parseFloat(searchParams.preco_max!))
  }

  // Aplicar ordenação
  switch (searchParams.ordenar) {
    case "menor-preco":
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case "maior-preco":
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case "melhor-avaliados":
      filteredProducts.sort((a, b) => b.rating - a.rating)
      break
    case "mais-vendidos":
      filteredProducts.sort((a, b) => b.reviews - a.reviews)
      break
    default:
      // Manter ordem padrão (relevância)
      break
  }

  // Paginação
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })
    toast.success("Produto adicionado ao carrinho!")
  }

  return (
    <div>
      {/* Resultados */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-slate-600">
          Mostrando {startIndex + 1}-{Math.min(startIndex + productsPerPage, filteredProducts.length)} de{" "}
          {filteredProducts.length} produtos
        </p>
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {paginatedProducts.map((product) => (
          <Card
            key={product.id}
            className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200"
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <Link href={`/produto/${product.id}`}>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                  />
                </Link>
                <Badge className={`absolute top-3 left-3 ${product.badgeColor} text-white`}>{product.badge}</Badge>
                {product.originalPrice && (
                  <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </Badge>
                )}

                {/* Ações rápidas */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0" asChild>
                    <Link href={`/produto/${product.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <Link href={`/produto/${product.id}`}>
                  <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors cursor-pointer">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-600">({product.reviews})</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-slate-900">
                    R$ {product.price.toFixed(2).replace(".", ",")}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-500 line-through">
                      R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                    </span>
                  )}
                </div>

                <Button
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "bg-orange-600 hover:bg-orange-700" : ""}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Próxima
          </Button>
        </div>
      )}
    </div>
  )
}
