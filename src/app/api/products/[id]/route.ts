import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 1. Lấy chi tiết 1 sản phẩm (GET)
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}

// 2. Cập nhật sản phẩm (PUT)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    // Thêm category và stock vào logic cập nhật
    const { name, description, price, image, category, stock } = body;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        category: category || "General", // Cập nhật danh mục
        stock: parseInt(stock) || 0,     // Cập nhật tồn kho
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
  }
}

// 3. Xóa sản phẩm (DELETE)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    
    // Kiểm tra xem sản phẩm có tồn tại không trước khi xóa
    const existingProduct = await prisma.product.findUnique({
        where: { id }
    });

    if (!existingProduct) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: 'Error deleting product' }, { status: 500 });
  }
}