"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { User, MapPin, Truck, CreditCard, Smartphone, FileText, Shield } from "lucide-react"

const states = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
]

const shippingOptions = [
  {
    id: "sedex",
    name: "SEDEX",
    description: "Entrega em 2-3 dias úteis",
    price: 25.9,
    icon: Truck,
  },
  {
    id: "pac",
    name: "PAC",
    description: "Entrega em 5-7 dias úteis",
    price: 15.9,
    icon: Truck,
  },
  {
    id: "expressa",
    name: "Entrega Expressa",
    description: "Entrega no mesmo dia (apenas SP capital)",
    price: 35.9,
    icon: Truck,
  },
]

const paymentMethods = [
  {
    id: "credit",
    name: "Cartão de Crédito",
    description: "Visa, Mastercard, Elo",
    icon: CreditCard,
  },
  {
    id: "pix",
    name: "PIX",
    description: "Pagamento instantâneo",
    icon: Smartphone,
  },
  {
    id: "boleto",
    name: "Boleto Bancário",
    description: "Vencimento em 3 dias úteis",
    icon: FileText,
  },
]

export function CheckoutForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Dados pessoais
    name: "",
    email: "",
    phone: "",
    cpf: "",

    // Endereço
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",

    // Frete
    shipping: "",

    // Pagamento
    payment: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",

    // Termos
    acceptTerms: false,
    newsletter: false,
  })

  const [isLoadingCep, setIsLoadingCep] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const searchCep = async (cep: string) => {
    if (cep.length === 8) {
      setIsLoadingCep(true)
      // Simular busca de CEP
      setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          street: "Rua das Flores",
          neighborhood: "Centro",
          city: "São Paulo",
          state: "SP",
        }))
        setIsLoadingCep(false)
      }, 1000)
    }
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Processar pedido
    console.log("Processando pedido:", formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep ? "bg-orange-600 text-white" : "bg-slate-200 text-slate-600"
              }`}
            >
              {step}
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${step <= currentStep ? "text-orange-600" : "text-slate-600"}`}>
                {step === 1 ? "Dados Pessoais" : step === 2 ? "Entrega" : "Pagamento"}
              </p>
            </div>
            {step < 3 && <div className={`w-16 h-0.5 mx-4 ${step < currentStep ? "bg-orange-600" : "bg-slate-200"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Dados Pessoais */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Dados Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Seu nome completo"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
              <div>
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange("cpf", e.target.value)}
                  placeholder="000.000.000-00"
                  required
                />
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Endereço de Entrega
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="cep">CEP *</Label>
                <Input
                  id="cep"
                  value={formData.cep}
                  onChange={(e) => {
                    handleInputChange("cep", e.target.value)
                    if (e.target.value.replace(/\D/g, "").length === 8) {
                      searchCep(e.target.value.replace(/\D/g, ""))
                    }
                  }}
                  placeholder="00000-000"
                  required
                />
                {isLoadingCep && <p className="text-sm text-slate-500 mt-1">Buscando CEP...</p>}
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="street">Endereço *</Label>
                <Input
                  id="street"
                  value={formData.street}
                  onChange={(e) => handleInputChange("street", e.target.value)}
                  placeholder="Rua, Avenida..."
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="number">Número *</Label>
                <Input
                  id="number"
                  value={formData.number}
                  onChange={(e) => handleInputChange("number", e.target.value)}
                  placeholder="123"
                  required
                />
              </div>
              <div>
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  value={formData.complement}
                  onChange={(e) => handleInputChange("complement", e.target.value)}
                  placeholder="Apto, Bloco..."
                />
              </div>
              <div>
                <Label htmlFor="neighborhood">Bairro *</Label>
                <Input
                  id="neighborhood"
                  value={formData.neighborhood}
                  onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                  placeholder="Centro"
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">Estado *</Label>
                <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="UF" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="city">Cidade *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder="São Paulo"
                required
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Entrega */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Opções de Entrega
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={formData.shipping} onValueChange={(value) => handleInputChange("shipping", value)}>
              <div className="space-y-4">
                {shippingOptions.map((option) => {
                  const IconComponent = option.icon
                  return (
                    <div
                      key={option.id}
                      className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-50"
                    >
                      <RadioGroupItem value={option.id} id={option.id} />
                      <IconComponent className="h-5 w-5 text-slate-600" />
                      <div className="flex-1">
                        <Label htmlFor={option.id} className="font-medium cursor-pointer">
                          {option.name}
                        </Label>
                        <p className="text-sm text-slate-600">{option.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">R$ {option.price.toFixed(2).replace(".", ",")}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Pagamento */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Forma de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={formData.payment} onValueChange={(value) => handleInputChange("payment", value)}>
                <div className="space-y-4">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon
                    return (
                      <div
                        key={method.id}
                        className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-50"
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <IconComponent className="h-5 w-5 text-slate-600" />
                        <div className="flex-1">
                          <Label htmlFor={method.id} className="font-medium cursor-pointer">
                            {method.name}
                          </Label>
                          <p className="text-sm text-slate-600">{method.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Dados do Cartão */}
          {formData.payment === "credit" && (
            <Card>
              <CardHeader>
                <CardTitle>Dados do Cartão</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Número do Cartão *</Label>
                  <Input
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                    placeholder="0000 0000 0000 0000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cardName">Nome no Cartão *</Label>
                  <Input
                    id="cardName"
                    value={formData.cardName}
                    onChange={(e) => handleInputChange("cardName", e.target.value)}
                    placeholder="Nome como está no cartão"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardExpiry">Validade *</Label>
                    <Input
                      id="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={(e) => handleInputChange("cardExpiry", e.target.value)}
                      placeholder="MM/AA"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardCvv">CVV *</Label>
                    <Input
                      id="cardCvv"
                      value={formData.cardCvv}
                      onChange={(e) => handleInputChange("cardCvv", e.target.value)}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Termos e Condições */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    Li e aceito os{" "}
                    <a href="#" className="text-orange-600 hover:underline">
                      termos de uso
                    </a>{" "}
                    e{" "}
                    <a href="#" className="text-orange-600 hover:underline">
                      política de privacidade
                    </a>
                    *
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                  />
                  <Label htmlFor="newsletter" className="text-sm leading-relaxed cursor-pointer">
                    Quero receber ofertas e novidades por e-mail
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          Voltar
        </Button>

        {currentStep < 3 ? (
          <Button type="button" onClick={nextStep} className="bg-orange-600 hover:bg-orange-700">
            Continuar
          </Button>
        ) : (
          <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={!formData.acceptTerms}>
            <Shield className="h-4 w-4 mr-2" />
            Finalizar Pedido
          </Button>
        )}
      </div>
    </form>
  )
}
