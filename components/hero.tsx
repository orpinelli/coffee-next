import { ArrowRight, CreditCard, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
	return (
		<section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white">
			<div className="container mx-auto px-4 py-16 md:py-24">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div>
						<h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
							Tudo para sua
							<span className="text-orange-500"> Construção</span>
						</h2>
						<p className="text-xl mb-8 text-slate-300 leading-relaxed">
							Ferramentas profissionais, materiais de qualidade e os melhores
							preços para seus projetos. Entrega rápida em todo o Brasil.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 mb-12">
							<Button
								size="lg"
								className="bg-orange-600 hover:bg-orange-700 text-lg px-8"
							>
								Ver Produtos
								<ArrowRight className="ml-2 h-5 w-5" />
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="text-white border-white hover:bg-white hover:text-slate-900 bg-transparent"
							>
								Catálogo 2024
							</Button>
						</div>
					</div>

					<div className="relative">
						<img
							src="/construction-warehouse.png"
							alt="Ferramentas e materiais de construção"
							className="rounded-lg shadow-2xl"
						/>
					</div>
				</div>

				{/* Features */}
				<div className="grid md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-slate-600">
					<div className="flex items-center gap-4">
						<div className="bg-orange-600 p-3 rounded-full">
							<Truck className="h-6 w-6" />
						</div>
						<div>
							<h3 className="font-semibold text-lg">Entrega Rápida</h3>
							<p className="text-slate-300">Frete grátis acima de R$ 299</p>
						</div>
					</div>

					<div className="flex items-center gap-4">
						<div className="bg-orange-600 p-3 rounded-full">
							<Shield className="h-6 w-6" />
						</div>
						<div>
							<h3 className="font-semibold text-lg">Garantia Total</h3>
							<p className="text-slate-300">Produtos com garantia de fábrica</p>
						</div>
					</div>

					<div className="flex items-center gap-4">
						<div className="bg-orange-600 p-3 rounded-full">
							<CreditCard className="h-6 w-6" />
						</div>
						<div>
							<h3 className="font-semibold text-lg">Parcelamento</h3>
							<p className="text-slate-300">Em até 12x sem juros</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
