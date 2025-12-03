import { NextResponse } from 'next/server';

import fs from 'fs/promises';
import path from 'path';

const CART_PATH = path.join(process.cwd(), 'data', 'cart.json');

type CartItem = {
  productId: string;
  option?: string;
  quantity: number;
};

async function readCart(): Promise<{ items: CartItem[] }> {
  try {
    const raw = await fs.readFile(CART_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    NextResponse.json({ error: 'Failed to read cart' }, { status: 500 });
    return { items: [] };
  }
}

async function writeCart(cart: { items: CartItem[] }) {
  // ensure directory exists
  const dir = path.dirname(CART_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(CART_PATH, JSON.stringify(cart, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const cart = await readCart();
    return NextResponse.json(cart);
  } catch {
    return NextResponse.json({ error: 'Unable to read cart' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, option, quantity } = body || {};
    if (!productId) {
      return NextResponse.json(
        { error: 'productId is required' },
        { status: 400 }
      );
    }

    const qty = typeof quantity === 'number' && quantity > 0 ? quantity : 1;

    const cart = await readCart();
    const existing = cart.items.find(
      (it) => it.productId === productId && (it.option || '') === (option || '')
    );
    if (existing) {
      existing.quantity += qty;
    } else {
      cart.items.push({ productId, option, quantity: qty });
    }

    await writeCart(cart);
    return NextResponse.json({ ok: true, cart });
  } catch {
    return NextResponse.json(
      { error: 'API /api/cart POST error' },
      { status: 400 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    let body: { productId?: string; option?: string } = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }
    const { productId, option } = body || {};

    const cart = await readCart();
    if (!productId) {
      // clear cart
      const empty = { items: [] };
      await writeCart(empty);
      return NextResponse.json({ ok: true, cart: empty });
    }

    const filtered = cart.items.filter(
      (it) =>
        !(
          it.productId === productId &&
          (option ? (it.option || '') === option : true)
        )
    );
    const newCart = { items: filtered };
    await writeCart(newCart);
    return NextResponse.json({ ok: true, cart: newCart });
  } catch {
    return NextResponse.json(
      { error: 'API /api/cart DELETE error' },
      { status: 400 }
    );
  }
}
