import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 1. Lấy danh sách tất cả sản phẩm (GET)
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }, // Sắp xếp cái mới nhất lên đầu
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}

// 2. Tạo sản phẩm mới (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, image } = body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price), // Đảm bảo giá là số
        image,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}