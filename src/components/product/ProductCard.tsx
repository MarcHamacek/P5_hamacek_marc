import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="border rounded-lg p-4 hover:shadow-lg transition">
        <Image
          src={`/images/${product.imageUrl}`}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-48 object-cover mb-4"
        />
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-600">{product.price / 100}€</p>
      </div>
    </Link>
  );
}
