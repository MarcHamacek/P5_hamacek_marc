import { Hero, ProductCard } from '@/components';

type Product = {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
};

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
    cache: 'no-store',
  });
  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
