import { NextResponse } from 'next/server';

import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import Camera from '@/lib/models/Camera';
import connectDB from '@/lib/mongodb';

const ORDERS_PATH = path.join(process.cwd(), 'data', 'orders.json');
const CART_PATH = path.join(process.cwd(), 'data', 'cart.json');

async function readJson(filePath: string) {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to read JSON from', filePath, error);
    return null;
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

    // connect to DB and fetch product details
    await connectDB();

    const origin = new URL(request.url).origin;

    const productPromises = products.map(async (productId: string) => {
      const product = await Camera.findById(productId).lean();
      if (!product) throw new Error('Product not found: ' + productId);
      if ((product as any).imageUrl)
        (product as any).imageUrl =
          `${origin}/images/${(product as any).imageUrl}`;
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

    // clear server cart
    await writeJson(CART_PATH, { items: [] });

    return NextResponse.json(
      { contact, products: productsFull, orderId },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Failed to create order', error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
