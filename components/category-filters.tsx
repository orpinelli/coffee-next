"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const brands = [
	"Bosch",
	"Makita",
	"DeWalt",
	"Black & Decker",
	"Vonder",
	"Tramontina",
	"Stanley",
	"Irwin",
	"Gedore",
	"Starrett",
];

const sortOptions = [
	{ value: "relevancia", label: "Mais Relevantes" },
	{ value: "menor-preco", label: "Menor Preço" },
	{ value: "maior-preco", label: "Maior Preço" },
	{ value: "mais-vendidos", label: "Mais Vendidos" },
	{ value: "melhor-avaliados", label: "Melhor Avaliados" },
];

interface CategoryFiltersProps {
	category: string;
	searchParams: Record<string, string | undefined>;
}

export function CategoryFilters({
	category,
	searchParams,
}: CategoryFiltersProps) {
	const router = useRouter();
	const currentSearchParams = useSearchParams();
	const [priceRange, setPriceRange] = useState([0, 1000]);

	const updateFilters = (key: string, value: string | null) => {
		const params = new URLSearchParams(currentSearchParams.toString());

		if (value === null || value === "") {
			params.delete(key);
		} else {
			params.set(key, value);
		}

		router.push(`/categoria/${category}?${params.toString()}`);
	};

	const clearFilters = () => {
		router.push(`/categoria/${category}`);
	};

	return (
		<div className="space-y-6">
			{/* Ordenação */}
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Ordenar por</CardTitle>
				</CardHeader>
				<CardContent>
					<Select
						value={searchParams.ordenar || "relevancia"}
						onValueChange={(value) => updateFilters("ordenar", value)}
					>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{sortOptions.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</CardContent>
			</Card>

			{/* Filtro de Preço */}
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Faixa de Preço</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-2">
						<div>
							<Label htmlFor="preco-min">Mínimo</Label>
							<Input
								id="preco-min"
								type="number"
								placeholder="R$ 0"
								value={searchParams.preco_min || ""}
								onChange={(e) => updateFilters("preco_min", e.target.value)}
							/>
						</div>
						<div>
							<Label htmlFor="preco-max">Máximo</Label>
							<Input
								id="preco-max"
								type="number"
								placeholder="R$ 1000"
								value={searchParams.preco_max || ""}
								onChange={(e) => updateFilters("preco_max", e.target.value)}
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Filtro de Marca */}
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Marcas</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-3 max-h-48 overflow-y-auto">
						{brands.map((brand) => (
							<div key={brand} className="flex items-center space-x-2">
								<Checkbox
									id={brand}
									checked={searchParams.marca === brand}
									onCheckedChange={(checked) =>
										updateFilters("marca", checked ? brand : null)
									}
								/>
								<Label
									htmlFor={brand}
									className="text-sm font-normal cursor-pointer"
								>
									{brand}
								</Label>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Limpar Filtros */}
			<Button
				variant="outline"
				onClick={clearFilters}
				className="w-full border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white bg-transparent"
			>
				Limpar Filtros
			</Button>
		</div>
	);
}
