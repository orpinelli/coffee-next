import Image from "next/image";
import Link from "next/link";
import { api } from "@/data/api";
import { Product } from "@/data/types/product";
import type { Metadata } from "next";

async function getFeaturedProducts(): Promise<Product[]> {
    const response = await api("/products/featured", {
      cache: "no-cache",
    });
  const products = await response.json();

  return products;
}

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts();
  console.log(highlightedProduct.title, "img");
  return (
    <div className="grid max-h-[860px] grid-cols-9 grid-rows-6 gap-6 z-10">
      <Link
        href={`/product/${highlightedProduct.slug}`}
        className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
      >
        <Image
          src={highlightedProduct.image}
          className="group-hover:scale-110 trasnsition-trasnsform duration-500 rounded-lg"
          width={1020}
          height={1030}
          quality={100}
          alt=""
        />
        <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate"> {highlightedProduct.title}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold ">
            {highlightedProduct.price.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </Link>

      {otherProducts.map((product) => {
        return (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="z-10 group relative col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
          >
            <Image
              src={product.image}
              className="group-hover:scale-105 trasnsition-trasnsform duration-500"
              width={920}
              height={900}
              quality={100}
              alt=""
            />
            <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <span className="text-sm truncate"> {product.title}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold ">
                {product.price.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
