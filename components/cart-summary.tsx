"use client";

import { RotateCcw, Shield, Truck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Mock data - em um app real, isso viria do contexto do carrinho
const cartData = {
	items: 4,
	subtotal: 420.7,
	savings: 120.0,
	shipping: 0, // Frete grátis
	total: 420.7,
};

export function CartSummary() {
	return (
		<div className="space-y-6">
			{/* Resumo de Valores */}
			<Card>
				<CardHeader>
					<CardTitle>Resumo do Pedido</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex justify-between text-slate-600">
						<span>Subtotal ({cartData.items} itens)</span>
						<span>R$ {cartData.subtotal.toFixed(2).replace(".", ",")}</span>
					</div>

					{cartData.savings > 0 && (
						<div className="flex justify-between text-green-600">
							<span>Economia</span>
							<span>-R$ {cartData.savings.toFixed(2).replace(".", ",")}</span>
						</div>
					)}

					<div className="flex justify-between text-slate-600">
						<span>Frete</span>
						<span className="text-green-600 font-medium">
							{cartData.shipping === 0
								? "Grátis"
								: `R$ ${cartData.shipping.toFixed(2).replace(".", ",")}`}
						</span>
					</div>

					<Separator />

					<div className="flex justify-between text-lg font-bold text-slate-900">
						<span>Total</span>
						<span>R$ {cartData.total.toFixed(2).replace(".", ",")}</span>
					</div>

					<div className="text-center text-sm text-slate-600">
						Em até 12x de R${" "}
						{(cartData.total / 12).toFixed(2).replace(".", ",")} sem juros
					</div>

					<Button
						className="w-full bg-orange-600 hover:bg-orange-700 text-white"
						size="lg"
						asChild
					>
						<Link href="/checkout">Finalizar Compra</Link>
					</Button>

					<Button variant="outline" className="w-full bg-transparent" size="lg">
						Calcular Frete
					</Button>
				</CardContent>
			</Card>

			{/* Benefícios */}
			<Card>
				<CardContent className="p-4">
					<div className="space-y-3">
						<div className="flex items-center gap-3">
							<Truck className="h-5 w-5 text-green-600" />
							<div>
								<p className="font-medium text-slate-900">Frete Grátis</p>
								<p className="text-sm text-slate-600">
									Para compras acima de R$ 299
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<Shield className="h-5 w-5 text-blue-600" />
							<div>
								<p className="font-medium text-slate-900">Compra Segura</p>
								<p className="text-sm text-slate-600">Seus dados protegidos</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<RotateCcw className="h-5 w-5 text-orange-600" />
							<div>
								<p className="font-medium text-slate-900">Troca Fácil</p>
								<p className="text-sm text-slate-600">7 dias para trocar</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Cupom de Desconto */}
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Cupom de Desconto</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex gap-2">
						<input
							type="text"
							placeholder="Digite seu cupom"
							className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
						/>
						<Button
							variant="outline"
							className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white bg-transparent"
						>
							Aplicar
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
