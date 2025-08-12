import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckoutForm } from "@/components/checkout-form"
import { OrderSummary } from "@/components/order-summary"
import { Breadcrumb } from "@/components/breadcrumb"

export default function CheckoutPage() {
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
              ]}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Finalizar Pedido</h1>
            <p className="text-slate-600">Preencha os dados para concluir sua compra</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CheckoutForm />
            </div>
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
