"use client"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartItems } from "@/components/cart-items"
import { CartSummary } from "@/components/cart-summary"
import { Breadcrumb } from "@/components/breadcrumb"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart } from "lucide-react"

export default function CartPage() {
  const { items } = useCart()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="bg-slate-50 py-4">
          <div className="container mx-auto px-4">
            <Breadcrumb
              items={[
                { label: "Início", href: "/" },
                { label: "Carrinho", href: "/carrinho" },
              ]}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Meu Carrinho</h1>
            <p className="text-slate-600">Revise seus produtos antes de finalizar a compra</p>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Seu carrinho está vazio</h2>
              <p className="text-gray-600 mb-6">Adicione produtos ao seu carrinho para continuar</p>
              <button
                onClick={() => router.push("/")}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="animate-in fade-in-50 duration-500">
                  <CartItems />
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="animate-in fade-in-50 duration-700">
                  <CartSummary />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
