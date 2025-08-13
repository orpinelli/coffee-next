import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
	return (
		<section className="py-16 bg-slate-900 text-white">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto text-center">
					<div className="mb-8">
						<Mail className="h-16 w-16 text-orange-500 mx-auto mb-4" />
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Fique por Dentro das Ofertas
						</h2>
						<p className="text-xl text-slate-300 max-w-2xl mx-auto">
							Receba em primeira mão nossas promoções exclusivas, lançamentos e
							dicas para sua obra.
						</p>
					</div>

					<div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
						<Input
							type="email"
							placeholder="Seu melhor e-mail"
							className="flex-1 bg-white text-slate-900 border-0 py-3"
						/>
						<Button className="bg-orange-600 hover:bg-orange-700 px-8 py-3">
							Cadastrar
						</Button>
					</div>

					<p className="text-sm text-slate-400 mt-4">
						Não enviamos spam. Você pode cancelar a qualquer momento.
					</p>
				</div>
			</div>
		</section>
	);
}
