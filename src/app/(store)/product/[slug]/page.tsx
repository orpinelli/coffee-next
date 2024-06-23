import { AddToCartButton } from "@/components/add-to-cart-button";
import { api } from "@/data/api";
import { Product } from "@/data/types/product";
import Image from "next/image";

interface ProductPros {
  params: {
    slug: string;
  };
}

const ONE_HOUR_FOR_REVALIDATION = 60 * 60;

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: ONE_HOUR_FOR_REVALIDATION,
    },
  });
  const products = await response.json();

  return products;
}

export async function generateMetadata({ params }: ProductPros) {
  const product = await getProduct(params.slug);
  return {
    title: product.title,
  };
}

export async function generateStaticParams() {
  const response = await api("/products/featured", {});
  const products: Product[] = await response.json();

  return products.map((product) => {
    return { slug: product.slug };
  });
}

export default async function ProductPage({ params }: ProductPros) {
  const INSTALLMENT_AMOUT = 12;
  const product = await getProduct(params.slug);

  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={product.image}
          alt=""
          width={1200}
          height={1200}
          quality={100}
        />
      </div>
      <div className="flex flex-col justify-center px-12 ">
        <h1 className="text-3x1 font-bold leading-tight">{product.title}</h1>
        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>
        <div className="mt-8 flex items-center gap-3 ">
          <span className="inline-block rounded-full bg-amber-400 font-semibold px-5 py-2.5">
            {product.price.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          <span className="text-sm text-zinc-400">
            Em ate 12x s/juros de{" "}
            {(product.price / INSTALLMENT_AMOUT).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanho</span>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              2kg
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              5kg
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              15kg
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              20kg
            </button>
          </div>
        </div>
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
}
