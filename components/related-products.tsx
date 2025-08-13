import { ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Mock data para produtos relacionados
const relatedProductsData = [
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
	},
	{
		id: 5,
		name: "Martelo Unha 25mm Cabo Fibra",
		price: 32.9,
		originalPrice: null,
		image: "/placeholder.svg?height=300&width=300",
		rating: 4.5,
		reviews: 123,
		badge: "Qualidade",
		badgeColor: "bg-purple-500",
		category: "ferramentas",
	},
	{
		id: 9,
		name: "Broca para Concreto 8mm",
		price: 12.9,
		originalPrice: null,
		image: "/placeholder.svg?height=300&width=300",
		rating: 4.7,
		reviews: 89,
		badge: "Acessório",
		badgeColor: "bg-blue-500",
		category: "ferramentas",
	},
];

interface RelatedProductsProps {
	currentProductId: number;
	category: string;
}

export function RelatedProducts({
	currentProductId,
	category,
}: RelatedProductsProps) {
	// Filtrar produtos relacionados (mesma categoria, excluindo o produto atual)
	const relatedProducts = relatedProductsData.filter(
		(product) =>
			product.category === category && product.id !== currentProductId,
	);

	if (relatedProducts.length === 0) {
		return null;
	}

	return (
		<section>
			<div className="mb-8">
				<h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
					Produtos Relacionados
				</h2>
				<p className="text-slate-600">
					Outros produtos que podem interessar você
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{relatedProducts.map((product) => (
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
								<Badge
									className={`absolute top-3 left-3 ${product.badgeColor} text-white`}
								>
									{product.badge}
								</Badge>
								{product.originalPrice && (
									<Badge className="absolute top-3 right-3 bg-red-500 text-white">
										-
										{Math.round(
											((product.originalPrice - product.price) /
												product.originalPrice) *
												100,
										)}
										%
									</Badge>
								)}
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
													i < Math.floor(product.rating)
														? "text-yellow-400 fill-current"
														: "text-slate-300"
												}`}
											/>
										))}
									</div>
									<span className="text-xs text-slate-600">
										({product.reviews})
									</span>
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
								>
									<ShoppingCart className="h-4 w-4 mr-2" />
									Adicionar
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}
