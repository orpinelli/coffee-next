"use client";

import {
	CheckCircle,
	Clock,
	CreditCard,
	FileText,
	Shield,
	Smartphone,
} from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

interface PaymentMethodsProps {
	onPaymentSuccess: (paymentData: any) => void;
	isProcessing: boolean;
}

export function PaymentMethods({
	onPaymentSuccess,
	isProcessing,
}: PaymentMethodsProps) {
	const [selectedMethod, setSelectedMethod] = useState("credit-card");
	const [cardData, setCardData] = useState({
		number: "",
		name: "",
		expiry: "",
		cvv: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

	const validateCardData = () => {
		const newErrors: Record<string, string> = {};

		if (!cardData.number || cardData.number.length < 16) {
			newErrors.number = "Número do cartão inválido";
		}
		if (!cardData.name) {
			newErrors.name = "Nome é obrigatório";
		}
		if (!cardData.expiry || !/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
			newErrors.expiry = "Data inválida (MM/AA)";
		}
		if (!cardData.cvv || cardData.cvv.length < 3) {
			newErrors.cvv = "CVV inválido";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleCardInputChange = (field: string, value: string) => {
		let formattedValue = value;

		if (field === "number") {
			formattedValue = value.replace(/\D/g, "").slice(0, 16);
			formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, "$1 ");
		} else if (field === "expiry") {
			formattedValue = value.replace(/\D/g, "").slice(0, 4);
			if (formattedValue.length >= 2) {
				formattedValue =
					formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
			}
		} else if (field === "cvv") {
			formattedValue = value.replace(/\D/g, "").slice(0, 4);
		}

		setCardData({ ...cardData, [field]: formattedValue });
		if (errors[field]) {
			setErrors({ ...errors, [field]: "" });
		}
	};

	const handlePayment = () => {
		if (selectedMethod === "credit-card") {
			if (!validateCardData()) return;
		}

		onPaymentSuccess({
			method: selectedMethod,
			...(selectedMethod === "credit-card" && { cardData }),
		});
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Shield className="w-5 h-5 text-green-600" />
					Forma de Pagamento
				</CardTitle>
				<CardDescription>Escolha como deseja pagar seu pedido</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
					{/* Credit Card */}
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="credit-card" id="credit-card" />
							<Label
								htmlFor="credit-card"
								className="flex items-center gap-2 cursor-pointer"
							>
								<CreditCard className="w-4 h-4" />
								Cartão de Crédito
							</Label>
						</div>

						{selectedMethod === "credit-card" && (
							<div className="ml-6 space-y-4 p-4 border rounded-lg bg-gray-50">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="md:col-span-2">
										<Label htmlFor="card-number">Número do Cartão</Label>
										<Input
											id="card-number"
											placeholder="1234 5678 9012 3456"
											value={cardData.number}
											onChange={(e) =>
												handleCardInputChange("number", e.target.value)
											}
											className={errors.number ? "border-red-500" : ""}
										/>
										{errors.number && (
											<p className="text-sm text-red-500 mt-1">
												{errors.number}
											</p>
										)}
									</div>

									<div className="md:col-span-2">
										<Label htmlFor="card-name">Nome no Cartão</Label>
										<Input
											id="card-name"
											placeholder="Nome como está no cartão"
											value={cardData.name}
											onChange={(e) =>
												handleCardInputChange("name", e.target.value)
											}
											className={errors.name ? "border-red-500" : ""}
										/>
										{errors.name && (
											<p className="text-sm text-red-500 mt-1">{errors.name}</p>
										)}
									</div>

									<div>
										<Label htmlFor="card-expiry">Validade</Label>
										<Input
											id="card-expiry"
											placeholder="MM/AA"
											value={cardData.expiry}
											onChange={(e) =>
												handleCardInputChange("expiry", e.target.value)
											}
											className={errors.expiry ? "border-red-500" : ""}
										/>
										{errors.expiry && (
											<p className="text-sm text-red-500 mt-1">
												{errors.expiry}
											</p>
										)}
									</div>

									<div>
										<Label htmlFor="card-cvv">CVV</Label>
										<Input
											id="card-cvv"
											placeholder="123"
											value={cardData.cvv}
											onChange={(e) =>
												handleCardInputChange("cvv", e.target.value)
											}
											className={errors.cvv ? "border-red-500" : ""}
										/>
										{errors.cvv && (
											<p className="text-sm text-red-500 mt-1">{errors.cvv}</p>
										)}
									</div>
								</div>

								<div className="flex items-center gap-2 text-sm text-green-600">
									<Shield className="w-4 h-4" />
									Pagamento 100% seguro e criptografado
								</div>
							</div>
						)}
					</div>

					<Separator />

					{/* PIX */}
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="pix" id="pix" />
							<Label
								htmlFor="pix"
								className="flex items-center gap-2 cursor-pointer"
							>
								<Smartphone className="w-4 h-4" />
								PIX
							</Label>
						</div>

						{selectedMethod === "pix" && (
							<div className="ml-6 p-4 border rounded-lg bg-blue-50">
								<div className="flex items-center gap-2 text-blue-800 mb-2">
									<Clock className="w-4 h-4" />
									<span className="font-medium">Aprovação instantânea</span>
								</div>
								<p className="text-sm text-blue-700">
									Após confirmar o pedido, você receberá o código PIX para
									pagamento. O pedido será processado automaticamente após a
									confirmação do pagamento.
								</p>
							</div>
						)}
					</div>

					<Separator />

					{/* Boleto */}
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="boleto" id="boleto" />
							<Label
								htmlFor="boleto"
								className="flex items-center gap-2 cursor-pointer"
							>
								<FileText className="w-4 h-4" />
								Boleto Bancário
							</Label>
						</div>

						{selectedMethod === "boleto" && (
							<div className="ml-6 p-4 border rounded-lg bg-yellow-50">
								<div className="flex items-center gap-2 text-yellow-800 mb-2">
									<Clock className="w-4 h-4" />
									<span className="font-medium">
										Prazo de vencimento: 3 dias úteis
									</span>
								</div>
								<p className="text-sm text-yellow-700">
									O boleto será gerado após a confirmação do pedido. O prazo
									para processamento é de até 2 dias úteis após o pagamento.
								</p>
							</div>
						)}
					</div>
				</RadioGroup>

				<Separator />

				<div className="space-y-4">
					<Alert>
						<CheckCircle className="h-4 w-4" />
						<AlertDescription>
							Seus dados estão protegidos com criptografia SSL de 256 bits. Não
							armazenamos informações do seu cartão.
						</AlertDescription>
					</Alert>

					<Button
						onClick={handlePayment}
						className="w-full"
						size="lg"
						disabled={isProcessing}
					>
						{isProcessing ? "Processando pagamento..." : "Finalizar Pagamento"}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
