import Image from 'next/image';

import ProductOptions from '@/components/product/ProductOptions';

async function getProduct(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
    { cache: 'no-store' }
  );
  return res.json();
}

async function addToCart(productId: string, option: string) {
  'use server';
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, option }),
  });
  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src={`/images/${product.imageUrl}`}
            alt={product.name}
            className="w-full rounded-lg"
            width={500}
            height={500}
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-blue-600 mb-4">{product.price / 100}€</p>
          <p className="mb-6">{product.description}</p>
          <ProductOptions product={product} addToCart={addToCart} />
        </div>
      </div>
    </main>
  );
}
