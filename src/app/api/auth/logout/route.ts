import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Đăng xuất thành công' }, { status: 200 });
  // Xóa cookie token để đăng xuất
  response.cookies.delete('token');
  return response;
}