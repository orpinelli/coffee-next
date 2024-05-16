import Image from "next/image";

export default function ProductPage() {
  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src="/graos-de-cafe.png"
          alt=""
          width={1000}
          height={1000}
          quality={100}
        />
      </div>
      <div className="flex flex-col justify-center px-12 ">
        <h1 className="text-3x1 font-bold leading-tight">Saco de Cafe</h1>
        <p className="mt-2 leading-relaxed text-zinc-400">
          Descricao do saco de cafe
        </p>
        <div className="mt-8 flex items-center gap-3 ">
          <span className="inline-block rounded-full bg-amber-400 font-semibold px-5 py-2.5">
            124
          </span>
          <span className="text-sm text-zinc-400">10x s/ juros de 12,4</span>
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
        <button
          type="button"
          className="mt-8 flex h-12 items-center justify-center rounded-full bg-orange-500 font-semibold text-white"
        >
          Adcionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
