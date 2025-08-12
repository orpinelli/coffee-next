import { Card, CardContent } from "@/components/ui/card"
import { Hammer, Zap, Droplets, Paintbrush, HardHat } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Ferramentas",
    slug: "ferramentas", // added slug for navigation
    icon: Hammer,
    description: "Manuais e elétricas",
    image: "/construction-tools.png",
    count: "2.500+ produtos",
  },
  {
    name: "Materiais",
    slug: "materiais", // added slug for navigation
    icon: HardHat,
    description: "Cimento, areia, tijolos",
    image: "/cement-bricks.png",
    count: "1.800+ produtos",
  },
  {
    name: "Elétrica",
    slug: "eletrica", // added slug for navigation
    icon: Zap,
    description: "Fios, tomadas, disjuntores",
    image: "/placeholder-8io86.png",
    count: "3.200+ produtos",
  },
  {
    name: "Hidráulica",
    slug: "hidraulica", // added slug for navigation
    icon: Droplets,
    description: "Tubos, conexões, registros",
    image: "/plumbing-materials.png",
    count: "1.500+ produtos",
  },
  {
    name: "Tintas",
    slug: "tintas", // added slug for navigation
    icon: Paintbrush,
    description: "Tintas, vernizes, pincéis",
    image: "/placeholder-an34f.png",
    count: "800+ produtos",
  },
  {
    name: "Segurança",
    slug: "seguranca", // added slug for navigation
    icon: HardHat,
    description: "EPIs e equipamentos",
    image: "/safety-equipment-helmets-gloves.png",
    count: "600+ produtos",
  },
]

export function Categories() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nossas Categorias</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Encontre tudo que precisa para sua obra em nossas categorias especializadas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link key={category.name} href={`/categoria/${category.slug}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-orange-500">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 bg-orange-600 text-white p-2 rounded-full">
                        <IconComponent className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{category.name}</h3>
                      <p className="text-slate-600 mb-3">{category.description}</p>
                      <p className="text-sm text-orange-600 font-semibold">{category.count}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
