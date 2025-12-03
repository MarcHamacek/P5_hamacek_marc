import { NextResponse } from 'next/server';

import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import Camera from '@/lib/models/Camera';

type ProductWithImage = {
  imageUrl?: string;
  [key: string]: unknown;
};

const ORDERS_PATH = path.join(process.cwd(), 'data', 'orders.json');
const CART_PATH = path.join(process.cwd(), 'data', 'cart.json');

async function readJson(filePath: string) {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { error: 'Failed to read JSON from' + filePath },
      { status: 400 }
    );
  }
}

async function writeJson(filePath: string, data: unknown) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contact, products } = body;

    if (
      !contact ||
      !contact.firstName ||
      !contact.lastName ||
      !contact.address ||
      !contact.city ||
      !contact.email ||
      !products ||
      !Array.isArray(products) ||
      products.length === 0
    ) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    const productPromises = products.map(async (productId: string) => {
      const product = (await Camera.findById(
        productId
      ).lean()) as ProductWithImage;
      if (!product) throw new Error('Product not found: ' + productId);
      if (product.imageUrl)
        product.imageUrl = `${origin}/images/${product.imageUrl}`;
      return product;
    });

    const productsFull = await Promise.all(productPromises);

    const orderId = uuidv4();
    const order = {
      orderId,
      contact,
      products: productsFull,
      createdAt: new Date().toISOString(),
    };

    const existing = (await readJson(ORDERS_PATH)) || { orders: [] };
    existing.orders.push(order);
    await writeJson(ORDERS_PATH, existing);
    await writeJson(CART_PATH, { items: [] });

    return NextResponse.json(
      { contact, products: productsFull, orderId },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
