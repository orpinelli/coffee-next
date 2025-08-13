"use client";

import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
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
import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const { login, isLoading } = useAuth();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!email || !password) {
			setError("Por favor, preencha todos os campos");
			return;
		}

		const success = await login(email, password);
		if (success) {
			router.push("/");
		} else {
			setError("Email ou senha incorretos");
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="mb-6">
					<Link
						href="/"
						className="inline-flex items-center text-sm text-gray-600 hover:text-orange-600 transition-colors"
					>
						<ArrowLeft className="w-4 h-4 mr-1" />
						Voltar para a loja
					</Link>
				</div>

				<Card>
					<CardHeader className="text-center">
						<CardTitle className="text-2xl font-bold text-gray-900">
							Entrar na sua conta
						</CardTitle>
						<CardDescription>
							Entre com seus dados para acessar sua conta
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-4">
							{error && (
								<Alert variant="destructive">
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							)}

							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<div className="relative">
									<Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
									<Input
										id="email"
										type="email"
										placeholder="seu@email.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="pl-10"
										required
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="password">Senha</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
									<Input
										id="password"
										type={showPassword ? "text" : "password"}
										placeholder="Sua senha"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="pl-10 pr-10"
										required
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
									>
										{showPassword ? (
											<EyeOff className="h-4 w-4" />
										) : (
											<Eye className="h-4 w-4" />
										)}
									</button>
								</div>
							</div>

							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? "Entrando..." : "Entrar"}
							</Button>
						</form>

						<div className="mt-6 text-center">
							<p className="text-sm text-gray-600">
								Não tem uma conta?{" "}
								<Link
									href="/registro"
									className="text-orange-600 hover:text-orange-700 font-medium"
								>
									Cadastre-se
								</Link>
							</p>
						</div>

						<div className="mt-4 p-4 bg-blue-50 rounded-lg">
							<p className="text-sm text-blue-800 font-medium mb-2">
								Dados para teste:
							</p>
							<p className="text-xs text-blue-700">
								Email: joao@email.com
								<br />
								Senha: 123456
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
