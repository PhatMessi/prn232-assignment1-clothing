import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'prn232_assignment2_secret_key_2026';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Tìm user trong database
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Sai email hoặc mật khẩu' }, { status: 401 });
    }

    // Kiểm tra mật khẩu có khớp không
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Sai email hoặc mật khẩu' }, { status: 401 });
    }

    // Tạo JWT Token có thời hạn 1 ngày
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Trả về token và đồng thời lưu vào Cookie (để bảo mật các API khác sau này)
    const response = NextResponse.json({ message: 'Đăng nhập thành công', token }, { status: 200 });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 ngày
      path: '/',
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Lỗi server khi đăng nhập' }, { status: 500 });
  }
}