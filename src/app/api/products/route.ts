import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// Đảm bảo secret key khớp với key bạn đã cấu hình trong .env
const JWT_SECRET = process.env.JWT_SECRET || 'prn232_assignment2_secret_key_2026';

// API GET: Ai cũng xem được danh sách sản phẩm
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || "";
  
  const products = await prisma.product.findMany({
    where: {
        name: { contains: search, mode: 'insensitive' }
    },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(products);
}

// API POST: Bắt buộc phải có Token hợp lệ mới được tạo sản phẩm
export async function POST(request: Request) {
  try {
    // 1. Lấy Token từ Cookie
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: Bạn cần đăng nhập để thực hiện hành động này!' }, { status: 401 });
    }

    // Xác thực Token
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: 'Invalid Token: Phiên đăng nhập không hợp lệ hoặc đã hết hạn.' }, { status: 401 });
    }

    // 2. Nếu token hợp lệ thì mới tiếp tục tạo sản phẩm
    const body = await request.json();
    const { name, description, price, image, category, stock } = body;

    if (!name || !price) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        category: category || "General",
        stock: parseInt(stock) || 0,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Create Product Error:", error);
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}