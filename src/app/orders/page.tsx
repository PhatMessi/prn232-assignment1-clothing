import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { 
  LayoutDashboard, Package, Heart, MapPin, 
  Settings, LogOut, ChevronRight, ChevronLeft, Download
} from "lucide-react";

// Server Component: Lấy dữ liệu trực tiếp từ Database
export default async function OrdersPage() {
  // 1. Kiểm tra đăng nhập
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login'); // Chưa đăng nhập thì đuổi về trang login
  }

  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET || 'prn232_assignment2_secret_key_2026') as any;
  } catch (err) {
    redirect('/login');
  }

  // 2. Lấy danh sách đơn hàng của User này từ Database
  const orders = await prisma.order.findMany({
    where: { userId: user.userId },
    include: {
      items: {
        include: { product: true } // Lấy luôn thông tin sản phẩm trong từng order item
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  // Hàm format ngày giờ
  const formatDate = (date: Date) => new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(date);
  const formatTime = (date: Date) => new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(date);

  return (
    <div className="bg-[#f6f7f8] min-h-screen text-[#0f172a] font-sans flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex flex-col md:flex-row max-w-[1440px] mx-auto w-full p-4 md:p-8 gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#e2e8f0] shadow-sm">
            <div className="h-12 w-12 rounded-full bg-[#137fec] text-white flex items-center justify-center font-bold text-xl uppercase">
              {user.email[0]}
            </div>
            <div className="flex flex-col">
              <h1 className="text-[#0f172a] text-base font-semibold">{user.name || user.email.split('@')[0]}</h1>
              <p className="text-[#475569] text-xs">Member</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1 rounded-xl bg-white border border-[#e2e8f0] shadow-sm p-2">
            <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#475569] hover:bg-[#f6f7f8] hover:text-[#0f172a] transition-colors">
              <LayoutDashboard className="w-5 h-5" /> <span className="text-sm font-medium">Overview</span>
            </Link>
            <Link href="/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-50 text-[#137fec]">
              <Package className="w-5 h-5" /> <span className="text-sm font-medium">My Orders</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#475569] hover:bg-[#f6f7f8] hover:text-[#0f172a] transition-colors">
              <Heart className="w-5 h-5" /> <span className="text-sm font-medium">Wishlist</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#475569] hover:bg-[#f6f7f8] hover:text-[#0f172a] transition-colors">
              <MapPin className="w-5 h-5" /> <span className="text-sm font-medium">Addresses</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#475569] hover:bg-[#f6f7f8] hover:text-[#0f172a] transition-colors">
              <Settings className="w-5 h-5" /> <span className="text-sm font-medium">Settings</span>
            </Link>
            
            <div className="h-px bg-[#e2e8f0] my-1 mx-2"></div>
            
            <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
              <LogOut className="w-5 h-5" /> <span className="text-sm font-medium">Sign Out</span>
            </Link>
          </nav>

          <div className="rounded-xl bg-gradient-to-br from-[#137fec] to-blue-600 p-6 text-white shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-white opacity-10"></div>
            <div className="relative z-10">
              <p className="text-xs font-medium opacity-80 mb-1">New Collection</p>
              <h3 className="text-lg font-bold mb-3">Summer Essentials</h3>
              <Link href="/" className="inline-block text-xs bg-white text-[#137fec] px-3 py-1.5 rounded font-bold hover:bg-gray-100 transition-colors">
                Shop Now
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="flex-1 flex flex-col gap-6 min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-[#0f172a] mb-1">Order History</h2>
              <p className="text-[#475569]">Track current orders, view details, or download invoices.</p>
            </div>
            <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#137fec] hover:text-blue-700">
              <Download className="w-5 h-5" /> Download All Invoices
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pb-2">
            <button className="px-4 py-2 rounded-lg bg-[#0f172a] text-white text-sm font-medium shadow-sm">All Orders</button>
            <button className="px-4 py-2 rounded-lg bg-white text-[#475569] border border-[#e2e8f0] hover:border-[#137fec] text-sm font-medium transition-all">Processing</button>
            <button className="px-4 py-2 rounded-lg bg-white text-[#475569] border border-[#e2e8f0] hover:border-[#137fec] text-sm font-medium transition-all">Shipped</button>
            <button className="px-4 py-2 rounded-lg bg-white text-[#475569] border border-[#e2e8f0] hover:border-[#137fec] text-sm font-medium transition-all">Delivered</button>
          </div>

          {/* Orders Table */}
          <div className="rounded-xl border border-[#e2e8f0] bg-white shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#e2e8f0] bg-[#f6f7f8] text-xs uppercase text-[#475569] font-semibold tracking-wider">
                    <th className="px-6 py-4 min-w-[120px]">Order ID</th>
                    <th className="px-6 py-4 min-w-[140px]">Date Placed</th>
                    <th className="px-6 py-4 min-w-[120px]">Status</th>
                    <th className="px-6 py-4 min-w-[100px]">Total</th>
                    <th className="px-6 py-4 min-w-[140px]">Items Preview</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-[#475569]">
                        You haven't placed any orders yet. <Link href="/" className="text-[#137fec] hover:underline">Start shopping</Link>
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="group hover:bg-[#f6f7f8] transition-colors cursor-pointer">
                        <td className="px-6 py-4">
                          <span className="font-medium text-[#0f172a]">#ORD-{order.id.toString().padStart(4, '0')}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-[#475569]">{formatDate(order.createdAt)}</div>
                          <div className="text-xs text-gray-400">{formatTime(order.createdAt)}</div>
                        </td>
                        <td className="px-6 py-4">
                          {order.status === 'PENDING' ? (
                             <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                               <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span> Processing
                             </span>
                          ) : (
                             <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                               <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span> {order.status}
                             </span>
                          )}
                        </td>
                        <td className="px-6 py-4 font-semibold text-[#0f172a]">${order.totalAmount.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <div className="flex -space-x-3">
                            {order.items.slice(0, 3).map((item, idx) => (
                               <div key={idx} className="h-10 w-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden relative" title={item.product.name}>
                                 <Image src={item.product.image || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80"} alt={item.product.name} fill className="object-cover" />
                               </div>
                            ))}
                            {order.items.length > 3 && (
                                <div className="h-10 w-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-[#475569] z-10 relative">
                                  +{order.items.length - 3}
                                </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 rounded-lg text-[#475569] hover:bg-gray-200 hover:text-[#137fec] transition-colors">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {orders.length > 0 && (
                <div className="px-6 py-4 border-t border-[#e2e8f0] flex items-center justify-between">
                <div className="text-sm text-[#475569]">
                    Showing <span className="font-medium text-[#0f172a]">{orders.length}</span> orders
                </div>
                <div className="flex gap-2">
                    <button disabled className="p-2 rounded-lg border border-[#e2e8f0] text-gray-400 transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button disabled className="p-2 rounded-lg border border-[#e2e8f0] text-gray-400 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
                </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}