import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProductGallery } from "@/components/product-gallery";
import { ProductInfo } from "@/components/product-info";
import { ProductTabs } from "@/components/product-tabs";
import { RelatedProducts } from "@/components/related-products";

// Mock data - em um app real, isso viria de uma API
const mockProducts = {
	"1": {
		id: 1,
		name: "Furadeira de Impacto Bosch GSB 550 RE",
		price: 299.9,
		originalPrice: 399.9,
		images: [
			"/furadeira-bosch-profissional.png",
			"/lateral-bosch-drill.png",
			"/bosch-drill-accessories.png",
			"/placeholder-ojg3b.png",
		],
		rating: 4.8,
		reviews: 156,
		badge: "Mais Vendido",
		badgeColor: "bg-green-500",
		category: "ferramentas",
		categoryName: "Ferramentas",
		brand: "Bosch",
		sku: "GSB550RE",
		availability: "Em estoque",
		description:
			"Furadeira de impacto profissional com motor de 550W, ideal para furação em alvenaria, madeira e metal. Possui mandril de 13mm e velocidade variável.",
		specifications: {
			Potência: "550W",
			Mandril: "13mm",
			Velocidade: "0-3000 rpm",
			Impactos: "0-48000 ipm",
			Peso: "1.8kg",
			Garantia: "12 meses",
			Voltagem: "220V",
		},
		features: [
			"Motor de 550W de alta performance",
			"Mandril de 13mm com travamento automático",
			"Velocidade variável com gatilho sensível",
			"Função impacto para alvenaria",
			"Empunhadura ergonômica antiderrapante",
			"Cabo de 2 metros",
		],
	},
	"2": {
		id: 2,
		name: "Cimento Portland CP II-E-32 50kg",
		price: 28.9,
		originalPrice: null,
		images: [
			"/saco-cimento-50kg.png",
			"/cimento-portland-votorantim.png",
			"/cimento-em-po.png",
		],
		rating: 4.6,
		reviews: 89,
		badge: "Oferta",
		badgeColor: "bg-red-500",
		category: "materiais",
		categoryName: "Materiais",
		brand: "Votorantim",
		sku: "CPII-E32-50",
		availability: "Em estoque",
		description:
			"Cimento Portland composto com escória, ideal para obras em geral, estruturas de concreto armado e argamassas.",
		specifications: {
			Tipo: "CP II-E-32",
			Peso: "50kg",
			Resistência: "32 MPa",
			Composição: "Clínquer + Escória",
			Aplicação: "Uso geral",
			Validade: "3 meses",
			Norma: "NBR 16697",
		},
		features: [
			"Alta resistência e durabilidade",
			"Ideal para concreto armado",
			"Boa trabalhabilidade",
			"Reduz o calor de hidratação",
			"Maior impermeabilidade",
			"Certificado pelo INMETRO",
		],
	},
	"3": {
		id: 3,
		name: "Parafusadeira Makita DF331D 12V",
		price: 189.9,
		originalPrice: 249.9,
		images: [
			"/placeholder-rv7x6.png",
			"/makita-cordless-screwdriver.png",
			"/makita-screwdriver-kit.png",
		],
		rating: 4.7,
		reviews: 203,
		badge: "Promoção",
		badgeColor: "bg-orange-500",
		category: "ferramentas",
		categoryName: "Ferramentas",
		brand: "Makita",
		sku: "DF331D",
		availability: "Em estoque",
		description:
			"Parafusadeira sem fio com bateria de 12V, ideal para montagem de móveis e trabalhos leves. Compacta e ergonômica.",
		specifications: {
			Voltagem: "12V",
			Bateria: "Li-ion 1.5Ah",
			Torque: "30 N.m",
			Mandril: "10mm",
			Peso: "1.1kg",
			Garantia: "12 meses",
			Carregador: "Incluso",
		},
		features: [
			"Bateria de lítio de longa duração",
			"Design compacto e leve",
			"LED para iluminação da área de trabalho",
			"Controle de torque em 21 posições",
			"Empunhadura antiderrapante",
			"Carregador rápido incluso",
		],
	},
	"4": {
		id: 4,
		name: "Martelo Demolidor Bosch GSH 11 VC",
		price: 1299.9,
		originalPrice: 1599.9,
		images: [
			"/placeholder.svg?height=400&width=400",
			"/placeholder.svg?height=400&width=400",
			"/placeholder.svg?height=400&width=400",
			"/placeholder.svg?height=400&width=400",
		],
		rating: 4.9,
		reviews: 78,
		badge: "Profissional",
		badgeColor: "bg-blue-500",
		category: "ferramentas",
		categoryName: "Ferramentas",
		brand: "Bosch",
		sku: "GSH11VC",
		availability: "Em estoque",
		description:
			"Martelo demolidor profissional de 1500W com sistema de vibração reduzida. Ideal para demolições pesadas em concreto e alvenaria.",
		specifications: {
			Potência: "1500W",
			Energia: "16.8 J",
			Frequência: "2900 bpm",
			Encaixe: "SDS-max",
			Peso: "10.1kg",
			Garantia: "24 meses",
			Voltagem: "220V",
		},
		features: [
			"Sistema de vibração reduzida",
			"Motor de 1500W de alta potência",
			"Encaixe SDS-max para ferramentas profissionais",
			"Punho auxiliar rotativo 360°",
			"Protetor contra pó",
			"Maleta de transporte inclusa",
		],
	},
	"5": {
		id: 5,
		name: "Tinta Acrílica Suvinil Branco 18L",
		price: 89.9,
		originalPrice: null,
		images: [
			"/placeholder.svg?height=400&width=400",
			"/placeholder.svg?height=400&width=400",
			"/placeholder.svg?height=400&width=400",
		],
		rating: 4.5,
		reviews: 134,
		badge: null,
		badgeColor: "",
		category: "tintas",
		categoryName: "Tintas",
		brand: "Suvinil",
		sku: "ACR-BR-18L",
		availability: "Em estoque",
		description:
			"Tinta acrílica premium para paredes internas e externas. Excelente cobertura e durabilidade, fácil aplicação.",
		specifications: {
			Tipo: "Acrílica",
			Volume: "18 litros",
			Cor: "Branco",
			Rendimento: "350 m²/galão",
			Secagem: "30 minutos",
			Diluição: "Água",
			Base: "Água",
		},
		features: [
			"Excelente poder de cobertura",
			"Resistente ao mofo e fungos",
			"Fácil limpeza com água e sabão",
			"Secagem rápida",
			"Baixo odor",
			"Certificada pelo INMETRO",
		],
	},
	"6": {
		id: 6,
		name: "Tijolo Cerâmico 6 Furos 9x14x19cm",
		price: 0.89,
		originalPrice: null,
		images: [
			"/placeholder.svg?height=400&width=400",
			"/placeholder.svg?height=400&width=400",
			"/placeholder.svg?height=400&width=400",
		],
		rating: 4.4,
		reviews: 267,
		badge: "Econômico",
		badgeColor: "bg-green-500",
		category: "materiais",
		categoryName: "Materiais",
		brand: "Cerâmica São João",
		sku: "TJ-6F-9x14x19",
		availability: "Em estoque",
		description:
			"Tijolo cerâmico de 6 furos, ideal para alvenaria de vedação. Excelente isolamento térmico e acústico.",
		specifications: {
			Dimensões: "9x14x19cm",
			Furos: "6 furos",
			Material: "Cerâmica",
			Peso: "2.8kg",
			Resistência: "2.5 MPa",
			Absorção: "22%",
			Norma: "NBR 15270",
		},
		features: [
			"Excelente isolamento térmico",
			"Boa resistência mecânica",
			"Facilita a passagem de instalações",
			"Reduz o peso da estrutura",
			"Matéria-prima sustentável",
			"Certificado pelo INMETRO",
		],
	},
};

interface ProductPageProps {
	params: {
		id: string;
	};
}

export default function ProductPage({ params }: ProductPageProps) {
	const product = mockProducts[params.id as keyof typeof mockProducts];

	if (!product) {
		notFound();
	}

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main>
				<div className="bg-slate-50 py-4">
					<div className="container mx-auto px-4">
						<Breadcrumb
							items={[
								{ label: "Início", href: "/" },
								{
									label: product.categoryName,
									href: `/categoria/${product.category}`,
								},
								{ label: product.name, href: `/produto/${product.id}` },
							]}
						/>
					</div>
				</div>

				<div className="container mx-auto px-4 py-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
						<ProductGallery
							images={product.images}
							productName={product.name}
						/>
						<ProductInfo product={product} />
					</div>

					<ProductTabs product={product} />
					<RelatedProducts
						currentProductId={product.id}
						category={product.category}
					/>
				</div>
			</main>
			<Footer />
		</div>
	);
}
