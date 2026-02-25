import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'prn232_assignment2_secret_key_2026';

export async function POST(request: Request) {
  try {
    // 1. Kiểm tra xem người dùng đã đăng nhập chưa
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Vui lòng đăng nhập để tiến hành đặt hàng!' }, { status: 401 });
    }

    // Giải mã token để lấy ID của user
    let userId;
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
      userId = decoded.userId;
    } catch (err) {
      return NextResponse.json({ error: 'Phiên đăng nhập không hợp lệ!' }, { status: 401 });
    }

    // 2. Lấy dữ liệu giỏ hàng từ Frontend gửi lên
    const body = await request.json();
    const { cartItems, totalAmount } = body;

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'Giỏ hàng của bạn đang trống' }, { status: 400 });
    }

    // 3. Lưu đơn hàng vào Database (Dùng Transaction để đảm bảo tính toàn vẹn)
    const order = await prisma.order.create({
      data: {
        userId: userId,
        totalAmount: totalAmount,
        status: "PENDING", // Trạng thái mặc định là đang chờ xử lý
        items: {
          create: cartItems.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price // Lưu giá tại thời điểm mua
          }))
        }
      }
    });

    return NextResponse.json({ message: 'Đặt hàng thành công!', orderId: order.id }, { status: 201 });
  } catch (error) {
    console.error("Lỗi tạo đơn hàng:", error);
    return NextResponse.json({ error: 'Lỗi server khi xử lý đơn hàng' }, { status: 500 });
  }
}