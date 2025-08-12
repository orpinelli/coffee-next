import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-orange-500 mb-4">Comercial Prado</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Sua loja especializada em materiais de construção, ferramentas e equipamentos profissionais.
            </p>
            <div className="flex gap-4">
              <Facebook className="h-6 w-6 text-slate-400 hover:text-orange-500 cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-slate-400 hover:text-orange-500 cursor-pointer transition-colors" />
              <Youtube className="h-6 w-6 text-slate-400 hover:text-orange-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">
                  Catálogo
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">
                  Ofertas
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">
                  Ferramentas
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">
                  Materiais
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">
                  Elétrica
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">
                  Hidráulica
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors">
                  Tintas
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-orange-500" />
                <span className="text-slate-300 text-sm">
                  Rua das Construções, 123
                  <br />
                  São Paulo - SP
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-orange-500" />
                <span className="text-slate-300">(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-orange-500" />
                <span className="text-slate-300">contato@prado.com.br</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400">© 2024 Comercial Prado. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
