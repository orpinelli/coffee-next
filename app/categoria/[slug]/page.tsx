import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { CategoryFilters } from "@/components/category-filters";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProductGrid } from "@/components/product-grid";

const categoryData = {
	ferramentas: {
		name: "Ferramentas",
		description:
			"Ferramentas manuais e elétricas para todos os tipos de trabalho",
		totalProducts: 2500,
	},
	materiais: {
		name: "Materiais",
		description:
			"Materiais básicos para construção: cimento, areia, tijolos e mais",
		totalProducts: 1800,
	},
	eletrica: {
		name: "Elétrica",
		description:
			"Materiais elétricos: fios, tomadas, disjuntores e componentes",
		totalProducts: 3200,
	},
	hidraulica: {
		name: "Hidráulica",
		description:
			"Materiais hidráulicos: tubos, conexões, registros e acessórios",
		totalProducts: 1500,
	},
	tintas: {
		name: "Tintas",
		description: "Tintas, vernizes, pincéis e acessórios para pintura",
		totalProducts: 800,
	},
	seguranca: {
		name: "Segurança",
		description: "Equipamentos de proteção individual e segurança no trabalho",
		totalProducts: 600,
	},
};

interface CategoryPageProps {
	params: {
		slug: string;
	};
	searchParams: {
		ordenar?: string;
		preco_min?: string;
		preco_max?: string;
		marca?: string;
		pagina?: string;
	};
}

export default function CategoryPage({
	params,
	searchParams,
}: CategoryPageProps) {
	const category = categoryData[params.slug as keyof typeof categoryData];

	if (!category) {
		notFound();
	}

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main>
				<div className="bg-slate-50 py-8">
					<div className="container mx-auto px-4">
						<Breadcrumb
							items={[
								{ label: "Início", href: "/" },
								{ label: category.name, href: `/categoria/${params.slug}` },
							]}
						/>
						<div className="mt-6">
							<h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
								{category.name}
							</h1>
							<p className="text-lg text-slate-600 mb-2">
								{category.description}
							</p>
							<p className="text-sm text-slate-500">
								{category.totalProducts.toLocaleString()} produtos encontrados
							</p>
						</div>
					</div>
				</div>

				<div className="container mx-auto px-4 py-8">
					<div className="flex flex-col lg:flex-row gap-8">
						<aside className="lg:w-1/4">
							<CategoryFilters
								category={params.slug}
								searchParams={searchParams}
							/>
						</aside>
						<div className="lg:w-3/4">
							<ProductGrid category={params.slug} searchParams={searchParams} />
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export function generateStaticParams() {
	return Object.keys(categoryData).map((slug) => ({
		slug,
	}));
}
