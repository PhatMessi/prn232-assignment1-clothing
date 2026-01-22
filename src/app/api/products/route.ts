import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 1. Lấy danh sách (GET)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || "";
  
  // Logic tìm kiếm cơ bản
  const products = await prisma.product.findMany({
    where: {
        name: { contains: search, mode: 'insensitive' }
    },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(products);
}

// 2. Tạo sản phẩm mới (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Lấy thêm category và stock từ body
    const { name, description, price, image, category, stock } = body;

    // Validate cơ bản
    if (!name || !price) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price), // Chuyển chuỗi thành số thực
        image,
        category: category || "General",
        stock: parseInt(stock) || 0, // Chuyển chuỗi thành số nguyên
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Create Product Error:", error);
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}