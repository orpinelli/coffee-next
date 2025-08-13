"use client";

import { Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Product {
	specifications: Record<string, string>;
	features: string[];
}

interface ProductTabsProps {
	product: Product;
}

const mockReviews = [
	{
		id: 1,
		author: "João Silva",
		rating: 5,
		date: "15/12/2024",
		title: "Excelente produto!",
		comment: "Furadeira muito boa, potente e com ótimo acabamento. Recomendo!",
		helpful: 12,
		notHelpful: 1,
	},
	{
		id: 2,
		author: "Maria Santos",
		rating: 4,
		date: "10/12/2024",
		title: "Boa qualidade",
		comment:
			"Produto de qualidade, chegou rápido e bem embalado. Única ressalva é que poderia vir com mais acessórios.",
		helpful: 8,
		notHelpful: 0,
	},
	{
		id: 3,
		author: "Pedro Costa",
		rating: 5,
		date: "05/12/2024",
		title: "Recomendo",
		comment:
			"Uso profissionalmente há 2 meses e está funcionando perfeitamente. Ótimo custo-benefício.",
		helpful: 15,
		notHelpful: 2,
	},
];

export function ProductTabs({ product }: ProductTabsProps) {
	const [activeTab, setActiveTab] = useState("description");

	return (
		<div className="mb-12">
			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="description">Descrição</TabsTrigger>
					<TabsTrigger value="specifications">Especificações</TabsTrigger>
					<TabsTrigger value="reviews">
						Avaliações ({mockReviews.length})
					</TabsTrigger>
				</TabsList>

				<TabsContent value="description" className="mt-6">
					<Card>
						<CardContent className="p-6">
							<h3 className="text-xl font-bold text-slate-900 mb-4">
								Características do Produto
							</h3>
							<ul className="space-y-2">
								{product.features.map((feature, index) => (
									<li key={index} className="flex items-start gap-2">
										<div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
										<span className="text-slate-700">{feature}</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="specifications" className="mt-6">
					<Card>
						<CardContent className="p-6">
							<h3 className="text-xl font-bold text-slate-900 mb-4">
								Especificações Técnicas
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{Object.entries(product.specifications).map(([key, value]) => (
									<div
										key={key}
										className="flex justify-between py-2 border-b border-slate-200"
									>
										<span className="font-medium text-slate-700">{key}:</span>
										<span className="text-slate-900">{value}</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="reviews" className="mt-6">
					<div className="space-y-6">
						{/* Resumo das Avaliações */}
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center gap-8">
									<div className="text-center">
										<div className="text-4xl font-bold text-slate-900">4.8</div>
										<div className="flex items-center justify-center gap-1 mt-1">
											{[...Array(5)].map((_, i) => (
												<Star
													key={i}
													className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-current" : "text-slate-300"}`}
												/>
											))}
										</div>
										<div className="text-sm text-slate-600 mt-1">
											156 avaliações
										</div>
									</div>
									<div className="flex-1">
										{[5, 4, 3, 2, 1].map((stars) => (
											<div key={stars} className="flex items-center gap-2 mb-1">
												<span className="text-sm text-slate-600 w-8">
													{stars}★
												</span>
												<div className="flex-1 bg-slate-200 rounded-full h-2">
													<div
														className="bg-yellow-400 h-2 rounded-full"
														style={{
															width: `${stars === 5 ? 70 : stars === 4 ? 20 : 5}%`,
														}}
													></div>
												</div>
												<span className="text-sm text-slate-600 w-8">
													{stars === 5
														? 109
														: stars === 4
															? 31
															: stars === 3
																? 8
																: stars === 2
																	? 5
																	: 3}
												</span>
											</div>
										))}
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Lista de Avaliações */}
						<div className="space-y-4">
							{mockReviews.map((review) => (
								<Card key={review.id}>
									<CardContent className="p-6">
										<div className="flex items-start justify-between mb-3">
											<div>
												<div className="flex items-center gap-2 mb-1">
													<span className="font-medium text-slate-900">
														{review.author}
													</span>
													<div className="flex items-center">
														{[...Array(5)].map((_, i) => (
															<Star
																key={i}
																className={`h-4 w-4 ${
																	i < review.rating
																		? "text-yellow-400 fill-current"
																		: "text-slate-300"
																}`}
															/>
														))}
													</div>
												</div>
												<p className="text-sm text-slate-600">{review.date}</p>
											</div>
										</div>
										<h4 className="font-medium text-slate-900 mb-2">
											{review.title}
										</h4>
										<p className="text-slate-700 mb-4">{review.comment}</p>
										<div className="flex items-center gap-4">
											<Button
												variant="ghost"
												size="sm"
												className="text-slate-600"
											>
												<ThumbsUp className="h-4 w-4 mr-1" />
												Útil ({review.helpful})
											</Button>
											<Button
												variant="ghost"
												size="sm"
												className="text-slate-600"
											>
												<ThumbsDown className="h-4 w-4 mr-1" />(
												{review.notHelpful})
											</Button>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
