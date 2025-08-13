import { ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const products = [
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
	},
	{
		id: 6,
		name: "Fio Elétrico 2,5mm 100m Flexível",
		price: 78.9,
		originalPrice: 95.9,
		image: "/placeholder.svg?height=300&width=300",
		rating: 4.8,
		reviews: 91,
		badge: "Oferta",
		badgeColor: "bg-red-500",
	},
];

export function FeaturedProducts() {
	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
						Produtos em Destaque
					</h2>
					<p className="text-xl text-slate-600 max-w-2xl mx-auto">
						Os produtos mais procurados pelos profissionais da construção
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{products.map((product) => (
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
											className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
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

								<div className="p-6">
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
													className={`h-4 w-4 ${
														i < Math.floor(product.rating)
															? "text-yellow-400 fill-current"
															: "text-slate-300"
													}`}
												/>
											))}
										</div>
										<span className="text-sm text-slate-600">
											{product.rating} ({product.reviews})
										</span>
									</div>

									<div className="flex items-center gap-2 mb-4">
										<span className="text-2xl font-bold text-slate-900">
											R$ {product.price.toFixed(2).replace(".", ",")}
										</span>
										{product.originalPrice && (
											<span className="text-sm text-slate-500 line-through">
												R$ {product.originalPrice.toFixed(2).replace(".", ",")}
											</span>
										)}
									</div>

									<Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
										<ShoppingCart className="h-4 w-4 mr-2" />
										Adicionar ao Carrinho
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="text-center mt-12">
					<Button
						size="lg"
						variant="outline"
						className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white bg-transparent"
						asChild
					>
						<Link href="/categoria/ferramentas">Ver Todos os Produtos</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
