"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"
import { PaymentMethods } from "@/components/payment-methods"
import { PaymentSummary } from "@/components/payment-summary"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function PaymentPage() {
  const { items, total } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Redirect if cart is empty or user is not logged in
    if (items.length === 0) {
      router.push("/carrinho")
      return
    }
    if (!user) {
      router.push("/login")
      return
    }
  }, [items, user, router])

  const handlePaymentSuccess = async (paymentData: any) => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate order ID
    const orderId = `PD${Date.now()}`

    // Store order data (in a real app, this would go to a backend)
    const orderData = {
      id: orderId,
      items,
      total,
      user,
      paymentMethod: paymentData.method,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem(`order-${orderId}`, JSON.stringify(orderData))

    // Redirect to success page
    router.push(`/pedido-confirmado?order=${orderId}`)
  }

  if (items.length === 0 || !user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {items.length === 0 ? "Seu carrinho está vazio." : "Você precisa estar logado para continuar."}
            </AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    )
  }

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
                { label: "Checkout", href: "/checkout" },
                { label: "Pagamento", href: "/pagamento" },
              ]}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Pagamento</h1>
            <p className="text-slate-600">Escolha a forma de pagamento e finalize sua compra</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PaymentMethods onPaymentSuccess={handlePaymentSuccess} isProcessing={isProcessing} />
            </div>
            <div className="lg:col-span-1">
              <PaymentSummary />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
