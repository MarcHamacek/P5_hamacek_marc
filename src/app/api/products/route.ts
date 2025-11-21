import { NextResponse } from 'next/server';

import Camera from '@/lib/models/Camera';
import connectDB from '@/lib/mongodb';

export async function GET() {
  try {
    await connectDB();

    const [cameras] = await Promise.all([Camera.find()]);

    const products = [...cameras];

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: error + 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
