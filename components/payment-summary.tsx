"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { Package, MapPin, User, CreditCard } from "lucide-react"

export function PaymentSummary() {
  const { items, total } = useCart()
  const { user } = useAuth()

  const shipping = 15.9
  const finalTotal = total + shipping

  return (
    <div className="space-y-6">
      {/* User Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="w-5 h-5" />
            Dados do Cliente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="font-medium">{user?.name}</p>
          <p className="text-sm text-gray-600">{user?.email}</p>
          {user?.phone && <p className="text-sm text-gray-600">{user.phone}</p>}
        </CardContent>
      </Card>

      {/* Delivery Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="w-5 h-5" />
            Endereço de Entrega
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user?.address ? (
            <div className="space-y-1 text-sm">
              <p>
                {user.address.street}, {user.address.number}
              </p>
              {user.address.complement && <p>{user.address.complement}</p>}
              <p>{user.address.neighborhood}</p>
              <p>
                {user.address.city} - {user.address.state}
              </p>
              <p>CEP: {user.address.zipCode}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-600">Endereço será solicitado na finalização</p>
          )}
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Package className="w-5 h-5" />
            Resumo do Pedido
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-600">Qtd: {item.quantity}</p>
                </div>
                <p className="font-medium text-sm">R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}</p>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>R$ {total.toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Frete</span>
              <span>R$ {shipping.toFixed(2).replace(".", ",")}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>R$ {finalTotal.toFixed(2).replace(".", ",")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Info */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-green-800">
            <CreditCard className="w-4 h-4" />
            <span className="text-sm font-medium">Pagamento Seguro</span>
          </div>
          <p className="text-xs text-green-700 mt-1">Seus dados são protegidos com criptografia SSL</p>
        </CardContent>
      </Card>
    </div>
  )
}
