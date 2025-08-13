"use client";

import { CheckCircle, Clock, CreditCard, Home, Package } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/cart-context";

export default function OrderConfirmedPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { clearCart } = useCart();
	const [orderData, setOrderData] = useState<any>(null);

	useEffect(() => {
		const orderId = searchParams.get("order");
		if (orderId) {
			const savedOrder = localStorage.getItem(`order-${orderId}`);
			if (savedOrder) {
				const order = JSON.parse(savedOrder);
				setOrderData(order);
				// Clear cart after successful order
				clearCart();
			} else {
				router.push("/");
			}
		} else {
			router.push("/");
		}
	}, [searchParams, router, clearCart]);

	if (!orderData) {
		return (
			<div className="min-h-screen bg-background">
				<Header />
				<main className="container mx-auto px-4 py-8">
					<div className="text-center">Carregando...</div>
				</main>
				<Footer />
			</div>
		);
	}

	const getPaymentMethodName = (method: string) => {
		switch (method) {
			case "credit-card":
				return "Cartão de Crédito";
			case "pix":
				return "PIX";
			case "boleto":
				return "Boleto Bancário";
			default:
				return method;
		}
	};

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto">
					{/* Success Header */}
					<div className="text-center mb-8">
						<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<CheckCircle className="w-8 h-8 text-green-600" />
						</div>
						<h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
							Pedido Confirmado!
						</h1>
						<p className="text-gray-600">
							Seu pedido foi processado com sucesso. Você receberá um email com
							os detalhes.
						</p>
					</div>

					{/* Order Details */}
					<Card className="mb-6">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Package className="w-5 h-5" />
								Detalhes do Pedido
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-2 gap-4 text-sm">
								<div>
									<span className="text-gray-600">Número do Pedido:</span>
									<p className="font-medium">{orderData.id}</p>
								</div>
								<div>
									<span className="text-gray-600">Data:</span>
									<p className="font-medium">
										{new Date(orderData.createdAt).toLocaleDateString("pt-BR")}
									</p>
								</div>
								<div>
									<span className="text-gray-600">Status:</span>
									<p className="font-medium text-green-600">Confirmado</p>
								</div>
								<div>
									<span className="text-gray-600">Forma de Pagamento:</span>
									<p className="font-medium">
										{getPaymentMethodName(orderData.paymentMethod)}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Items */}
					<Card className="mb-6">
						<CardHeader>
							<CardTitle>Itens do Pedido</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{orderData.items.map((item: any) => (
									<div
										key={item.id}
										className="flex justify-between items-center"
									>
										<div className="flex-1">
											<p className="font-medium">{item.name}</p>
											<p className="text-sm text-gray-600">
												Quantidade: {item.quantity}
											</p>
										</div>
										<p className="font-medium">
											R${" "}
											{(item.price * item.quantity)
												.toFixed(2)
												.replace(".", ",")}
										</p>
									</div>
								))}
							</div>

							<Separator className="my-4" />

							<div className="space-y-2">
								<div className="flex justify-between text-sm">
									<span>Subtotal</span>
									<span>R$ {orderData.total.toFixed(2).replace(".", ",")}</span>
								</div>
								<div className="flex justify-between text-sm">
									<span>Frete</span>
									<span>R$ 15,90</span>
								</div>
								<Separator />
								<div className="flex justify-between font-bold">
									<span>Total</span>
									<span>
										R$ {(orderData.total + 15.9).toFixed(2).replace(".", ",")}
									</span>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Next Steps */}
					<Card className="mb-8">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Clock className="w-5 h-5" />
								Próximos Passos
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-3 text-sm">
								{orderData.paymentMethod === "pix" && (
									<div className="p-3 bg-blue-50 rounded-lg">
										<p className="font-medium text-blue-800">PIX</p>
										<p className="text-blue-700">
											O código PIX foi enviado para seu email. Efetue o
											pagamento para confirmar o pedido.
										</p>
									</div>
								)}
								{orderData.paymentMethod === "boleto" && (
									<div className="p-3 bg-yellow-50 rounded-lg">
										<p className="font-medium text-yellow-800">
											Boleto Bancário
										</p>
										<p className="text-yellow-700">
											O boleto foi enviado para seu email. Prazo de vencimento:
											3 dias úteis.
										</p>
									</div>
								)}
								{orderData.paymentMethod === "credit-card" && (
									<div className="p-3 bg-green-50 rounded-lg">
										<p className="font-medium text-green-800">
											Cartão de Crédito
										</p>
										<p className="text-green-700">
											Pagamento aprovado! Seu pedido será processado e enviado
											em breve.
										</p>
									</div>
								)}
								<p>
									• Você receberá um email de confirmação com todos os detalhes
								</p>
								<p>• Acompanhe o status do seu pedido na área "Meus Pedidos"</p>
								<p>• Prazo de entrega: 5 a 10 dias úteis</p>
							</div>
						</CardContent>
					</Card>

					{/* Actions */}
					<div className="flex flex-col sm:flex-row gap-4">
						<Button onClick={() => router.push("/")} className="flex-1">
							<Home className="w-4 h-4 mr-2" />
							Continuar Comprando
						</Button>
						<Button
							variant="outline"
							onClick={() => window.print()}
							className="flex-1"
						>
							<CreditCard className="w-4 h-4 mr-2" />
							Imprimir Pedido
						</Button>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
